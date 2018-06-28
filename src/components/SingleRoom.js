import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SingleRoom = ({ channelName }) => (
  <div className="room">
    <div className="room__avatar">
      <i className="fas fa-users fa-2x" />
    </div>
    <div className="room__data">
      <h4>
        {channelName}
      </h4>
    </div>
  </div>
);

export default connect()(SingleRoom);

SingleRoom.defaultProps = {
  channelName: '',
};

SingleRoom.propTypes = {
  channelName: PropTypes.string,
};
