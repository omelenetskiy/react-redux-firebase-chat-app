import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleRoom from '../../../components/SingleRoom';
import { isOpen } from '../../../actions/isOpen';
import { channelsRef, offChannels } from '../../../actions/channelsRef';
import './sidebarRooms.sass';

class SidebarRooms extends Component {
	state={
		
	}
	componentDidMount() {
		this.props.channelsRef();
	}
	componentWillUnmount() {
		this.props.offChannels();
	}
	render() {
		const { isOpen, channels } = this.props;
		return (
			<div className="chat__sidebar__rooms">
				<div className="sidebar__rooms__title">
					<h4>
						ROOMS ({channels ? Object.values(channels).length : 0})
					</h4>
					<button
						className="ui-button ui-button_icon"
						title="Add new channel"
						onClick={() => isOpen(true)}
					>
						<i className="fas fa-plus" />
					</button>
					<button className="ui-button ui-button_icon">
						<i className="fas fa-chevron-down" />
					</button>
				</div>
				<div className="sidebar__rooms__list">
					{channels
						? Object.values(channels).map((channel, index) => (
								<NavLink
									exact
									to={`/rooms/${channel.id}`}
									key={channel.id}
									activeClassName="room_active"
								>
									<SingleRoom channelName={channel.name} />
								</NavLink>
						  ))
						: 'No rooms here'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sender: state.authUser.currentUid,
	channels: state.channels.channels
});

const mapDispatchToProps = dispatch => {
	return {
		isOpen: open => dispatch(isOpen(open)),
		channelsRef: () => dispatch(channelsRef()),
		offChannels: () => dispatch(offChannels())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SidebarRooms)
);

SidebarRooms.propTypes = {
	isOpen: PropTypes.func,
	channelsRef: PropTypes.func,
	offChannels: PropTypes.func,
	sender: PropTypes.string,
	channels: PropTypes.object
};
