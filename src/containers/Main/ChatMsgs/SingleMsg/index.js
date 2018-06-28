import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMsg, getTime } from '../../../../actions/messagesRef';

class SingleMsg extends Component {
  state = {
    avatar: null,
    name: '',
  };

  componentDidMount() {
    this.getAvatar();
    this.getUserName();
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages !== messages) {
      this.getAvatar();
      this.getUserName();
    }
  }

  getAvatar = () => {
    const { users, sender } = this.props;
    users.forEach(user => (user.id === sender ? this.setState({ avatar: user.avatar }) : null));
  };

  getUserName = () => {
    const { users, sender } = this.props;
    users.forEach(user => (user.id === sender ? this.setState({ name: user.name }) : null));
  };

  deleteMsg = (id) => {
    const { deleteMsg } = this.props;
    deleteMsg(id);
  };

  render() {
    const {
      text, propClass, currentUid, img, id, timestamp,
    } = this.props;
    const { avatar, name } = this.state;
    const style = 'message message-prop';
    return (
      <div className={currentUid === propClass ? style : 'message'}>
        <div className="message__avatar">
          {avatar ? <img src={avatar} alt={avatar} /> : <i className="far fa-user-circle fa-2x" />}
        </div>
        <div className="message__data">
          <div className="message__data__user-name">
            {name ? (
              <h4>
                {name}
              </h4>
            ) : 'deleted user'}
          </div>
          <div className="message__data__text">
            <p>
              {text}
            </p>
            {img ? (
              <a href={img}>
                <img src={img} alt={img} />
              </a>
            ) : null}
          </div>
          <div className="message__data__timestamp">
            {currentUid === propClass ? (
              <button
                type="button"
                title="delete message"
                onClick={(e) => {
                  e.preventDefault();
                  this.deleteMsg(id);
                }}
              >
                <i className="fas fa-trash-alt" />
              </button>
            ) : null}
            <p>
              {getTime(timestamp)}
            </p>
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

const mapDispatchToProps = dispatch => ({
  deleteMsg: id => dispatch(deleteMsg(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleMsg);

SingleMsg.defaultProps = {
  messages: [],
  users: [],
  currentUid: '',
  sender: '',
  text: '',
  id: '',
  timestamp: 0,
  img: '',
  propClass: '',
};

SingleMsg.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
  currentUid: PropTypes.string,
  deleteMsg: PropTypes.func.isRequired,
  sender: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  timestamp: PropTypes.number,
  img: PropTypes.string,
  propClass: PropTypes.string,
};
