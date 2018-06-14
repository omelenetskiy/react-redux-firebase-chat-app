import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				authed === false ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default PublicRoute;

PublicRoute.propTypes = {
	authed: PropTypes.bool,
};
