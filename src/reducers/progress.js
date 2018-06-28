import { SET_PROGRESS } from '../actions/progress';

const initialState = {
  value: 0,
};
const progress = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return { ...state, value: action.progress };
    default:
      return state;
  }
};

export default progress;
