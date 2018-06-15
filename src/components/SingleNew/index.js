import React from 'react';
import './new.sass';

const SingleNew = ({ urlToImage, description, url, title }) => {
	const divStyle = {
		backgroundImage: 'url(' + urlToImage + ')',
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
