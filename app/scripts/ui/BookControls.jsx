import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {
      title: 'H2G2',
      author: 'Douglas Adams',
      duration: 350,
      files: ['Got', 'Some', 'Files']
    };
  },
  render: function() {
    return (
      <div className="controls">
        <i className="fa fa-fast-backward"></i>
        <i className="fa fa-step-backward">1mn</i>
        <i className="fa fa-step-backward">15s</i>
        <i className="fa fa-play">Play</i>
        <i className="fa fa-pause">Pause</i>
        <i className="fa fa-step-forward">15s</i>
        <i className="fa fa-step-forward">1min</i>
        <i className="fa fa-fast-forward"></i>
      </div>
    );
  }
});
