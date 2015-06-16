import React from 'react';
import { Link } from 'react-router';

import BookActions from '../actions/BookActions';
import BookStore from '../stores/BookStore';

export default React.createClass({
  // getInitialState: function() {
  //   // fileManager.getBooks().then(function() {
  //   //   console.log(arguments)
  //   // }).catch(function() {
  //   //   console.log(arguments);
  //   // })
  //   var books = [
  //     { title: 'H2G2', slug: 'h2g2', author: 'Douglas Adams', duration: 350 },
  //     { title: 'The color of Magic', author: 'Terry Pratchet', duration: 300 }
  //   ].map((book) => new Book(book));
  //
  //   books.map((book) => book.save()); // FIXME for dev, remove me
  //
  //   return { books };
  // },

  getInitialState() {
    return BookStore.getState();
  },

  componentDidMount() {
    BookStore.listen(this.onChange);
  },

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },


  render: function() {
    return (
      <div>
        <button type="button" onClick={BookActions.chooseNewBooks.bind(BookActions)}>Pick directory</button>
        {
          this.state.books.map(function(book) {
            return (<div><Link to="player" params={book}>{book.title}</Link></div>);
          })
        }
      </div>
    );
  }
});
