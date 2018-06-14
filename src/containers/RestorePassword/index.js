import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { restorePassword } from '../../actions/authUser';
import AuthButton from '../../components/AuthButton';
import InputField from '../../components/InputField';
import './restore.sass';

class RestorePassword extends Component {
	state = {
		email: ''
	};
	handleChangeInput = e => {
		const target = e.target;
		this.setState({
			[target.name]: target.value
		});
	};

	resetPass = () => {
		this.props.restorePassword(this.state.email);
	};

	render() {
		const { email } = this.state;
		const { inProcess } = this.props;
		return (
			<div className="restore">
				<div className="ui-card">
					<div className="ui-card__title">
						<h4 className="ui-text-title">Restore password</h4>
					</div>
					<form onSubmit={this.resetPass}>
						<div className="ui-card__content">
							<InputField
								value={email}
								type="email"
								name="email"
								text="Email"
								onChange={this.handleChangeInput}
							/>
						</div>
						<div className="ui-card__actions">
							<div>
								<AuthButton
									className="ui-button_raised"
									inProcess={inProcess}
									buttonName="Send"
									onClick={this.resetPass}
								/>
							</div>
							<div className="form__actions__link">
								<Link to="/login">To login page</Link>
							</div>
						</div>
					</form>
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
		restorePassword: email => dispatch(restorePassword(email))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(RestorePassword)
);

RestorePassword.propTypes = {
	restorePassword: PropTypes.func,
	inProcess: PropTypes.bool
};
