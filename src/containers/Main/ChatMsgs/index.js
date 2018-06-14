import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SingleMsg from './SingleMsg';
import ChatForm from '../ChatForm';
import { clearUnread } from '../../../actions/sendMsg';
import { messagesRef, offMessages } from '../../../actions/messagesRef';
import './msg.sass';

class ChatMsgs extends Component {
	scrollToBottom() {
		const msgWrapper = document.querySelector('.chat__main__messages');
		msgWrapper.scrollTop = msgWrapper.scrollHeight;
	}
	setCurrentChat = () => {
		const { messagesRef } = this.props;
		const url = this.props.match.url;
		const receiver = this.props.match.params.id;
		messagesRef(receiver, url);
	};
	componentDidUpdate(prevProps) {
		const receiver = this.props.match.params.id;
		const { sender } = this.props;
		this.scrollToBottom();
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.setCurrentChat();
			this.props.clearUnread(receiver, sender);
		}
		if (prevProps.messages !== this.props.messages) {
			this.props.clearUnread(receiver, sender);
		}
	}
	componentDidMount() {
		this.scrollToBottom();
		this.setCurrentChat();
	}
	componentWillUnmount() {
		this.props.offMessages();
	}
	render() {
		const { messages } = this.props;
		return (
			<React.Fragment>
				<div className="chat__main__messages">
					{messages !== null && messages.length ? (
						messages.map((msg, index) => (
							<SingleMsg
								key={index}
								sender={msg.sender}
								text={msg.msg}
								propClass={msg.sender}
								img={msg.img}
								timestamp={msg.timestamp}
								id={msg.key}
								messages={messages}
							/>
						))
					) : (
						<p>No messages in this chat...</p>
					)}
				</div>
				<ChatForm />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	sender: state.authUser.currentUid,
	messages: state.messages.messages,
	chatHeader: state.chatHeader.name
});

const mapDispatchToProps = dispatch => {
	return {
		offMessages: () => dispatch(offMessages()),
		messagesRef: (sender, receiver) =>
			dispatch(messagesRef(sender, receiver)),
		clearUnread: (sender, receiver) =>
			dispatch(clearUnread(sender, receiver))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChatMsgs)
);

ChatMsgs.propTypes = {
	offMessages: PropTypes.func,
	messagesRef: PropTypes.func,
	clearUnread: PropTypes.func,
	sender: PropTypes.string,
	messages: PropTypes.array,
	chatHeader: PropTypes.string
};
