import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../../../components/InputField';
import { changePassword } from '../../../actions/changeUserData';
import { errorOpen } from '../../../actions/error';
import AuthButton from '../../../components/AuthButton';
class ChangePassword extends Component {
	state = {
		newPassword: '',
		confirmPassword: ''
	};
	onChange = e => {
		const target = e.target;
		this.setState({
			[target.name]: target.value
		});
	};
	newPassword = (newPassword, confirmPassword) => {
		if (newPassword !== '' && newPassword === confirmPassword) {
			this.props.changePassword(newPassword);
			this.setState({
				newPassword: '',
				confirmPassword: ''
			});
		} else {
			this.props.errorOpen('Different passwords!');
		}
	};
	render() {
		const { inProcess } = this.props;
		const { newPassword, confirmPassword } = this.state;
		return (
			<div className="user-info__restore">
				<div className="card-headline">
					<h2 className="ui-text-headline">CHANGE PASSWORD</h2>
				</div>
				<div className="ui-card__content">
					<InputField
						value={newPassword}
						type="password"
						name="newPassword"
						text="New password"
						onChange={this.onChange}
					/>
				</div>
				<div className="ui-card__content">
					<InputField
						value={confirmPassword}
						type="password"
						name="confirmPassword"
						text="Confirm new password"
						onChange={this.onChange}
					/>
				</div>
				<div className="ui-card__actions">
					<AuthButton
						onClick={() =>
							this.newPassword(newPassword, confirmPassword)
						}
						className="ui-button_raised"
						buttonName="CHANGE PASSWORD"
						inProcess={inProcess}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	inProcess: state.authUser.inProcess
});

const mapDispatchToProps = dispatch => {
	return {
		changePassword: newPass => dispatch(changePassword(newPass)),
		errorOpen: error => dispatch(errorOpen(error))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePassword);

ChangePassword.propTypes = {
	changePassword: PropTypes.func,
	inProcess: PropTypes.bool
};
