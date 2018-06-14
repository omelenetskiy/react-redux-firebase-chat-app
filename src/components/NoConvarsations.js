import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../actions/changeHeaderData';
import chat from '../static/img/chat.png';

const NoConversations = ({ isActiveSidebar }) => {
	return (
		<div className="chat__main no-conversations">
			<img src={chat} alt="chat-logo" />
			<h2 className="ui-text-headline">No active conversations</h2>
			<p className="ui-text-subhead">
				<button
					className="ui-button ui-button_raised"
					onClick={e => {
						e.preventDefault();
						isActiveSidebar();
					}}
				>
					Choose user to chat
				</button>
			</p>
		</div>
	);
};

export default connect(
	null,
	{ isActiveSidebar }
)(NoConversations);

NoConversations.propTypes = {
	isActiveSidebar: PropTypes.func,
};
