import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMsg, getTime } from '../../../../actions/messagesRef';

class SingleMsg extends Component {
	state = {
		avatar: null,
		name: '',
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
		const { text, propClass, currentUid, img, id, timestamp } = this.props;
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
							<a href={img}>
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
								}}>
								<i className="fas fa-trash-alt" />
							</a>
						) : null}
						<p>{getTime(timestamp)}</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUid: state.authUser.currentUid,
	users: state.users.users,
});

const mapDispatchToProps = dispatch => {
	return {
		deleteMsg: id => dispatch(deleteMsg(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleMsg);

SingleMsg.propTypes = {
	users: PropTypes.array,
	currentUid: PropTypes.string,
	deleteMsg: PropTypes.func,
};
