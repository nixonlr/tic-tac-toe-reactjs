/**
 * @jsx React.DOM
 */
var React = require('react/addons');
var GameOver = require('./gameOver');
var Mark = require('./mark');

var Board = React.createClass({
	started: false,

	startGame: function(event){
		event.target.style.display = "none";
		this.props.game.startGame();
		this.started = true;
	},

	handleClick: function(event){
		if (this.started){
			var outcome = this.props.game.markBoard(event.target.id, "X");

			outcome.gameOver = this.props.game.gameOver();
			this.props.game.printBoard();
			
			if (outcome.gameOver){
				React.renderComponent(<GameOver game={this.props.game} />, document.getElementById('mainContainer'));
			} else {
				if (outcome.playerId){
					React.renderComponent(<Mark mark="X"/>, document.getElementById(outcome.playerId));
				}
				if (outcome.pcId){
					React.renderComponent(<Mark mark="O"/>, document.getElementById(outcome.pcId));
				} 
			}
		}
	},

	render: function(){
		var board = this.props.game.canvas.board;
		return (
			<div className='container' id='mainContainer'>
				<button className="btn-success btn-block" onClick={this.startGame}> Start Game </button>
				<table className="table table-bordered">
					<tbody>
				    {board.map(function(row, index){
				      return (
				        <tr id={"row_" + index} key={"row_" + index}>
				          {row.map(function(cell, cellIndex) {
				            return <td id={index.toString() + cellIndex.toString()} key={"row_" + index +"_column_" + cellIndex} onClick={this.handleClick}>{cell}</td>;
				          }.bind(this))}
				        </tr>);
				    }.bind(this))}
		  		</tbody>
	  		</table>
  		</div>
		);
	}

});

module.exports = Board;
