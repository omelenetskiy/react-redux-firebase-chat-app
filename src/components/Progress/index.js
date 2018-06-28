import React from 'react';
import PropTypes from 'prop-types';
import './progress.sass';

const Progress = ({ progress }) => (
  <div className="progress">
    <div className="bar" style={{ width: `${progress}%` }} />
  </div>
);

export default Progress;

Progress.defaultProps = {
  progress: 0,
};

Progress.propTypes = {
  progress: PropTypes.number,
};
