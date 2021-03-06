import { SEARCH_FOR_USER } from '../actions/userSearch';

const userSearch = (state = '', action) => {
  switch (action.type) {
    case SEARCH_FOR_USER:
      return action.text;
    default:
      return state;
  }
};

export default userSearch;
