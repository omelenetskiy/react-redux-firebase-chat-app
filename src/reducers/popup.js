import { OPEN_POPUP } from '../actions/isOpenPopup';

const initialState = {
  createChannel: false,
};

const popup = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return { ...state, createChannel: action.open };
    default:
      return state;
  }
};

export default popup;
