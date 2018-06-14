import { database } from '../configs/firebase';
export const SET_CHANNELS = 'SET_CHANNELS';

export const channelsRef = () => {
	return dispatch => {
		database.ref('/channels').on('value', snapshot => {
			let channels = snapshot.val();
			dispatch(setChannels(channels));
		});
	};
};

const setChannels = (channels = {}) => {
	return {
		type: SET_CHANNELS,
		channels
	};
};

export const offChannels = () => {
	return dispatch => {
		database.ref('/channels').off();
	};
};
