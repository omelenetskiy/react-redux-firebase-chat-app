export const SET_FILE = 'SET_FILE';
export const CLOSE_FILE = 'CLOSE_FILE';
export const changeFile = file => ({
  type: SET_FILE,
  file,
});

export const closeFile = () => ({
  type: CLOSE_FILE,
});
