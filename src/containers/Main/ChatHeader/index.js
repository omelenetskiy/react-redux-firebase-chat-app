import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../../../actions/changeHeaderData';
import logo from '../../../static/img/react/logo.png';
import './header.sass';
import { database } from '../../../configs/firebase';
import { getTime } from '../../../actions/messagesRef';

class ChatHeader extends Component {
  state = {
    headerName: '',
    lastSeen: 0,
    online: 0,
    createDate: '',
  };

  componentDidMount() {
    this.setHeader();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location.pathname.split('/')[2] !== location.pathname.split('/')[2]) {
      this.setHeader();
    }
  }

  setHeader = () => {
    const { location } = this.props;
    const pathname = location.pathname.split('/')[2];
    const dbPath = location.pathname.includes('rooms') ? '/channels' : '/users';
    database.ref(dbPath).on('value', (snapshot) => {
      const users = snapshot.val();
      Object.values(users).forEach((el) => {
        if (el.id === pathname) {
          this.setState({
            headerName: el.name,
            lastSeen: 0,
            online: 0,
            createDate: el.createAt,
          });
          if (!location.pathname.includes('rooms')) {
            this.setState({
              lastSeen: el.lastSeen,
              online: el.online,
              createDate: '',
            });
          }
        }
      });
    });
  };

  render() {
    const { isActiveSidebar } = this.props;
    const {
      headerName, lastSeen, online, createDate,
    } = this.state;
    const date = new Date(createDate);
    return (
      <div className="chat__main__header">
        <div className="header__controls">
          <button
            type="button"
            className="ui-button ui-button_icon"
            onClick={isActiveSidebar}
            title="log out"
          >
            <i className="fas fa-2x fa-bars" />
          </button>
          <div>
            <h2 className="ui-text-headline">
              {headerName || 'unknown'}
            </h2>
            {lastSeen ? (
              <p>
                {online ? 'Online' : `Last seen ${getTime(lastSeen)}`}
              </p>
            ) : (
              <p>
                {online ? 'online' : `Created at ${date.toUTCString()}`}
              </p>
            )}
          </div>
        </div>
        <div className="chat__main__header__logo">
          <img src={logo} alt="" />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { isActiveSidebar },
  )(ChatHeader),
);

ChatHeader.propTypes = {
  location: PropTypes.object.isRequired,
  isActiveSidebar: PropTypes.func.isRequired,
};
