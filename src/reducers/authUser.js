import {
	LOGIN_SUCCESFULL,
	LOGIN_IN_PROCESS,
	SET_USER,
	SIGN_OUT,
} from '../actions/authUser';

const initialState = {
	currentUid: '',
	name: '',
	email: 'email is hidden',
	avatar: '',
	inProcess: false,
};

export const authUser = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_IN_PROCESS:
			return { ...state, inProcess: true };
		case LOGIN_SUCCESFULL:
			return { ...state, inProcess: false };
		case SET_USER:
			return {
				...state,
				currentUid: action.user.uid,
				createAt: action.user.metadata.creationTime,
				name: action.user.displayName,
				email: action.user.email,
				avatar: action.user.photoURL,
			};
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
};
