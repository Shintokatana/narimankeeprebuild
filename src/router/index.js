import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp'
import Login from '@/views/Login'
import * as firebase from 'firebase'

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '*',
			redirect: '/login'
		},
		{
			path: '/sign-up',
			name: 'signUp',
			component: SignUp
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		}
	]
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	if (requiresAuth && !currentUser ) next('login');
	else if (!requiresAuth && currentUser) next('home');
	else  next();
});

export default router
