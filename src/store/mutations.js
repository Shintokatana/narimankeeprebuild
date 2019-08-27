export const mutations = {
	fireLogin: (state, payload) => {
		state.userInfo = payload
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
	updateItems: (state, items ) => {
		state.items = items
	}
};
