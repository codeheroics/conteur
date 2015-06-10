'use strict';

var React = require('react');
var { Link } = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
        <i><Link to="list">&lt;</Link></i>
        <h1>{this.props.title}</h1>
        <i>Change dir</i>
      </div>
    );
  }
});
