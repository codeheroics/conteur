'use strict';

var React = require('react');
var { Link } = require('react-router');
var Book = require('../models/Book');
import fileManager from '../lib/fileManager';
console.log(fileManager);
module.exports = React.createClass({
  getInitialState: function() {
    // fileManager.getBooks().then(function() {
    //   console.log(arguments)
    // }).catch(function() {
    //   console.log(arguments);
    // })
    var books = [
      { title: 'H2G2', slug: 'h2g2', author: 'Douglas Adams', duration: 350 },
      { title: 'The color of Magic', author: 'Terry Pratchet', duration: 300 }
    ].map((book) => new Book(book));

    books.map((book) => book.save()); // FIXME for dev, remove me

    return { books };
  },
  render: function() {
    return (
      <div>
        <button type="button" onClick={fileManager.pickDirectoryAndGetBooks.bind(fileManager)}>Pick directory</button>
        {
          this.state.books.map(function(book) {
            return (<div><Link to="player" params={book}>{book.title} - {book.author} ({book.duration})</Link></div>)
          })
        }
      </div>
    );
  }
});
