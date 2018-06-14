import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { database } from '../configs/firebase';
import { clearUnread } from '../actions/sendMsg';

class SidebarUser extends Component {
	state = {
		count: null
	};
	componentDidMount() {
		const { id, currentUser } = this.props;
		database
			.ref(`unreadMsgs/`)
			.child(id)
			.on('value', snapshot => {
				const unread = snapshot.val() ? snapshot.val() : null;
				if (unread) {
					Object.values(unread).forEach(el => {
						if (el.receiver === currentUser) {
							this.setState({ count: el.count });
						}
					});
				} else {
					return null;
				}
			});
	}
	render() {
		const { avatar, online, username } = this.props;
		const { count } = this.state;
		return (
			<div className={'user'}>
				<div className="user__avatar">
					{avatar ? (
						<img src={avatar} alt={avatar} />
					) : (
						<i className="far fa-user-circle fa-3x" />
					)}
					<span className={online ? 'online' : 'offline'} />
				</div>
				<div className="user__data">
					<div className="user__data__name-text">
						<h4>{username !== null ? username : 'Unknown user'}</h4>
					</div>
					{count ? (
						<div className="user__data__noti">
							{count > 99 ? '99+' : count}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.authUser.currentUid
});

const mapDispatchToProps = dispatch => {
	return {
		clearUnread: (sender, receiver) =>
			dispatch(clearUnread(sender, receiver))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarUser);

SidebarUser.propTypes = {
	id: PropTypes.string,
	currentUser: PropTypes.string,
	avatar: PropTypes.string,
	online: PropTypes.number,
	username: PropTypes.string
};
