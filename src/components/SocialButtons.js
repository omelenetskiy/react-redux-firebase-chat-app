import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthButton from './AuthButton';
import { googleAuth, facebookAuth, githubAuth } from '../actions/authUser';

const SocialButtons = ({
  inProcess, google, facebook, github,
}) => (
  <React.Fragment>
    <AuthButton
      className="ui-button_icon"
      inProcess={inProcess}
      icon="fab fa-google"
      onClick={google}
    />
    <AuthButton
      className="ui-button_icon"
      inProcess={inProcess}
      icon="fab fa-facebook-f"
      onClick={facebook}
    />
    <AuthButton
      className="ui-button_icon"
      inProcess={inProcess}
      icon="fab fa-github"
      onClick={github}
    />
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  google: () => dispatch(googleAuth()),
  facebook: () => dispatch(facebookAuth()),
  github: () => dispatch(githubAuth()),
});

export default connect(
  null,
  mapDispatchToProps,
)(SocialButtons);

SocialButtons.defaultProps = {
  inProcess: false,
};

SocialButtons.propTypes = {
  inProcess: PropTypes.bool,
  google: PropTypes.func.isRequired,
  facebook: PropTypes.func.isRequired,
  github: PropTypes.func.isRequired,
};
