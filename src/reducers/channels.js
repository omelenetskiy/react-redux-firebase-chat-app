import { SET_CHANNELS } from '../actions/channelsRef';

const initialState = {
	channels: null
};

export const channels = (state = initialState, action) => {
	switch (action.type) {
		case SET_CHANNELS:
			return {
				...state,
				channels: action.channels
			};
		default:
			return state;
	}
};
