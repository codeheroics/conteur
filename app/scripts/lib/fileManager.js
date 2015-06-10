'use strict';

var localforage = require('localforage');
var Book = require('../models/Book');

export default  {
  BOOKS_PATH_KEY: '__booksPath',

  pickDirectory() {
    var activity = new MozActivity({
      name: 'pick-folder'
    });

    return new Promise((resolve, reject) => {
      activity.onsuccess = function() {
        if (!this.result || !this.result.path) {
          return reject(new Error('Error while retrieving the folder'));
        }
        resolve(this.result.path); // Result is sent back without initial /
      };

      activity.onerror = function() {
        if (this.error.name === 'Activity cancelled') return reject();
        reject(new Error('Error while retrieving the folder'));
      };
    }).then(this.setBooksPath.bind(this));
  },

  getBooksPath() { // TODO proper getter/setter
    return localforage.getItem(this.BOOKS_PATH_KEY);
  },

  setBooksPath(path) { // TODO proper getter/setter
    return localforage.setItem(this.BOOKS_PATH_KEY, path);
  },

  loadBooksFromDirectory() {
    return this.getBooksPath().then((path) => {
      // FIXME this is a workaround path containing device name
      var deviceStorageName = path.substr(0, path.indexOf('/'));
      var deviceStorages = navigator.getDeviceStorages('sdcard');
      var chosenDeviceStorage = deviceStorages.find(deviceStorage => deviceStorage.storageName === deviceStorageName);
      if (chosenDeviceStorage) path = path.substr(path.indexOf('/') + 1);
      else chosenDeviceStorage = deviceStorage.getDeviceStorage('sdcard');
      var cursor = chosenDeviceStorage.enumerate(path); // FIXME THIS IS NOT AT ALL DOING THE FILTER IT'S SAID TO BE DOING HERE >_< https://developer.mozilla.org/en-US/docs/Web/API/DeviceStorage/enumerate
      var files = [];

      return new Promise((resolve, reject) => {
        cursor.onsuccess = function () {
          if (this.result) files.push(this.result);

          if (!this || this.done) return resolve(files);
          this.continue();
        }

        cursor.onerror = function () {
          console.warn("No file found: ", this.error);
          reject(this.error);
        }
      })
      .then(function() {
        return Promise.all(
          Book.createFromFiles(files).map(book => book.save())
        );
      })
      .then(Book.getList.bind(Book));
    });
  },

  pickDirectoryAndGetBooks() {
    return this.pickDirectory().then(this.loadBooksFromDirectory.bind(this)).catch((err) => {
      if (err) console.log(err);
    });
  }
};
