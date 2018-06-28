import { SET_USERS } from '../actions/usersRef';

const initialState = {
  users: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: Object.values(action.users).sort((a, b) => b.online - a.online),
      };
    default:
      return state;
  }
};

export default users;
