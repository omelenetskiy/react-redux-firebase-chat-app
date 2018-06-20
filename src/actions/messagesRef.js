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
		messages,
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
export const getTime = timestamp => {
	// from js assignments
	const sendTime = timestamp;
	const now = Date.now();
	let diff = now - sendTime,
		s = 1000, // seconds
		m = s * 60, // minutes
		h = m * 60, // hourse
		d = h * 24; // days
	if (diff <= 45 * s) return 'a few seconds ago';
	if (diff <= 90 * s) return 'a minute ago';
	if (diff <= 45 * m) return `${Math.round((diff - 1) / m)} minutes ago`;
	if (diff <= 90 * m) return 'an hour ago';
	if (diff <= 22 * h) return `${Math.round((diff - 1) / h)} hours ago`;
	if (diff <= 36 * h) return 'a day ago';
	if (diff <= 25 * d) return `${Math.round((diff - 1) / d)} days ago`;
	if (diff <= 45 * d) return 'a month ago';
	if (diff <= 345 * d) return `${Math.round(diff / 30 / d)} months ago`;
	if (diff <= 545 * d) return 'a year ago';
	return `${Math.round(diff / 365 / d)} years ago`;
};
