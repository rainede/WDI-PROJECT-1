var Game = Game || {};

Game.setupGame = function() {
  this.width          = 400;
  this.gridBase       = 4;
  this.pause          = 500;
  this.turnCount      = 0;
  this.level          = 2;

  this.score          = document.getElementsByClassName('score')[0];
  this.lives          = document.getElementsByClassName('lives')[0];
  this.header         = document.getElementsByTagName('header')[0];
  this.main           = document.getElementsByTagName('main')[0];

  this.message           = document.createElement('h2');
  this.message.innerHTML = 'Get ready to play!';

  this.header.appendChild(this.message);
  this.createGrid();
  this.startButton = document.getElementById('play');
  this.startButton.addEventListener('click', this.play.bind(this));
};

Game.createGrid = function createGrid() {
  this.main.innerHTML = '';
  this.grid           = document.createElement('ul');
  this.grid.setAttribute('class', 'board');
  this.main.appendChild(this.grid);
  for (var i = 0; i < this.gridBase*this.gridBase; i++) {
    var square              = document.createElement('li');
    var width               = this.width / this.gridBase;
    square.style.width      = width + 'px';
    square.style.height     = width + 'px';
    square.style.lineHeight = width + 'px';
    square.style.fontSize   = (width/100)*60 + 'px';
    square.setAttribute('class', 'square');
    square.addEventListener('click', this.selectSquare);
    this.grid.appendChild(square);
  }
  this.squares = document.getElementsByClassName('square');
};

Game.play = function play() {
  this.displayInstructions();
  setInterval(this.runSequence.bind(this), 500);
};

Game.displayInstructions = function displayInstructions() {
  this.message.innerHTML = 'Choose all of the numbers divisible by ' + this.level;
};

Game.randomNumber = function randomNumber() {
  if (this.getRandomInt(0, 3) % 3 === 0) {
    return this.getRandomInt(1, 10) * this.level;
  } else {
    return this.getRandomInt(1, 10) * this.getRandomInt(1, 10);
  }
};

Game.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.runSequence = function() {
  var sequenceNumber = this.getRandomInt(0, (this.gridBase*this.gridBase-1));
  var square         = this.squares[sequenceNumber];

  if (square.innerHTML !== '') return this.runSequence();

  setTimeout(function(){
    Game.showSquare(square);
  }, this.pause * this.getRandomInt(1, 5));
};

Game.showSquare = function showSquare(square){
  square.innerHTML = this.randomNumber();
  setTimeout(function(){
    square.innerHTML = '';
  }, this.pause * this.getRandomInt(1, 5));
};

Game.selectSquare = function selectSquare() {
  if (this.innerHTML % Game.level === 0) {
    Game.score.innerHTML = parseInt(Game.score.innerHTML) + 1;
  } else {
    Game.lives.innerHTML = parseInt(Game.lives.innerHTML) - 1;
  }

  if (parseInt(Game.lives.innerHTML) === 0) {
    Game.message.innerHTML = 'GAME OVER';
    Game.clearSquares();
  }

  if (parseInt(Game.score.innerHTML) % 10 === 0) {
    Game.level++;
    Game.displayInstructions();
  }
};

Game.clearSquares = function clearSquare() {
  clearInterval(this.interval);

  var id = setTimeout(function() {}, 0);
  while (id--) {
    clearTimeout(id);
  }
  for (var i = 0; i < this.squares.length; i++) {
    this.squares[i].innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', Game.setupGame.bind(Game));
