export const getters = {
	getItems: state => {
		return state.items
	},
	authStatus: state => {
		return state.authStatus
	},
	getUID: state => {
		return state.uid
	},
	searchStatus: state => {
		return state.searchStatus
	}
};
