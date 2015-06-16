import localforage from 'localforage';
import { slugify } from 'underscore.string';

import alt from '../alt';
// import BookStore from '../stores/BookStore';
import FileManager from '../lib/fileManager';

class BookActions {

  clearList() {
    //
    // // FIXME
    // return this.dispatch();
    //
    //
    //
    //
    // Promise.all(BookStore.getState().books.map((book) => book.delete()))
    // .then(() => this.dispatch())
    // .catch(this.actions.handleError.bind(this.actions));
  }

  loadAll() {
    var list = [];
    return localforage.iterate((value) => {
      if (value.keyType !== 'book') return;
      list.push(value);
    })
    .then(() => this.dispatch(list))
    .catch(this.actions.handleError.bind(this.actions));
  }

  save(book) {
    if (!book.title) throw new Error('No title to book ' + JSON.stringify(book));
    book.keyType = 'book';
    book.slug = slugify(book.title);

    return localforage.setItem(book.slug, book)
    .then(() => this.dispatch(book))
    .catch(this.actions.handleError.bind(this.actions));
  }

  delete(book) {
    return localforage.removeItem(book.slug)
    .then(() => this.dispatch(book))
    .catch(this.actions.handleError.bind(this.actions));
  }

  chooseNewBooks() {
    return FileManager.pickDirectoryAndGetFiles()
    .then((files) => {
      var directories = new Map();
      var books = [];

      files.forEach((file) => {
        var fileNameIndex = file.name.lastIndexOf('/');
        var directoryPath = file.name.substr(0, fileNameIndex >= 0 ? fileNameIndex : '/');
        file.nameWithoutPath = file.name.substr(1 + (fileNameIndex >= 0 ? fileNameIndex : 0));
        directories.set(directoryPath, (directories.get(directoryPath) || []).concat(file));
      });

      for (let [dirPath, dirFiles] of directories.entries()) {
        var audioFiles = [];
        var cover = null;

        var dirNameIndex = dirPath.lastIndexOf('/');
        var directoryNameWithoutPath = dirPath.substr(1 + (dirNameIndex >= 0 ? dirNameIndex : 0));

        for (let dirFile of dirFiles) {
          if (dirFile.type.contains('audio')) audioFiles.push(dirFile);
          else if (dirFile.type.contains('image')) cover = dirFile;
        }

        if (!audioFiles.length) continue;

        books.push({
          files: audioFiles,
          cover: cover,
          title: directoryNameWithoutPath
        });
      }

      return Promise.all(books.map(book => this.actions.save(book)))
      .then(() => this.dispatch())
      .catch(this.actions.handleError.bind(this.actions));
    });
  }

  handleError(err) {
    return this.dispatch(err);
  }
}

export default alt.createActions(BookActions);
