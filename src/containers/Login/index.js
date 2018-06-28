import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginToAcc } from '../../actions/authUser';
import AuthButton from '../../components/AuthButton';
import SocialButtons from '../../components/SocialButtons';
import InputField from '../../components/InputField';
import { errorOpen } from '../../actions/error';
import './login.sass';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChangeInput = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value,
    });
  };

  loginWithEmail = () => {
    const { email, password } = this.state;
    const { errorOpen, loginToAcc } = this.props;
    if (password) {
      loginToAcc(email, password);
    } else {
      errorOpen('You must enter a password.');
    }
  };

  render() {
    const { email, password } = this.state;
    const { inProcess } = this.props;
    return (
      <div className="login">
        <div className="ui-card">
          <div className="ui-card__title">
            <h4 className="ui-text-title">
Login
            </h4>
          </div>
          <form onSubmit={this.loginWithEmail}>
            <div className="ui-card__content">
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
            </div>
            <div className="ui-card__actions">
              <div>
                <AuthButton
                  className="ui-button_raised"
                  inProcess={inProcess}
                  buttonName="Login"
                  onClick={this.loginWithEmail}
                />
                <SocialButtons inProcess={inProcess} />
              </div>
              <div className="form__actions__link">
                Don`t have an account?
                {' '}
                <Link to="/register">
Sign Up
                </Link>
              </div>
              <div className="form__actions__link">
                Forgot password?
                {' '}
                <Link to="/restore">
Restore
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inProcess: state.authUser.inProcess,
});
const mapDispatchToProps = dispatch => ({
  loginToAcc: (email, password) => dispatch(loginToAcc(email, password)),
  errorOpen: error => dispatch(errorOpen(error)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);

Login.defaultProps = {
  inProcess: false,
};

Login.propTypes = {
  loginToAcc: PropTypes.func.isRequired,
  inProcess: PropTypes.bool,
  errorOpen: PropTypes.func.isRequired,
};
