import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthButton extends Component {
	render() {
		const { className, icon, buttonName, inProcess, onClick } = this.props;
		return (
			<button
				className={`ui-button ${className}`}
				onClick={e => {
					e.preventDefault();
					onClick();
				}}
			>
				{inProcess ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					buttonName || <i className={icon} />
				)}
			</button>
		);
	}
}

export default AuthButton;

AuthButton.propTypes = {
	onClick: PropTypes.func,
	inProcess: PropTypes.bool,
	icon: PropTypes.string,
};
