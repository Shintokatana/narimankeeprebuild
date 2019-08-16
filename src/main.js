import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

let app = '';

//Include basic application styles
require('../src/assets/styles/index.scss');

Vue.config.productionTip = false;


//Initialize Vue instance if user logged
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}
});
