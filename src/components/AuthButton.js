import React from 'react';
import PropTypes from 'prop-types';

const AuthButton = ({
  className, icon, buttonName, inProcess, onClick, title,
}) => (
    <button
      type="button"
      className={`ui-button ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(buttonName);
      }}
      title={title}
    >
      {inProcess ? <i className="fas fa-spinner fa-pulse" /> : buttonName || <i className={icon} />}
    </button>
  );

export default AuthButton;

AuthButton.defaultProps = {
  buttonName: '',
  inProcess: false,
  title: '',
  icon: null,
};

AuthButton.propTypes = {
  className: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  inProcess: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string,
};
