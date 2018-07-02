import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isActiveSidebar } from '../actions/changeHeaderData';
import fetchNews from '../actions/fetchNews';
import SingleNew from './SingleNews';

class NoConversations extends Component {
  componentDidMount() {
    const { fetchNews } = this.props;
    fetchNews();
  }

  isOpen = (e) => {
    const { activeSidebar } = this.props;
    e.preventDefault();
    e.stopPropagation();
    activeSidebar();
  };

  render() {
    const { news } = this.props;
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
          {news !== null && news.length
            ? news.map((article, ind) => {
              if (ind < 4) {
                return (
                  <SingleNew
                    url={article.url}
                    urlToImage={article.urlToImage}
                    title={article.title}
                    description={article.description}
                    key={ind}
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

const mapStateToProps = state => ({
  news: state.news.news,
});

const mapDispatchToProps = dispatch => ({
  activeSidebar: () => dispatch(isActiveSidebar()),
  fetchNews: () => dispatch(fetchNews()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoConversations);

NoConversations.propTypes = {
  fetchNews: PropTypes.func.isRequired,
  activeSidebar: PropTypes.func.isRequired,
  news: PropTypes.array.isRequired,
};
