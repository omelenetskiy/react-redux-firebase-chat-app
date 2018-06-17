import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../../../actions/changeHeaderData';
import logo from '../../../static/img/react/logo.png';
import './header.sass';
import { database } from '../../../configs/firebase';

class ChatHeader extends Component {
	state = {
		headerName: '',
		lastSeen: 0,
		online: 0,
		createDate: ''
	};
	setHeader = () => {
		const path = this.props.location.pathname;
		const pathname = this.props.location.pathname.split('/')[2];
		const dbPath = path.includes('rooms') ? '/channels' : '/users';
		database.ref(dbPath).on('value', snapshot => {
			const users = snapshot.val();
			Object.values(users).forEach(el => {
				if (el.id === pathname) {
					this.setState({
						headerName: el.name,
						lastSeen: 0,
						online: 0,
						createDate: el.createAt
					});
					if (!path.includes('rooms')) {
						this.setState({
							lastSeen: el.lastSeen,
							online: el.online,
							createDate: ''
						});
					}
				}
			});
		});
	};

	getTime = date => {
		// from js assignments
		const now = Date.now();
		let diff = now - date,
			s = 1000, // second
			m = s * 60, // minute
			h = m * 60, // hour
			d = h * 24; // day
		if (diff <= 45 * s) return 'a few seconds ago';
		if (diff <= 90 * s) return 'a minute ago';
		if (diff <= 45 * m) return `${Math.round((diff - 1) / m)} minutes ago`;
		if (diff <= 90 * m) return 'an hour ago';
		if (diff <= 22 * h) return `${Math.round((diff - 1) / h)} hours ago`;
		if (diff <= 36 * h) return 'a day ago';
		if (diff <= 25 * d) return `${Math.round((diff - 1) / d)} days ago`;
		if (diff <= 45 * d) return 'a month ago';
		if (diff <= 345 * d) return `${Math.round(diff / 30 / d)} months ago`;
		if (diff <= 545 * d) return 'a year ago';
		return `${Math.round(diff / 365 / d)} years ago`;
	};

	componentDidUpdate(prevProps) {
		if (
			prevProps.location.pathname.split('/')[2] !==
			this.props.location.pathname.split('/')[2]
		) {
			this.setHeader();
		}
	}

	componentDidMount() {
		this.setHeader();
	}
	render() {
		const { isActiveSidebar } = this.props;
		const { headerName, lastSeen, online, createDate } = this.state;
		const date = new Date(createDate);
		return (
			<div className="chat__main__header">
				<div className="header__controls">
					<button
						className="ui-button ui-button_icon"
						onClick={isActiveSidebar}
						title="log out"
					>
						<i className="fas fa-2x fa-bars" />
					</button>
					<div>
						<h2 className="ui-text-headline">
							{headerName ? headerName : 'unknown'}
						</h2>
						{lastSeen ? (
							<p>
								{online
									? 'Online'
									: `Last seen ${this.getTime(lastSeen)}`}
							</p>
						) : (
							<p>{online ? 'Online' : 'Offline'}</p>
						)}
					</div>
				</div>
				<div className="chat__main__header__logo">
					<img src={logo} alt="" />
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(
		null,
		{ isActiveSidebar }
	)(ChatHeader)
);

ChatHeader.propTypes = {
	isActiveSidebar: PropTypes.func
};
