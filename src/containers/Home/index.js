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
		this.props.checkCurrentUser();
		this.props.onlineUserManage();
	}
	render() {
		const { createChannel } = this.props;
		return (
			<div className="chat">
				<Switch>
					<Route path="/settings" render={() => <UserInfo />} />
					<Route
						path="/"
						render={() => {
							return (
								<React.Fragment>
									<Sidebar />
									<Main />
								</React.Fragment>
							);
						}}
					/>
				</Switch>
				{createChannel ? <CreateChannel /> : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	createChannel: state.popup.createChannel
});

const mapDispatchToProps = dispatch => {
	return {
		onlineUserManage: () => dispatch(onlineUserManage()),
		checkCurrentUser: () => dispatch(checkCurrentUser())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
);

Home.propTypes = {
	createChannel: PropTypes.bool,
	onlineUserManage: PropTypes.func,
	checkCurrentUser: PropTypes.func
};
