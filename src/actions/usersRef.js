import { database } from '../configs/firebase';

export const SET_USERS = 'SET_USERS';

export const usersRef = () => {
	return dispatch => {
		database.ref('/users').on('value', snapshot => {
			const users = snapshot.val();
			dispatch(setUsers(users));
		});
	};
};

const setUsers = (users = {}) => {
	return {
		type: SET_USERS,
		users
	};
};

export const offUsers = () => {
	return dispatch => {
		database.ref('/users').off();
	};
};
