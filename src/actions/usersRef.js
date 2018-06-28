import { database } from '../configs/firebase';

export const SET_USERS = 'SET_USERS';

const setUsers = (users = {}) => ({
  type: SET_USERS,
  users,
});

export const usersRef = () => (dispatch) => {
  database.ref('/users').on('value', (snapshot) => {
    const users = snapshot.val();
    dispatch(setUsers(users));
  });
};

export const offUsers = () => () => {
  database.ref('/users').off();
};
