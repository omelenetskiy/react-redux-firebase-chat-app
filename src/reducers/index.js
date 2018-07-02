import { combineReducers } from 'redux';
import authUser from './authUser';
import chatHeader from './chatHeader';
import users from './users';
import messages from './messages';
import userSearch from './userSearch';
import popup from './popup';
import channels from './channels';
import error from './error';
import progress from './progress';
import changeFile from './changeFile';
import news from './news';

const reducers = combineReducers({
  authUser,
  chatHeader,
  users,
  messages,
  userSearch,
  popup,
  channels,
  error,
  progress,
  changeFile,
  news,
});

export default reducers;
