/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Winner = require('./winner');
var Restart = require('./restart');

var GameOver = React.createClass({
	render: function() {
		return(
			<div className='container' id="gameOver">
				<Winner winner={this.props.gameInfo.game.winner}/>
				<Restart gameInfo={this.props.gameInfo}/>
			</div>
		);
	}
});

module.exports = GameOver;
