import { database, auth } from '../configs/firebase';

export const SET_CONVERSATION = 'SET_CONVERSATION';

export const messagesRef = (receiver, url) => {
	return dispatch => {
		const user = auth.currentUser;
		database.ref('/messages').on('value', snapshot => {
			let messages = snapshot.val();
			if (messages === null || messages === undefined) {
				messages = [];
			}
			let arr = [];
			Object.values(messages).forEach(element => {
				if (url.includes('rooms')) {
					if (element.receiver === receiver) {
						arr = [...arr, element];
					}
				} else {
					if (
						(element.sender === user.uid &&
							element.receiver === receiver) ||
						(element.sender === receiver &&
							element.receiver === user.uid)
					) {
						arr = [...arr, element];
					}
				}
			});
			dispatch(setMessages(arr));
		});
	};
};

const setMessages = (messages = []) => {
	return {
		type: SET_CONVERSATION,
		messages
	};
};

export const offMessages = () => {
	return dispatch => {
		database.ref('/messages').off();
	};
};

export const deleteMsg = id => {
	return dispatch => {
		database
			.ref('/messages')
			.child(id)
			.remove();
	};
};
