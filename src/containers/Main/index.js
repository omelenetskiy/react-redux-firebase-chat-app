import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatMsgs from './ChatMsgs';
import NoConversations from '../../components/NoConvarsations';

import './main.sass';

class Main extends Component {
	render() {
		const { location, isActive } = this.props;
		return location.pathname !== '/' ? (
			<div
				className={
					isActive ? 'chat__main chat__main_active' : 'chat__main'
				}
			>
				<ChatHeader />
				<Route
					exact
					path={
						location.pathname.includes('/users/')
							? '/users/:id'
							: '/rooms/:id'
					}
					component={ChatMsgs}
				/>
			</div>
		) : (
			<NoConversations />
		);
	}
}
const matStateToProps = state => ({
	isActive: state.chatHeader.isActive
});

export default withRouter(connect(matStateToProps)(Main));

Main.propTypes = {
	isActive: PropTypes.bool
};
