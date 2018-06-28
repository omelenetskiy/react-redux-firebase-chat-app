import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (authed === false ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default PublicRoute;

PublicRoute.defaultProps = {
  authed: false,
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool,
};
