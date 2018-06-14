import { database, timestamp } from '../configs/firebase';
import { errorOpen } from './error';
export const ADD_CHANNEL = 'ADD_CHANNEL';

export const addChannel = name => {
	return dispatch => {
		database.ref('channels').once('value', snapshot => {
			let channels = [];
			snapshot.forEach(el => {
				channels.push({ ...el.val() });
			});
			if (!channels.find(channel => channel.name === name)) {
				const postKey = database.ref('channels').push().key;
				database.ref(`channels/${postKey}`).set({
					name: name,
					id: postKey,
					createAt: timestamp
				});
			} else {
				dispatch(errorOpen('Room name has already created!'));
			}
		});
	};
};
