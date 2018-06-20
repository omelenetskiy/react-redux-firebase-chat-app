import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorClose } from '../../actions/error';
import './Error.sass';

const success = {
	backgroundColor: 'rgba(76, 175, 80, .8)',
	color: '#ffffff',
};

const Error = ({ errorClose, isOpen, error, color }) => {
	return isOpen ? (
		<div className="error" style={color ? success : null}>
			<div className="error__text">{error}</div>
			<button className="close" onClick={() => errorClose()}>
				<i className="fas fa-times-circle fa-2x" />
			</button>
		</div>
	) : null;
};

const mapStateToProps = state => ({
	isOpen: state.error.isOpen,
	error: state.error.error,
	color: state.error.color,
});

const mapDispatchToProps = dispatch => {
	return {
		errorClose: () => dispatch(errorClose()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Error);

Error.defaultProps = {
	color: 'success',
};

Error.propTypes = {
	errorClose: PropTypes.func,
	isOpen: PropTypes.bool,
	error: PropTypes.string,
};
