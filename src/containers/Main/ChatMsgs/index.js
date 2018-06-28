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
  componentDidMount() {
    this.scrollToBottom();
    this.setCurrentChat();
  }

  componentDidUpdate(prevProps) {
    const {
      sender, match, messages, clearUnread,
    } = this.props;
    const receiver = match.params.id;
    this.scrollToBottom();
    if (prevProps.match.params.id !== match.params.id) {
      this.setCurrentChat();
      clearUnread(receiver, sender);
    }
    if (prevProps.messages !== messages) {
      clearUnread(receiver, sender);
    }
  }

  componentWillUnmount() {
    const { offMessages } = this.props;
    offMessages();
  }

  setCurrentChat = () => {
    const { messagesRef, match } = this.props;
    const url = match.url;
    const receiver = match.params.id;
    messagesRef(receiver, url);
  };

  scrollToBottom() {
    const msgWrapper = document.querySelector('.chat__main__messages');
    msgWrapper.scrollTop = msgWrapper.scrollHeight;
  }

  render() {
    const { messages } = this.props;
    return (
      <React.Fragment>
        <div className="chat__main__messages">
          {messages !== null && messages.length ? (
            messages.map(msg => (
              <SingleMsg
                key={msg.key}
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
            <p>
No messages in this chat...
            </p>
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
});

const mapDispatchToProps = dispatch => ({
  offMessages: () => dispatch(offMessages()),
  messagesRef: (sender, receiver) => dispatch(messagesRef(sender, receiver)),
  clearUnread: (sender, receiver) => dispatch(clearUnread(sender, receiver)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatMsgs),
);

ChatMsgs.defaultProps = {
  sender: '',
  messages: [],
};

ChatMsgs.propTypes = {
  match: PropTypes.object.isRequired,
  offMessages: PropTypes.func.isRequired,
  messagesRef: PropTypes.func.isRequired,
  clearUnread: PropTypes.func.isRequired,
  sender: PropTypes.string,
  messages: PropTypes.array,
};
