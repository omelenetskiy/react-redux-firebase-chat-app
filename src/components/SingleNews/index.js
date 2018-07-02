import React from 'react';
import PropTypes from 'prop-types';
import news from '../../static/img/bg/news.png';
import './new.sass';

const SingleNew = ({
  urlToImage, description, url, title,
}) => {
  const divStyle = {
    backgroundImage: `url( ${urlToImage || news} )`,
  };
  return (
    <a href={url}>
      <div className="new__single" style={divStyle} />
      <h4>
        {title}
      </h4>
      <p>
        {description}
      </p>
    </a>
  );
};

export default SingleNew;

SingleNew.defaultProps = {
  urlToImage: '',
  url: '#',
  description: '',
  title: '',
};

SingleNew.propTypes = {
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};
