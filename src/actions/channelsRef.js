import { database } from '../configs/firebase';

export const SET_CHANNELS = 'SET_CHANNELS';

const setChannels = (channels = {}) => ({
  type: SET_CHANNELS,
  channels,
});

export const channelsRef = () => (dispatch) => {
  database.ref('/channels').on('value', (snapshot) => {
    const channels = snapshot.val();
    dispatch(setChannels(channels));
  });
};

export const offChannels = () => () => {
  database.ref('/channels').off();
};
