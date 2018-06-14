import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarUser from '../../../components/SidebarUser';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { usersRef, offUsers } from '../../../actions/usersRef';
import './sidebarUsers.sass';

class SidebarUsers extends Component {
	componentDidMount() {
		this.props.usersRef();
	}
	componentWillUnmount() {
		this.props.offUsers();
	}
	render() {
		const { users, sender, userSearch } = this.props;
		return (
			<div className="chat__sidebar__users">
				<div className="sidebar__users__title">
					<h4>
						USERS (
						{users
							? users.filter(user => {
									if (user.name) {
										return (
											user.name
												.toLowerCase()
												.includes(
													userSearch.toLowerCase()
												) && user.id !== sender
										);
									}
									return null;
							  }).length
							: 0}
						)
					</h4>
					<button className="ui-button ui-button_icon">
						<i className="fas fa-chevron-down" />
					</button>
				</div>
				<div className="sidebar__users__list">
					{users && users.length > 1
						? users
								.filter(user => {
									if (user.name) {
										return (
											user.name
												.toLowerCase()
												.includes(
													userSearch.toLowerCase()
												) && user.id !== sender
										);
									}
									return null;
								})
								.map(user => (
									<NavLink
										exact
										to={`/users/${user.id}`}
										key={user.id}
										activeClassName="user_active"
									>
										<SidebarUser
											avatar={user.avatar}
											online={user.online}
											username={user.name}
											lastMsg={user.lastMsg}
											id={user.id}
										/>
									</NavLink>
								))
						: 'No users here'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sender: state.authUser.currentUid,
	users: state.users.users,
	userSearch: state.userSearch
});

const mapDispatchToProps = dispatch => {
	return {
		usersRef: () => dispatch(usersRef()),
		offUsers: () => dispatch(offUsers())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SidebarUsers)
);

SidebarUsers.propTypes = {
	usersRef: PropTypes.func,
	offUsers: PropTypes.func,
	sender: PropTypes.string,
	users: PropTypes.array,
	userSearch: PropTypes.string
};
