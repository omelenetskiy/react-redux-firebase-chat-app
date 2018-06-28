export const SEARCH_FOR_USER = 'SEARCH_FOR_USER';

export const userSearch = text => ({
  type: SEARCH_FOR_USER,
  text,
});
