import alt from '../alt';
import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      clearList: BookActions.clearList,
      loadAll: BookActions.loadAll,
      save: BookActions.save,
      delete: BookActions.delete,
      handleError: BookActions.handleError,
      chooseNewBooks: BookActions.chooseNewBooks
    });

    this.books = [];
  }

  loadAll(books) {
    this.setState({ books: books });
    // this.setState(Object.assign({}, this.state, { books: books });
  }

  save(book) {
    var foundBook = false;
    var books = this.books.map(stateBook => {
      if (stateBook.slug !== book.slug) return stateBook;
      foundBook = true;
      return book;
    });

    if (!foundBook) books.push(book);

    console.log(books);
    this.setState({ books });
    // this.setState(Object.assign({}, this.state, { books: books });
  }

  delete(book) {
    // TODO replace with better identifier
    this.setState({ books: this.books.filter(stateBook => stateBook.slug !== book.slug )});
    // this.setState(Object.assign({}, this.state, { books: books });
  }

  clearList() {
    this.setState({ books: [] });
  }

  handleError(err) {
    this.errorMessage = err.message;
  }

  chooseNewBooks(...whatever) {
    console.log('chose new books', whatever);
  }
}

export default alt.createStore(BookStore, 'BookStore');
