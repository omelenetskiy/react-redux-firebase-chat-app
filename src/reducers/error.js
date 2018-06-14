import { ERROR_OPEN, ERROR_CLOSE } from '../actions/error';

const initialState = {
	isOpen: false,
	error: '',
	color: false
};

export const error = (state = initialState, action) => {
	switch (action.type) {
		case ERROR_OPEN:
			return {
				...state,
				isOpen: true,
				error: JSON.stringify(action.error.message || action.error),
				color: action.color
			};
		case ERROR_CLOSE:
			return { ...state, isOpen: false, error: '', color: false };
		default:
			return state;
	}
};
