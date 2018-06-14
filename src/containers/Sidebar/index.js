import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SidebarLogedUser from './SidebarLogedUser';
import SidebarSearch from './SidebarSearch';
import SidebarRooms from './SidebarRooms';
import SidebarUsers from './SidebarUsers';
import './sidebar.sass';

const Sidebar = ({ isActive }) => {
	return (
		<div
			className={
				isActive
					? 'chat__sidebar chat__sidebar_active'
					: 'chat__sidebar'
			}
		>
			<SidebarLogedUser />
			<SidebarSearch />
			<SidebarRooms />
			<SidebarUsers />
		</div>
	);
};

const matStateToProps = state => ({
	isActive: state.chatHeader.isActive
});

export default withRouter(connect(matStateToProps)(Sidebar));

Sidebar.propTypes = {
	isActive: PropTypes.bool
};
