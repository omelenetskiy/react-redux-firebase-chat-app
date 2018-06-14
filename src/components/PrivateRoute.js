import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				authed === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;

PrivateRoute.propTypes = {
	authed: PropTypes.bool,
};
