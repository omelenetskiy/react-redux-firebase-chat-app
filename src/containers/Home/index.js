import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Main from '../Main';
import UserInfo from '../UserInfo';
import CreateChannel from '../CreateChannel';
import { onlineUserManage, checkCurrentUser } from '../../actions/authUser';
import './chat.sass';

class Home extends Component {
  componentDidMount() {
    const { checkCurrent, onlineUser } = this.props;
    checkCurrent();
    onlineUser();
  }

  render() {
    const { createChannel } = this.props;
    return (
      <div className="chat">
        <Switch>
          <Route path="/settings" render={() => <UserInfo />} />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Sidebar />
                <Main />
              </React.Fragment>
            )}
          />
        </Switch>
        {createChannel ? <CreateChannel /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createChannel: state.popup.createChannel,
});

const mapDispatchToProps = dispatch => ({
  onlineUser: () => dispatch(onlineUserManage()),
  checkCurrent: () => dispatch(checkCurrentUser()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);

Home.defaultProps = {
  createChannel: false,
};

Home.propTypes = {
  createChannel: PropTypes.bool,
  onlineUser: PropTypes.func.isRequired,
  checkCurrent: PropTypes.func.isRequired,
};
