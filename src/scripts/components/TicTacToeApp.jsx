/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Game = require('../game');
var Board = require('./board');


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');


var TicTacToeApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <Board game={Game}/>
        </ReactTransitionGroup>
      </div>
    );
  }
});
React.renderComponent(<TicTacToeApp />, document.getElementById('subContent')); // jshint ignore:line

module.exports = TicTacToeApp;
