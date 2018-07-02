import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleRoom from '../../../components/SingleRoom';
import { isOpenPopup } from '../../../actions/isOpenPopup';
import { channelsRef, offChannels } from '../../../actions/channelsRef';
import './sidebarRooms.sass';

class SidebarRooms extends Component {
  state = {
    accordeon: false,
  };

  componentDidMount() {
    const { channelsRef } = this.props;
    channelsRef();
  }

  componentWillUnmount() {
    const { offChannels } = this.props;
    offChannels();
  }

  hideAccordeon = () => {
    const { accordeon } = this.state;
    this.setState({
      accordeon: !accordeon,
    });
  };

  render() {
    const { isOpen, channels } = this.props;
    const { accordeon } = this.state;
    const style = {
      height: 0,
    };
    return (
      <div className="chat__sidebar__rooms">
        <div className="sidebar__rooms__title">
          <h4>
            ROOMS (
            {channels ? Object.values(channels).length : 0}
            )
          </h4>
          <button
            type="button"
            className="ui-button ui-button_icon"
            title="Add new channel"
            onClick={() => isOpen(true)}
          >
            <i className="fas fa-plus" />
          </button>
          <button type="button" className="ui-button ui-button_icon" onClick={this.hideAccordeon}>
            {accordeon ? (
              <i className="fas fa-chevron-up" />
            ) : (
              <i className="fas fa-chevron-down" />
            )}
          </button>
        </div>
        <div className="sidebar__rooms__list" style={accordeon ? style : null}>
          {channels ? (
            Object.values(channels).map(channel => (
              <NavLink
                exact
                to={`/rooms/${channel.id}`}
                key={channel.id}
                activeClassName="room_active"
              >
                <SingleRoom channelName={channel.name} />
              </NavLink>
            ))
          ) : (
            <p>
No rooms here
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels.channels,
});

const mapDispatchToProps = dispatch => ({
  isOpen: open => dispatch(isOpenPopup(open)),
  channelsRef: () => dispatch(channelsRef()),
  offChannels: () => dispatch(offChannels()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SidebarRooms),
);

SidebarRooms.defaultProps = {
  channels: {},
};

SidebarRooms.propTypes = {
  isOpen: PropTypes.func.isRequired,
  channelsRef: PropTypes.func.isRequired,
  offChannels: PropTypes.func.isRequired,
  channels: PropTypes.object,
};
