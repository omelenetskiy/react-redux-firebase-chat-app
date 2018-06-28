import { SET_CONVERSATION } from '../actions/messagesRef';

const initialState = {
  messages: [],
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATION:
      return {
        ...state,
        messages: action.messages,
      };

    default:
      return state;
  }
};

export default messages;
