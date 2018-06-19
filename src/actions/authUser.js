import {
	auth,
	database,
	googleProvider,
	facebookProvider,
	githubProvider,
	timestamp,
} from '../configs/firebase';
import { errorOpen } from './error';

export const LOGIN_SUCCESFULL = 'LOGIN_SUCCESFULL';
export const LOGIN_IN_PROCESS = 'LOGIN_IN_PROCESS';
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';

export const createNewUser = (name, email, password) => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.createUserWithEmailAndPassword(email, password)
			.then(result => {
				const signedUser = result;
				signedUser
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						database.ref('users/' + signedUser.uid).set({
							id: signedUser.uid,
							name: signedUser.displayName,
							avatar: signedUser.photoURL,
							email: signedUser.email,
							online: 1,
							createAt: timestamp,
						});
						dispatch(setCurrentUser(signedUser));
					});

				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const loginToAcc = (email, password) => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.signInWithEmailAndPassword(email, password)
			.then(user => {
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const googleAuth = () => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.signInWithPopup(googleProvider)
			.then(result => {
				const signedUser = result.user;
				database.ref('/users/' + signedUser.uid).set({
					id: signedUser.uid,
					name: signedUser.displayName,
					avatar: signedUser.photoURL,
					email: signedUser.email,
					online: 0,
					createAt: timestamp,
				});
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const facebookAuth = () => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.signInWithPopup(facebookProvider)
			.then(result => {
				const signedUser = result.user;
				database.ref('/users/' + signedUser.uid).set({
					id: signedUser.uid,
					name: signedUser.displayName,
					avatar: signedUser.photoURL,
					email: signedUser.email,
					online: 0,
					createAt: timestamp,
				});
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const githubAuth = () => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.signInWithPopup(githubProvider)
			.then(result => {
				const signedUser = result.user;
				database.ref('/users/' + signedUser.uid).set({
					id: signedUser.uid,
					name: signedUser.displayName,
					avatar: signedUser.photoURL,
					email: signedUser.email,
					online: 0,
					createAt: timestamp,
				});
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const loginInProcess = () => {
	return { type: LOGIN_IN_PROCESS };
};

export const loginUserSuccessful = () => {
	return { type: LOGIN_SUCCESFULL };
};

export const checkCurrentUser = () => {
	return dispatch => {
		const userAuth = auth.currentUser;
		if (userAuth) {
			dispatch(setCurrentUser(userAuth));
		} else {
			console.log('No user here...');
		}
	};
};

export const setCurrentUser = user => {
	return {
		type: SET_USER,
		user,
	};
};

export const onlineUserManage = () => {
	return dispatch => {
		const uid = auth.currentUser.uid;
		database.ref('.info/connected').on('value', snapshot => {
			if (snapshot.val()) {
				database
					.ref(`/users/${uid}`)
					.onDisconnect()
					.update({ online: 0, lastSeen: timestamp });
				database
					.ref(`/users/${uid}`)
					.update({ online: 1, lastSeen: timestamp });
			}
		});
	};
};

export const restorePassword = email => {
	return dispatch => {
		dispatch(loginInProcess());
		auth.sendPasswordResetEmail(email)
			.then(() => {
				dispatch(
					errorOpen(`Password reset email has sent to ${email}`, true)
				);
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const signOut = () => {
	return dispatch => {
		dispatch({ type: SIGN_OUT });
		const uid = auth.currentUser.uid;
		auth.signOut();
		database
			.ref(`/users/${uid}`)
			.update({ online: 0, lastSeen: timestamp });
		database.ref('/messages').off();
		database.ref('/users').off();
		database.ref('/channels').off();
		database.ref('/unreadMsgs').off();
	};
};
