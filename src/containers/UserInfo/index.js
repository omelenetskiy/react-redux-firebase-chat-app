import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route, withRouter, Switch, NavLink,
} from 'react-router-dom';
import { closeFile } from '../../actions/changeFile';
import ChangePassword from './ChangePassword';
import UserCard from '../../components/UserCard';
import './userinfo.sass';

class UserInfo extends Component {
  componentDidUpdate(prevProps) {
    const { closeFile, location } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      closeFile();
    }
  }

  componentWillUnmount() {
    const { closeFile } = this.props;
    closeFile();
  }

  goBack = () => {
    const { history } = this.props;
    history.replace('/');
  };

  render() {
    const { match } = this.props;
    return (
      <div className="user-info">
        <div className="user-info__header">
          <button type="button" className="ui-button ui-button_icon" onClick={this.goBack}>
            <i className="fas fa-arrow-left fa-5x" />
          </button>
          <h2>
Settings
          </h2>
        </div>
        <div className="user-info__tabs">
          <ul>
            <li>
              <NavLink to={`${match.url}/profile`} activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`${match.url}/password`} activeClassName="active">
                Password
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="user-info__wrapper">
          <Switch>
            <Route exact path={`${match.url}/profile`} render={() => <UserCard />} />
            <Route exact path={`${match.url}/password`} render={() => <ChangePassword />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeFile: () => dispatch(closeFile()),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(UserInfo),
);

UserInfo.propTypes = {
  closeFile: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
