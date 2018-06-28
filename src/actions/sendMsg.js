import { database, timestamp, storage } from '../configs/firebase';
import { errorOpen } from './error';
import { setProgress } from './progress';
import { closeFile } from './changeFile';

const setUnread = (sender, receiver) => () => {
  database.ref(`unreadMsgs/${sender}/${receiver}`).once('value', (snapshot) => {
    const counter = snapshot.val() ? snapshot.val().count : 0;
    database.ref(`unreadMsgs/${sender}/${receiver}`).update({
      sender,
      receiver,
      count: counter + 1,
    });
  });
};

export const clearUnread = (sender, receiver) => () => {
  database.ref(`unreadMsgs/${sender}/${receiver}`).update({ count: 0 });
};

const onlyMsg = (sender, receiver, msg = null, img = null) => (dispatch) => {
  const key = database
    .ref('messages/')
    .push()
    .getKey();
  const db = database.ref('messages/');
  db.child(key).set({
    receiver,
    sender,
    timestamp,
    msg,
    img,
    key,
  });
  dispatch(setUnread(sender, receiver, msg));
};

export const sendChatMsg = (sender, receiver, msg = null, file) => (dispatch) => {
  if (file) {
    const name = `${+new Date()}-${file.name}`;
    const metadata = { contentType: file.type };
    const task = storage
      .ref('/messages-img')
      .child(name)
      .put(file, metadata);
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch(setProgress(Math.round(progress)));
      if (progress === 100) {
        dispatch(closeFile());
      }
    });
    task
      .then((snapshot) => {
        dispatch(onlyMsg(sender, receiver, msg, snapshot.downloadURL));
      })
      .catch(error => dispatch(errorOpen(error)));
  } else {
    dispatch(onlyMsg(sender, receiver, msg));
  }
};
