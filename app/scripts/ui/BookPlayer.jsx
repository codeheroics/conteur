'use strict';

var React = require('react');
var Book = require('../models/Book');
var BookControls = require('./BookControls.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount: function() {
    return Book.find(this.props.params.slug).then((book) => {
      if (!book) return alert('Error finding Book');
      this.setState(book);
    });
  },
  render: function() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <h3>{this.state.author}</h3>
        <h4>{this.state.duration}</h4>
        <BookControls />
      </div>
    );
  }
});
