export const SET_PROGRESS = 'SET_PROGRESS';

export const setProgress = progress => {
	return {
		type: SET_PROGRESS,
		progress
	};
};
