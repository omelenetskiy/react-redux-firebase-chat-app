export const ERROR_OPEN = 'ERROR_OPEN';
export const ERROR_CLOSE = 'ERROR_CLOSE';

export const errorOpen = (error, color = false) => {
	return {
		type: ERROR_OPEN,
		error,
		color
	};
};

export const errorClose = () => {
	return {
		type: ERROR_CLOSE
	};
};
