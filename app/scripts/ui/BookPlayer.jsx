import React from 'react';
import BookControls from './BookControls.jsx';

export default React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount: function() {
    // return Book.find(this.props.params.slug).then((book) => {
    //   if (!book) return alert('Error finding Book');
    //   this.setState(book);
    // });
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
