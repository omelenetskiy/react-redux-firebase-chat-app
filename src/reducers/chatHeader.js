import { IS_ACTIVE_SIDEBAR } from '../actions/changeHeaderData';

const initialState = {
	isActive: false,
};

export const chatHeader = (state = initialState, action) => {
	switch (action.type) {
		case IS_ACTIVE_SIDEBAR:
			return { ...state, isActive: !state.isActive };
		default:
			return state;
	}
};
