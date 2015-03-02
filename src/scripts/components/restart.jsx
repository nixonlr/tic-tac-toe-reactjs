/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Board = require('./board');

var Restart = React.createClass({
	restartHandler: function(){
		this.props.gameInfo.game.restart();
		React.unmountComponentAtNode(document.getElementById("content"));
		React.unmountComponentAtNode(document.getElementById("winnerIs"));
		React.renderComponent(<this.props.gameInfo.board game={this.props.gameInfo.game}/>, document.getElementById('content'));
	},

	render: function() {
		return (
			<button onClick={this.restartHandler} className="btn-success btn-block"> Play Again </button>
		);
	}
});

module.exports = Restart;
