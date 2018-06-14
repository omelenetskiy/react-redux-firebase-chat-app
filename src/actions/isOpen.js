export const OPEN_POPUP = 'OPEN_POPUP';

export const isOpen = open => {
	return {
		type: OPEN_POPUP,
		open
	};
};
