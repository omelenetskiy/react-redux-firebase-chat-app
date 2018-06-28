import React from 'react';
import PropTypes from 'prop-types';
import './InputFile.sass';

const InputFile = ({ fileName, close }) => (
  <div className="attachment__top">
    <div className="attachment">
      <span>
        {fileName}
      </span>
      <button type="button" className="close" onClick={() => close()}>
        <i className="far fa-times-circle" />
      </button>
    </div>
  </div>
);

export default InputFile;

InputFile.propTypes = {
  fileName: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
