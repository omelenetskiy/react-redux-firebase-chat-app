import { SET_FILE, CLOSE_FILE } from '../actions/changeFile';
const initialState = {
	file: null,
	fileName: ''
};

export const changeFile = (state = initialState, action) => {
	switch (action.type) {
		case SET_FILE:
			return { ...state, file: action.file, fileName: action.file.name };
		case CLOSE_FILE: {
			return { ...state, file: null, fileName: '' };
		}
		default:
			return state;
	}
};
