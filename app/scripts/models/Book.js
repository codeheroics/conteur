'use strict';
var localforage = require('localforage');
var slugify = require('underscore.string').slugify;

module.exports = class Book {
  constructor(options) {
    Object.assign(this, options, { keyType: 'book' });
    this.slug = slugify(options.title);
  }

  static createFromFiles(files) {
    var directories = new Map();
    var books = [];

    files.forEach((file) => {
      var fileNameIndex = file.name.lastIndexOf('/');
      var directoryPath = file.name.substr(0, fileNameIndex >= 0 ? fileNameIndex : '/');
      file.nameWithoutPath = file.name.substr(1 + (fileNameIndex >= 0 ? fileNameIndex : 0));
      directories.set(directoryPath, (directories.get(directoryPath) || []).concat(file));
    });

    for (let [directory, dirFiles] of directories.entries()) {
      var audioFiles = [];
      var cover = null;
      for (let dirFile of dirFiles) {
        console.log(dirFile, dirFile.type.contains('audio'));
        if (dirFile.type.contains('audio')) audioFiles.push(dirFile);
        else if (dirFile.type.contains('image')) cover = dirFile;
      }

      if (!audioFiles.length) continue;

      books.push(new Book({
        files: audioFiles,
        cover: cover,
        title: audioFiles[0].nameWithoutPath
      }));
    }

    return books;
  }

  static getList() {
    var list = [];
    return localforage.iterate((value) => {
      if (value.keyType !== 'book') return;
      list.push(new Book(value));
    })
    .then(() => list).then(console.log.bind(console));
  }

  static clearList() {
    return Book.getList().then((list) => {
      return Promise.all(list.map((book) => book.delete()));
    });
  }

  static find(slug) {
    return localforage.getItem(slug).then(function(book) {
      if (!book) return;
      return new Book(book);
    });
  }

  save() {
    return localforage.setItem(this.slug, this);
  }

  delete() {
    return localforage.removeItem(this.slug);
  }
};
