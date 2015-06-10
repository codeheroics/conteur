
var React = window.React = require('react');
var Router = require('react-router');

var {DefaultRoute, Link, Route, RouteHandler} = Router;

var BookPlayer = require('./ui/BookPlayer.jsx');
var BooksList = require('./ui/BooksList.jsx');
var Toolbar = require('./ui/Toolbar.jsx');

var fileManager = require('./lib/fileManager.js');

var Conteur = React.createClass({
  pickDirectory: fileManager.pickDirectory,

  getInitialState: function() {
    return {items: [], text: ''}; // Will need to chage this
  },
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
