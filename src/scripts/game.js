var Game = function() {
	this.canvas = {
		board: [[null, null, null],
						[null, null, null],
						[null, null, null]],
			
		column: function(columNumber){
			var col = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				col.push(board[i][columNumber]);
			}
			return col;
		},
		
		columns: function(){
			var i = 0, board = this.board, l = board.length, columns = [];
			for (var i = 0; i < l; i++) {
				columns.push(this.column(i));
			};
			return columns;
		},

		row: function(rowNumber){
			return this.board[rowNumber];
		},

		rows: function(){
			return this.board;
		},

		diaganol1: function(){
			var diaganol = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diaganol.push(board[i][i]);
			}
			return diaganol;
		},

		diaganol2: function(){
			var diaganol = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diaganol.push(board[i][l-i-1]);
			}
			return diaganol;
		}
	}
	
	this.winner = "No One";
	this.emptyCells = [];

	this.pcStartId = function() {
		var emptyCells = this.emptyCells, id = emptyCells[Math.floor(Math.random() * emptyCells.length)], index = emptyCells.indexOf(id);
		this.emptyCells.splice(index, 1);
		return id
	}

	this.startGame = function(){
		this.getIdsOfEmptyCells();
	}


	this.getIdsOfEmptyCells = function(){
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

	this.gameOver = function(){
		var i = 0, board = this.canvas.board, l = board.length, stringX = "X,X,X", stringO = "O,O,O";
		for ( i ; i < l ; i++){
			if (this.checkBoardForWinner(stringX, i) || this.checkBoardForWinner(stringO, i)){
				return true;
			}
		}
		
		if (this.emptyCells.length == 0){
			return true;
		}
		return false;
	}
	
	this.checkBoardForWinner = function(string, i){
		if (this.canvas.diaganol2().toString() == string ||
				this.canvas.diaganol1().toString() == string ||
				this.canvas.row(i).toString() == string || 
				this.canvas.column(i).toString() == string){
			this.winner = string[0];
			return true;
		}
	}
	
	this.restart = function(){
		this.canvas.board = [[null, null, null],[null, null, null],[null, null, null]];
		this.winner = "No One";
		this.emptyCells = [];
	}
	
  this.markBoard = function(id){
		playerId = this.playerMarkBoard(id);

		if(playerId){
	  	return {pcId: this.pcMarkBoard(), playerId: playerId};
		}
		
  }
  this.playerMarkBoard = function(id){
  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}
  	
  	if(!this.gameOver() && this.canvas.board[cell.row][cell.column] == null){
	  	var index = this.emptyCells.indexOf(id);
  		this.canvas.board[cell.row][cell.column]= "X";
			this.emptyCells.splice(index, 1);
			return id;
		} else {
			return false;
		}
  }

  this.pcMarkBoard = function(){
  	if(!this.gameOver()){
	  	var emptyCells = this.emptyCells, id = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	  	var bestChoices = this.pcIdsToPick();

	  	if (bestChoices.length > 0){
	  		id = bestChoices[Math.floor(Math.random() * bestChoices.length)]
	  	}
	  	if(id == undefined){
	  		return false;
	  	} 
	  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}
	  	var index = emptyCells.indexOf(id);

	  	this.canvas.board[cell.row][cell.column] = "O";
	  	this.emptyCells.splice(index, 1);
	  	return id;
	  } else {
	  	return false;
	  }
  }

  this.pcIdsToPick = function(){
		var board = this.board, emptyCells = this.emptyCells;

		return emptyCells.filter(function(id){

			var rowInfo = this.pathInfo(this.canvas.row(id[0]));
			var colInfo = this.pathInfo(this.canvas.column(id[1]));

			if ((rowInfo.x.count == 2 && rowInfo.n.indices.length == 1) || 
					(colInfo.x.count == 2 && colInfo.n.indices.length == 1) ||
					this.checkDiaganols(id)){
  			return id;
  		}

		}.bind(this));
  }

  this.pathInfo = function(path){
  	var i=0, l = path.length, info = {x: {count: 0, indices:[]}, o: {count: 0, indices:[]}, n: {count: 0, indices:[]}};
  	for (var i = 0; i < l; i++) {
  		if(path[i] == "X"){
  			info.x.indices.push(i);
  			info.x.count++;
  		} else if(path[i] == "O"){
  			info.o.indices.push(i);
  			info.o.count++;
  		} else {
  			info.n.indices.push(i);
  			info.n.count++;
  		}
  	}
  	return info;
  }
  
  this.checkDiaganols = function(id){
  	if (id == "00" || id == "22"){
  		var diaganol1Info = this.pathInfo(this.canvas.diaganol1());
  		return (diaganol1Info.x.count == 2 && diaganol1Info.n.indices.length == 1);
  	} else if(id == "02" || id == "20"){
  		var diaganol2Info = this.pathInfo(this.canvas.diaganol2());
  		return (diaganol2Info.x.count == 2 && diaganol2Info.n.indices.length == 1);
  	} else if(id == "11"){
  		var diaganol1Info = this.pathInfo(this.canvas.diaganol1());
			var diaganol2Info = this.pathInfo(this.canvas.diaganol2());
			return (diaganol1Info.x.count == 2 && diaganol1Info.n.indices.length == 1) || 
						 (diaganol2Info.x.count == 2 && diaganol2Info.n.indices.length == 1);
  	}
  }

	this.printBoard = function(){
		var i = 0, board = this.canvas.board;
		for ( i ; i < board.length; i++){
			console.log(board[i]);
		}
	}
}

game = new Game;

module.exports = game