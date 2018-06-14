import React from 'react';
import PropTypes from 'prop-types';
import './progress.sass';
const Progress = ({ progress }) => {
	return (
		<div className="progress">
			<div className="bar" style={{ width: `${progress}%` }} />
		</div>
	);
};

export default Progress;

Progress.propTypes = {
	progress: PropTypes.numper
};
