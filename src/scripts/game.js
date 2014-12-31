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

		row: function(rowNumber){
			return this.board[rowNumber];
		},

		diagnol1: function(){
			var diagD = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diagD.push(board[i][i]);
			}
			return diagD;
		},

		diagnol2: function(){
			var diagU = [], i = 0, board = this.board, l = board.length;
			for ( i ; i < l; i++){
				diagU.push(board[i][l-i-1]);
			}
			return diagU;
		},

		columns: function(){
			var i = 0, board = this.board, l = board.length, columns = [];
			for (var i = 0; i < l; i++) {
				columns.push(this.column(i));
			};
			return columns;
		},

		rows: function(){
			return this.board;
		},

		diagnols: function(){
			return [this.diagnol1(), this.diagnol2()];
		},

		all: function(){
			var all = [], rows = this.rows(), columns = this.columns(), diagnols = this.diagnols();

			rows.forEach(function(row){
				all.push(row);
			});

			columns.forEach(function(column){
				all.push(column);
			});

			diagnols.forEach(function(diagnol){
				all.push(diagnol);
			});

			return all;
		}
	}
	
	this.winner = "No One";
	
	this.emptyCells = [];

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
		if (this.canvas.diagnol2().toString() == string ||
				this.canvas.diagnol1().toString() == string ||
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
	
  this.markBoard = function(id, mark){
  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}, emptyCells = this.emptyCells, index = emptyCells.indexOf(id), validMark = id;

  	if(this.canvas.board[cell.row][cell.column] == null){
  		this.canvas.board[cell.row][cell.column]= mark;
			this.emptyCells.splice(index, 1);
		} else{
			var validMark = false;
		}
		
  	return {pcId: this.pcMarkBoard(), playerId: validMark};
  }

  this.pcMarkBoard = function(){
  	var emptyCells = this.emptyCells, id = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  	var bestChoices = this.pcIdsToPick();
  	console.log("bestChoices")
  	console.log(bestChoices)

  	if (bestChoices.length > 0){
  		id = bestChoices[Math.floor(Math.random() * bestChoices.length)]
  	}
  	console.log("id")
  	console.log(id)
  	if(id == undefined){
  		return false;
  	} 
  	var cell = {row: parseInt(id[0]), column: parseInt(id[1])}
  	var index = emptyCells.indexOf(id);

  	this.canvas.board[cell.row][cell.column] = "O";
  	this.emptyCells.splice(index, 1);
  	return id;
  }

  this.pcIdsToPick = function(){
		var board = this.board, emptyCells = this.emptyCells;

		return emptyCells.filter(function(id){

			var rowInfo = this.pathInfo(this.canvas.row(id[0]));
			var colInfo = this.pathInfo(this.canvas.column(id[1]));

			if ((rowInfo.x.count == 2 && rowInfo.n.indices.length == 1) || 
					(colInfo.x.count == 2 && colInfo.n.indices.length == 1) ||
					this.checkDiagnols(id)){
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
  
  this.checkDiagnols = function(id){
  	if (id == "00" || id == "22"){
  		var diagnol1Info = this.pathInfo(this.canvas.diagnol1());
  		return (diagnol1Info.x.count == 2 && diagnol1Info.n.indices.length == 1);
  	} else if(id == "02" || id == "20"){
  		var diagnol2Info = this.pathInfo(this.canvas.diagnol2());
  		return (diagnol2Info.x.count == 2 && diagnol2Info.n.indices.length == 1);
  	} else if(id == "11"){
  		var diagnol1Info = this.pathInfo(this.canvas.diagnol1());
			var diagnol2Info = this.pathInfo(this.canvas.diagnol2());
			return (diagnol1Info.x.count == 2 && diagnol1Info.n.indices.length == 1) || 
						 (diagnol2Info.x.count == 2 && diagnol2Info.n.indices.length == 1);
  	}
  }


  // this.pathsWorthBlocking = function(){
  // 	return this.canvas.all().filter(function(path){
  // 		var pathInfo = this.pathInfo(path)
  // 		if (pathInfo.x.count == 2 && pathInfo.n.indices.length == 1){
  // 			return path	
  // 		}
  // 	}.bind(this));
  // }
	this.printBoard = function(){
		var i = 0, board = this.canvas.board;
		for ( i ; i < board.length; i++){
			console.log(board[i]);
		}
	}
}

game = new Game;

module.exports = game