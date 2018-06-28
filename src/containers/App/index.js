import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import Loading from '../../components/Loading';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import RestorePassword from '../RestorePassword';
import PrivateRoute from '../../components/PrivateRoute';
import PublicRoute from '../../components/PublicRoute';

class App extends Component {
  state = {
    authed: false,
    loading: true,
  };

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { loading, authed } = this.state;
    return loading === true ? (
      <Loading />
    ) : (
      <Router>
        <Switch>
          <PublicRoute authed={authed} path="/login" component={Login} />
          <PublicRoute authed={authed} path="/restore" component={RestorePassword} />
          <PublicRoute authed={authed} path="/register" component={Register} />
          <PrivateRoute authed={authed} path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
