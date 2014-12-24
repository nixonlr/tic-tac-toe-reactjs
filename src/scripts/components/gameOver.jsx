/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Winner = require('./winner');
var Restart = require('./restart');

console.log(Restart);

var GameOver = React.createClass({
	
	render: function() {
		return(
			<div className='container' id="gameOver">
				<Winner winner={this.props.game.winner}/>
				<Restart game={this.props.game}/>
			</div>
		);
	}
});

module.exports = GameOver;
