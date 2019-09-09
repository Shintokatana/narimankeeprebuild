export const mutations = {
	fireLogin: (state, payload) => {
		state.userInfo = payload
	},
	searchStatus: (state, payload) => {
		state.searchStatus = payload
	},
	authStatus: state => {
		state.authStatus = true
	},
	setUID: (state, uid) => {
		state.uid = uid
	},
	setItems: (state, items) => {
		state.items = items
	},
	addLocalItem: (state, payload) => {
		state.items.push(payload)
	},
	deleteLocalItem: ( state, id ) => {
		state.items = state.items.filter(item => item.id !== id);
	},
	updateItemsOrder: (state, items ) => {
		state.items = items
	},
	updateItem: (state, item) => {
		state.items.forEach((element, index) => {
			if (element.id === item.id ) {
				state.items[index] = item
			}
		})
	}
};
