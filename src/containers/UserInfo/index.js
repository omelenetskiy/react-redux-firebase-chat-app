import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, NavLink } from 'react-router-dom';
import { closeFile } from '../../actions/changeFile';
import ChangePassword from './ChangePassword';
import UserCard from '../../components/UserCard';
import './userinfo.sass';

class UserInfo extends Component {
	goBack = () => {
		this.props.history.replace('/');
	};
	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			this.props.closeFile();
		}
	}
	componentWillUnmount() {
		this.props.closeFile();
	}
	render() {
		const { match } = this.props;
		return (
			<div className="user-info">
				<div className="user-info__header">
					<button
						className="ui-button ui-button_icon"
						onClick={this.goBack}
					>
						<i className="fas fa-arrow-left fa-5x" />
					</button>
					<h2>Settings</h2>
				</div>
				<div className="user-info__tabs">
					<ul>
						<li>
							<NavLink
								to={`${match.url}/profile`}
								activeClassName="active"
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to={`${match.url}/password`}
								activeClassName="active"
							>
								Password
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="user-info__wrapper">
					<Switch>
						<Route
							exact
							path={`${match.url}/profile`}
							render={() => <UserCard />}
						/>
						<Route
							exact
							path={`${match.url}/password`}
							render={() => <ChangePassword />}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		closeFile: () => dispatch(closeFile())
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(UserInfo)
);

UserInfo.propTypes = {
	closeFile: PropTypes.func
};
