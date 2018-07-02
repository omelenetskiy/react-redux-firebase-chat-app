import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../../../actions/authUser';
import AuthButton from '../../../components/AuthButton';
import './sidebarLogged.sass';

const SidebarLogedUser = ({ user, signOut }) => (
  <div className="chat__sidebar__logged-user">
    <Link to="/settings/profile">
      <div className="logged-user__wrapper">
        <div className="logged-user__avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <i className="far fa-user-circle fa-3x" />
          )}
        </div>
        <div className="logged-user__data">
          <h4 className="ui-text-title">
            {user.name === null ? 'No Name' : user.name}
          </h4>
          <h5 className="ui-text-subhead">
            {user.email}
          </h5>
        </div>
      </div>
    </Link>
    <div className="logged-user__sign-out">
      <AuthButton
        className="ui-button_icon"
        onClick={signOut}
        icon="fas fa-sign-out-alt"
        title="sign out"
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.authUser,
});

export default withRouter(
  connect(
    mapStateToProps,
    { signOut },
  )(SidebarLogedUser),
);

SidebarLogedUser.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};
