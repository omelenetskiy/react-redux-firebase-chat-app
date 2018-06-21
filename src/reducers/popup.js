import { OPEN_POPUP } from '../actions/isOpen';

const initialState = {
	createChannel: false
};

export const popup = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_POPUP:
			return { ...state, createChannel: action.open };
		default:
			return state;
	}
};
