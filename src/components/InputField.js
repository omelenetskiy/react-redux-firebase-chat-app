import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, onChange, value, name, text }) => {
	return (
		<label className="ui-field">
			<input value={value} type={type} name={name} onChange={onChange} />
			<span>{text}</span>
		</label>
	);
};

export default InputField;

InputField.propTypes = {
	type: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	text: PropTypes.string,
	name: PropTypes.string,
};
