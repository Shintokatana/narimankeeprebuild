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
		const userUID = context.getters.getUID;
		db.collection('notes_' + userUID).add(payload)
			.then((docRef) => {
				payload.id = docRef.id;
				context.commit('addLocalItem', payload);
			});
	},

	deleteItem: (context, id) => {
		const userUID = context.getters.getUID;
		context.commit('deleteLocalItem', id);
		db.collection('notes_' + userUID ).doc(id)
			.delete()
			.catch(error => {
				console.log(error)
			})
	},

	updateItemsOrder: (context, payload ) => {
		const userUID = context.getters.getUID;
		let   newItems = [];
		context.commit('updateItemsOrder', payload);
		db.collection('notes_' + userUID).get()
			.then((querySnapshot) => {
				payload.forEach(item => {
					item = JSON.parse(JSON.stringify(item));
					delete item.id;
					newItems.push(item)
				});
				for ( let i = 0; i < querySnapshot.docs.length; i += 1 ) {
					querySnapshot.docs[i].ref.set(newItems[i])
						.catch(error => {
							console.log(error)
						})
				}
			})
			.catch(error => {
				console.log(error)
			})
	},

	updateItem: (context, payload) => {
		const userUID = context.getters.getUID;
		let id = payload.id;
		delete payload.id;
		let test = JSON.parse(JSON.stringify(payload));
		db.collection('notes_' + userUID).doc(id)
			.update(test)
			.then(() => {
				payload.id = id;
				context.commit('updateItem', payload);
			})
	}

};
