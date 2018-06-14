import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from '../../components/AuthButton';
import InputField from '../../components/InputField';
import { createNewUser } from '../../actions/authUser';
import { errorOpen } from '../../actions/error';
import './register.sass';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	handleChangeInput = event => {
		const target = event.target;
		this.setState({
			[target.name]: target.value
		});
	};

	createUser = () => {
		const { name, email, password, confirmPassword } = this.state;
		const { errorOpen } = this.props;
		if (name && password) {
			if (password === confirmPassword) {
				this.props.createNewUser(name, email, password);
			} else {
				errorOpen('Different paswords fields!');
			}
		} else {
			errorOpen('Please, complete all fields.');
		}
	};

	render() {
		const { name, email, password, confirmPassword } = this.state;
		const { inProcess } = this.props;
		return (
			<div className="register">
				<div className="ui-card">
					<div className="ui-card__title">
						<h4 className="ui-text-title">Register</h4>
					</div>
					<form onSubmit={this.createUser}>
						<div className="ui-card__content">
							<InputField
								value={name}
								type="text"
								name="name"
								text="Name"
								onChange={this.handleChangeInput}
							/>
							<InputField
								value={email}
								type="email"
								name="email"
								text="Email"
								onChange={this.handleChangeInput}
							/>
							<InputField
								value={password}
								type="password"
								name="password"
								text="Password"
								onChange={this.handleChangeInput}
							/>
							<InputField
								value={confirmPassword}
								type="password"
								name="confirmPassword"
								text="Confirm password"
								onChange={this.handleChangeInput}
							/>
						</div>
						<div className="ui-card__actions">
							<div>
								<AuthButton
									className="ui-button_raised"
									inProcess={inProcess}
									buttonName="Create new"
									onClick={this.createUser}
								/>
							</div>
							<div className="form__actions__link">
								Already have an account?{' '}
								<Link to="/login">Sign In</Link>
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
		createNewUser: (name, email, password) =>
			dispatch(createNewUser(name, email, password)),
		errorOpen: error => dispatch(errorOpen(error))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Register)
);

Register.propTypes = {
	inProcess: PropTypes.bool,
	createNewUser: PropTypes.func,
	errorOpen: PropTypes.func
};
