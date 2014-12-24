var Game = function() {
	this.canvas = {
		board: [[null, null, null],[null, null, null],[null, null, null]],
			
		column: function(columNumber){
			var col = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				col.push(board[i][columNumber]);
			}
			return col;
		},

		row: function(rowNumber){
			return this.board[rowNumber];
		},
		
		diagnolDown: function(){
			var diagD = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diagD.push(board[i][i]);
			}
			return diagD;
		},

		diagnolUp: function(){
			var diagU = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diagU.push(board[i][l-i-1]);
			}
			return diagU;
		}
	}
	
	this.winner = "No One";

	this.printBoard = function(){
		var i = 0, board = this.canvas.board;
		for ( i ; i < board.length; i++){
			console.log(board[i]);
		}
	}

	this.checkBoardForWinner = function(string, i){
		if (this.canvas.diagnolUp().toString() == string ||
				this.canvas.diagnolDown().toString() == string ||
				this.canvas.row(i).toString() == string || 
				this.canvas.column(i).toString() == string){
			this.winner = string[0];
			return true;
		}
	}
	this.gameOver = function(){
		var i = 0, board = this.canvas.board, l = board.length, stringX = "X,X,X", stringO = "O,O,O";
		for ( i ; i < l ; i++){
			if (this.checkBoardForWinner(stringX, i) || this.checkBoardForWinner(stringO, i)){
				return true;
			}
		}
		
		if (this.emptyCells.length == 0){
			return true
		}
		return false;
	}
	
	this.restart = function(){
		this.canvas.board = [[null, null, null],[null, null, null],[null, null, null]];
		this.winner = "No One";
		this.emptyCells = [];
	}
	
	this.emptyCells = [];

	this.startGame = function(){
		this.findEmptyCells();
	}

	this.findEmptyCells = function(){
		var r = 0, board = this.canvas.board, l = board.length;

		for(r; r<l; r++){
			var rl = board[r].length;
			for(var c = 0; c<rl; c++){
				if(board[r][c] == null){
					this.emptyCells.push(r.toString() + c.toString());
				}
			}
		}
	}

  this.markBoard = function(id, mark){
  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}, emptyCells = this.emptyCells, index = emptyCells.indexOf(id), validMark = id;

  	if(this.canvas.board[cell.row][cell.column] == null){
  		this.canvas.board[cell.row][cell.column]= mark;
			this.emptyCells.splice(index, 1);
		} else{
			var validMark = false;
		}
		
  	return {pcId: this.computerMarkBoard(), playerId: validMark};
  }

  this.computerMarkBoard = function(){
  	var emptyCells = this.emptyCells
  	var id = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  	console.log(id);
  	if(id == undefined){
  		return false
  	} 
  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}
  	var index = emptyCells.indexOf(id);

  	this.canvas.board[cell.row][cell.column] = "O";
  	this.emptyCells.splice(index, 1);
  	return id
  }
}

game = new Game

module.exports = game