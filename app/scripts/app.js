import React from 'react';
import Router from 'react-router';

let {DefaultRoute, Route, RouteHandler} = Router;

import BookPlayer from './ui/BookPlayer.jsx';
import BooksList from './ui/BooksList.jsx';
import Toolbar from './ui/Toolbar.jsx';

import localforage from 'localforage';
localforage.setDriver(localforage.LOCALSTORAGE);

var Conteur = React.createClass({
  render: function() {
    return (
      <div>
        <Toolbar title="Conteur" />
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={Conteur}>
    <Route name="list" handler={BooksList}/>
    <Route name="player" path=":slug" handler={BookPlayer}/>
    <DefaultRoute handler={BooksList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
