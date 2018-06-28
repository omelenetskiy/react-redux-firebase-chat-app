import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../actions/changeHeaderData';
import SingleNew from './SingleNews';

class NoConversations extends Component {
  state = {
    articles: null,
  };

  componentDidMount() {
    this.fetchNews();
  }

  isOpen = (e) => {
    const { activeSidebar } = this.props;
    e.preventDefault();
    e.stopPropagation();
    activeSidebar();
  };

  fetchNews = () => {
    const url = 'https://newsapi.org/v2/top-headlines?country=ru&category=technology&apiKey=8ad9f8271d2943ec911506b4c9c21106';
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        response.json().then((data) => {
          this.setState({ articles: data.articles });
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  render() {
    const { articles } = this.state;
    return (
      <div
        className="chat__main no-conversations"
        role="button"
        tabIndex="0"
        onClick={this.isOpen}
        onKeyUp={() => {}}
      >
        <div className="chat__main__choose">
          <h2 className="ui-text-headline">
NO ACTIVE CONVERSATION
          </h2>
          <button type="button" className="ui-button ui-button_raised" onClick={this.isOpen}>
            <i className="fas fa-arrow-left" />
            Choose user to chat
          </button>
        </div>
        <div className="chat__main__news">
          {articles
            ? articles.map((article, ind) => {
              if (ind < 4) {
                return (
                  <SingleNew
                    url={article.url}
                    urlToImage={article.urlToImage}
                    title={article.title}
                    description={article.description}
                    key={article.url}
                  />
                );
              }
              return null;
            })
            : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  activeSidebar: () => dispatch(isActiveSidebar()),
});

export default connect(
  null,
  mapDispatchToProps,
)(NoConversations);

NoConversations.propTypes = {
  activeSidebar: PropTypes.func.isRequired,
};
