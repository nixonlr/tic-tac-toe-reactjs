/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Board = require('./board');

var Restart = React.createClass({
	restartHandler: function(){
		this.props.game.restart();
		React.renderComponent(<Board game={this.props.game}/>, document.getElementById('content'));
	},

	render: function() {
		return (
			<button onClick={this.restartHandler} className="btn-success btn-block"> Play Again </button>
		);
	}
});

module.exports = Restart;
