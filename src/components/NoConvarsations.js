import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../actions/changeHeaderData';
import SingleNew from './SingleNew';

class NoConversations extends Component {
	state = {
		articles: null
	};
	fetchNews = () => {
		const url =
			'https://newsapi.org/v2/top-headlines?country=ru&category=technology&apiKey=8ad9f8271d2943ec911506b4c9c21106';
		fetch(url)
			.then(response => {
				if (response.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' +
							response.status
					);
					return;
				}
				response.json().then(data => {
					console.log(data.articles);
					this.setState({ articles: data.articles });
				});
			})
			.catch(err => {
				console.log('Fetch Error :-S', err);
			});
	};

	isOpen = e => {
		e.preventDefault();
		e.stopPropagation();
		this.props.isActiveSidebar();
	};
	componentDidMount() {
		this.fetchNews();
	}
	render() {
		const { isActiveSidebar } = this.props;
		const { articles } = this.state;
		return (
			<div className="chat__main no-conversations" onClick={this.isOpen}>
				<div className="chat__main__choose">
					<h2 className="ui-text-headline">
						NO ACTIVE CONVERSATIONS
					</h2>
					<button
						className="ui-button ui-button_raised"
						onClick={this.isOpen}
					>
						<i className="fas fa-arrow-left" />
						Choose user to chat
					</button>
				</div>
				<div className="chat__main__news">
					{articles
						? articles.map((article, ind) => {
								if (ind < 4)
									return (
										<SingleNew
											url={article.url}
											urlToImage={article.urlToImage}
											title={article.title}
											description={article.description}
											key={ind}
										/>
									);
						  })
						: null}
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ isActiveSidebar }
)(NoConversations);

NoConversations.propTypes = {
	isActiveSidebar: PropTypes.func
};
