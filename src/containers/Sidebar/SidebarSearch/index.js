import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSearch } from '../../../actions/userSearch';
import './sidebarSearch.sass';

class SidebarSearch extends Component {
  state = {
    text: '',
  };

  onChange = (event) => {
    const { userSearch } = this.props;
    const value = event.target.value;
    this.setState({ text: value });
    userSearch(value.trim());
  };

  render() {
    const { text } = this.state;
    return (
      <div className="chat__sidebar__search-bar">
        <input type="text" placeholder="User search..." value={text} onChange={this.onChange} />
        <i className="fas fa-search" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userSearch: text => dispatch(userSearch(text)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SidebarSearch);

SidebarSearch.propTypes = {
  userSearch: PropTypes.func.isRequired,
};
