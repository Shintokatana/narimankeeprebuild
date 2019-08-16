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
		db.collection('notes_' + userUID).add(payload)
			.then((docRef) => {
				payload.id = docRef.id;
				context.commit('addLocalItem', payload);
			})
	},
	deleteItem: (context, id) => {
		console.log(id);
		db.collection('notes_' + context.getters.getUID ).doc(id)
			.delete()
			.then(() => {
				context.commit('deleteLocalItem', id)
			})
		// let userUID = context.getters.getUID;
		// db.collection('notes_' + userUID).doc(id)
		// 	.delete()
		// 	.then((response) =>{
		// 		console.log(response);
		// 	})
	}
};
