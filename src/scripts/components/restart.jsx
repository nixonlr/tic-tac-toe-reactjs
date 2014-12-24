/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Restart = React.createClass({
	restartHandler: function(){
		this.props.game.restart();
		window.location.reload();
	},

	render: function() {
		return (
			<button onClick={this.restartHandler} className="btn-success btn-block"> Play Again </button>
		);
	}
});

module.exports = Restart;
