import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMsg } from '../../../../actions/messagesRef';

class SingleMsg extends Component {
	state = {
		avatar: null,
		name: ''
	};
	getTime = () => {
		// from js assignments
		const sendTime = this.props.timestamp;
		const now = Date.now();
		let diff = now - sendTime,
			s = 1000, // second
			m = s * 60, // minute
			h = m * 60, // hour
			d = h * 24; // day
		if (diff <= 45 * s) return 'a few seconds ago';
		if (diff <= 90 * s) return 'a minute ago';
		if (diff <= 45 * m) return `${Math.round((diff - 1) / m)} minutes ago`;
		if (diff <= 90 * m) return 'an hour ago';
		if (diff <= 22 * h) return `${Math.round((diff - 1) / h)} hours ago`;
		if (diff <= 36 * h) return 'a day ago';
		if (diff <= 25 * d) return `${Math.round((diff - 1) / d)} days ago`;
		if (diff <= 45 * d) return 'a month ago';
		if (diff <= 345 * d) return `${Math.round(diff / 30 / d)} months ago`;
		if (diff <= 545 * d) return 'a year ago';
		return `${Math.round(diff / 365 / d)} years ago`;
	};
	getUserName = () => {
		const users = this.props.users;
		const sender = this.props.sender;
		users.forEach(user => {
			return user.id === sender
				? this.setState({ name: user.name })
				: null;
		});
	};
	getAvatar = () => {
		const users = this.props.users;
		const sender = this.props.sender;
		users.forEach(user => {
			return user.id === sender
				? this.setState({ avatar: user.avatar })
				: null;
		});
	};
	deleteMsg = id => {
		this.props.deleteMsg(id);
	};
	componentDidMount() {
		this.getAvatar();
		this.getUserName();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.messages !== this.props.messages) {
			this.getAvatar();
			this.getUserName();
		}
	}
	render() {
		const { text, propClass, currentUid, img, id } = this.props;
		const { avatar, name } = this.state;
		const style = 'message message-prop';
		return (
			<div className={currentUid === propClass ? style : 'message'}>
				<div className="message__avatar">
					{avatar ? (
						<img src={avatar} alt={avatar} />
					) : (
						<i className="far fa-user-circle fa-2x" />
					)}
				</div>
				<div className="message__data">
					<div className="message__data__user-name">
						{name ? <h4>{name}</h4> : 'deleted user'}
					</div>
					<div className="message__data__text">
						<p>{text}</p>
						{img ? (
							<a href={img} target="_blank">
								<img src={img} alt={img} />
							</a>
						) : null}
					</div>
					<div className="message__data__timestamp">
						{currentUid === propClass ? (
							<a
								href=""
								title="delete message"
								onClick={e => {
									e.preventDefault();
									this.deleteMsg(id);
								}}
							>
								<i className="fas fa-trash-alt" />
							</a>
						) : null}

						<p>{this.getTime()}</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUid: state.authUser.currentUid,
	users: state.users.users
});

const mapDispatchToProps = dispatch => {
	return {
		deleteMsg: id => dispatch(deleteMsg(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleMsg);

SingleMsg.propTypes = {
	users: PropTypes.array,
	currentUid: PropTypes.string,
	deleteMsg: PropTypes.func
};
