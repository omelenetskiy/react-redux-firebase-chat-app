export const SEARCH_FOR_USER = 'SEARCH_FOR_USER';

export const userSearch = text => {
	return {
		type: SEARCH_FOR_USER,
		text
	};
};
