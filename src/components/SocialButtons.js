import React from 'react';
import AuthButton from './AuthButton';
import { connect } from 'react-redux';
import { googleAuth, facebookAuth, githubAuth } from '../actions/authUser';

const SocialButtons = props => {
	return (
		<React.Fragment>
			<AuthButton
				className="ui-button_icon"
				inProcess={props.inProcess}
				icon="fab fa-google"
				onClick={props.googleAuth}
			/>
			<AuthButton
				className="ui-button_icon"
				inProcess={props.inProcess}
				icon="fab fa-facebook-f"
				onClick={props.facebookAuth}
			/>
			<AuthButton
				className="ui-button_icon"
				inProcess={props.inProcess}
				icon="fab fa-github"
				onClick={props.githubAuth}
			/>
		</React.Fragment>
	);
};

export default connect(
	null,
	{ googleAuth, facebookAuth, githubAuth }
)(SocialButtons);
