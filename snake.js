var Snakes = function (){
		function Snake(){
		this.dy = 0;
		this.dx = - 1;
		this.body = [[25,25],[26,25],[27,25]]
	}

	Snake.prototype.turn = function(direction) {
		var that = this;

		switch (direction) {
		case 38:
			that.dy = 0;
			that.dx = -1;
			break;
		case 39:
			that.dy = 1;
			that.dx = 0;
			break;
		case 40:
			that.dy = 0;
			that.dx = 1;
			break;
		case 37:
			that.dy = -1;
			that.dx = 0;
			break;
		};
	};

	function Game(snake){
		this.snake = snake,
		this.apple = [8,8],
		this.points = 0,
		this.xDim = 50,
		this.yDim = 50
	}

	Game.prototype.turn = function(direction) {
		var that = this;

		that.snake.turn(direction);
	};

	Game.prototype.randomApple = function() {
		var that = this;

		that.points += 10;
		that.apple = [Math.floor(Math.random() * 50), 
									Math.floor(Math.random() * 50)]
	}

	Game.prototype.snakeOffBoard = function() {
		var that = this;

		var xLoc = that.snake.body[0][0];
		var yLoc = that.snake.body[0][1];

		return (xLoc < 0 || yLoc < 0 || xLoc > that.xDim || yLoc > that.yDim);
	};

	Game.prototype.updateSnakePos = function() {
		var that = this;
		var head;

		head = that.snake.body[0].slice(0);

		_.each(that.snake.body.slice(1), function(part){
			if ((head[0] === part[0]) && (head[1] === part[1])){
				that.snake.body = [];
				alert("you dead")
			}
		})

		if ((head[0] === that.apple[0]) && (head[1] === that.apple[1])) {
			that.randomApple();
		} else {
			that.snake.body.pop();
		};
		
		head = [head[0] + that.snake.dx, head[1] + that.snake.dy ]
		that.snake.body.unshift(head);
	};

	Game.prototype.step = function() {
		var that = this;

		if (that.snakeOffBoard()) {
			that.snake.body = [];
			alert("you dead");
		};

		that.updateSnakePos();
	};

	function Interface(game) {
		this.game = game;
	}

	Interface.prototype.firstDraw = function() {
		$('body').empty;

		$('body').append($("<div class='outer'></div>"));
		
		_.times(50, function(y) {

			_.times(50, function(x) {
				colDiv = $("<div class ='inner' id='" + y + "_" + x + "'></div>");
				$('.outer').append(colDiv);
			});
		});
	}

	Interface.prototype.draw = function() {
		var that = this;
		var rowDiv, colDiv, snakeSpot, appleSpot, apple;
		
		$('.inner').empty().removeClass('snake').removeClass('apple');
		$('#0_0').empty();
		$('#0_0').append(that.game.points);

		_.each(that.game.snake.body, function(piece) {
			snakeSpot = $("#"+ piece[0] + "_" + piece[1]);
			snakeSpot.addClass('snake');
		});

		apple = that.game.apple;
		console.log(that.game.apple);
		appleSpot = $("#"+ apple[0] + "_" + apple[1]);
		appleSpot.addClass('apple');

	};

	Interface.prototype.play = function() {
		var that = this;

		$(document).keydown( function(event){
			console.log(event.keycode);
			that.game.turn(event.keyCode);
		});

		window.setInterval( function(){
			that.draw();
			that.game.step();
		}, 250)
	};

	return {
		Game: Game,
		Snake: Snake,
		Interface: Interface
	};
} ();

var snake = new Snakes.Snake();
var game = new Snakes.Game(snake);
var inter = new Snakes.Interface(game);

$( function(){
	inter.firstDraw();
	inter.play()});
