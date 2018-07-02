import { SET_NEWS } from '../actions/fetchNews';

const initialState = {
  news: [],
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return { ...state, news: action.news };
    default:
      return state;
  }
};

export default news;
