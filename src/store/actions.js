import firebase from 'firebase'
import {firebaseConfig} from "@/config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const actions = {
	getItems: context => {
		let user = firebase.auth().currentUser;
		if( user ) {
			let newItem = {};
			let userUID = user.uid;
			let items = [];
			db.collection('notes_' + userUID)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach( (doc) => {
						newItem = doc.data();
						newItem.id = doc.id;
						items.push(newItem)
					});
					context.commit('setItems', items);
				});
			if (!context.getters.getUID) {
				context.commit('setUID', userUID);
			}
		}
	},

	addItem: (context, payload) => {
		let userUID = context.getters.getUID;
		let test = db.collection('notes_' + userUID);
		test.orderBy("order", "desc").limit(1).get()
			.then(querySnapshot => {
				querySnapshot.forEach( doc => {
					payload.order = doc.data().order + 1;
				});
				db.collection('notes_' + userUID).add(payload)
					.then((docRef) => {
						payload.id = docRef.id;
						context.commit('addLocalItem', payload);
					});
			});
	},

	deleteItem: (context, id) => {
		context.commit('deleteLocalItem', id);
		db.collection('notes_' + context.getters.getUID ).doc(id)
			.delete()
			.catch(error => {
				console.log(error)
			})
	},

	updateItems: (context, payload ) => {
		context.commit('updateItems', payload)
	}
};
