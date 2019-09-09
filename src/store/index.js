import Vue from 'vue'
import Vuex from 'vuex'

import {getters} from '@/store/getters'
import {actions} from '@/store/actions'
import {mutations} from '@/store/mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		authStatus: false,
		userInfo: [],
		uid: null,
		items: [],
		searchStatus: false
	},
	getters: getters,
	mutations: mutations,
	actions: actions,
});

export default store
