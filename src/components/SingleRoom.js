import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SingleRoom extends Component {
	render() {
		const { channelName, onClick } = this.props;
		return (
			<div className={'room'} onClick={onClick}>
				<div className="room__avatar">
					<i className="fas fa-users fa-2x" />
				</div>
				<div className="room__data">
					<h4>{channelName}</h4>
				</div>
			</div>
		);
	}
}

export default connect()(SingleRoom);

SingleRoom.propTypes = {
	channelName: PropTypes.string,
	onClick: PropTypes.func
};
