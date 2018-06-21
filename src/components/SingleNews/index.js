import React from 'react';
import news from '../../static/img/bg/news.png';
import './new.sass';

const SingleNew = ({ urlToImage, description, url, title }) => {
	const divStyle = {
		backgroundImage: `url(${urlToImage ? urlToImage : news})`
	};
	return (
		<a href={url} target="_blank">
			<div className="new__single" style={divStyle} />
			<h4>{title}</h4>
			<p>{description}</p>
		</a>
	);
};

export default SingleNew;
