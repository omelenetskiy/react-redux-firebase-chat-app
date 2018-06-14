import { storage, auth, database } from '../configs/firebase';
import { loginInProcess, loginUserSuccessful } from './authUser';
import { errorOpen } from './error';
export const CHANGE_USER_PHOTO = 'CHANGE_USER_PHOTO';

export const changeUserPhoto = url => {
	return dispatch => {
		const user = auth.currentUser;
		user.updateProfile({
			photoURL: url
		})
			.then(() => {
				database
					.ref('users')
					.child(user.uid)
					.update({
						avatar: url
					});
				dispatch(
					errorOpen(
						'Photo has been changed!. Please, refresh the page.',
						true
					)
				);
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const uploadPhoto = file => {
	return dispatch => {
		const user = auth.currentUser;
		if (file) {
			const name = `${+new Date()}-${file.name}`;
			const metadata = { contentType: file.type };
			dispatch(loginInProcess());
			const task = storage
				.ref(`/user-avatar/${user.uid}`)
				.child(name)
				.put(file, metadata);
			task.then(snapshot => {
				dispatch(changeUserPhoto(snapshot.downloadURL));
				dispatch(loginUserSuccessful());
			}).catch(error => {});
		} else {
			dispatch(errorOpen('You should choose an image!'));
		}
	};
};

export const changePassword = newPassword => {
	return dispatch => {
		dispatch(loginInProcess());
		const user = auth.currentUser;
		user.updatePassword(newPassword)
			.then(() => {
				dispatch(errorOpen('Password has been updated!', true));
				dispatch(loginUserSuccessful());
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};

export const deleteUser = history => {
	return dispatch => {
		dispatch(loginInProcess());
		const user = auth.currentUser;
		user.delete()
			.then(() => {
				dispatch(loginUserSuccessful());
				database
					.ref('/users')
					.child(user.uid)
					.remove();
			})
			.catch(error => {
				dispatch(errorOpen(error));
				dispatch(loginUserSuccessful());
			});
	};
};
