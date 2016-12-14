var Game = Game || {};

Game.setupGame = function() {
  this.width          = 400;
  this.gridBase       = 4;
  this.pause          = 500;
  this.turnCount      = 0;
  this.level          = 2;
  this.timeUp         = false;
  this.lastSquare     = 0;
  this.beenSeen  = [];

  this.score          = document.getElementsByClassName('score')[0];
  this.showLevel      = document.getElementsByClassName('level')[0];
  this.lives          = document.getElementsByClassName('lives')[0];
  this.header         = document.getElementsByTagName('header')[0];
  this.main           = document.getElementsByTagName('main')[0];
  this.timer          = document.getElementsByClassName('timer');

  this.message           = document.createElement('h2');
  this.message.innerHTML = 'Get ready to play!';

  this.header.appendChild(this.message);
  this.createGrid();
  this.startButton = document.getElementById('play');
  this.startButton.addEventListener('click', this.play.bind(this));
};

Game.createGrid = function createGrid() {
  var square;
  var width;
  var i;
  var units='px';
  this.main.innerHTML = '';
  // this.gameOver       = document.createElement('div');
  // this.gameOver.setAttribute('class', 'gameover');
  this.grid           = document.createElement('ul');
  this.grid.setAttribute('class', 'board');

  // this.main.appendChild(this.gameOver);
  this.main.appendChild(this.grid);
  for (i = 0; i < this.gridBase*this.gridBase; i++) {
    square              = document.createElement('li');
    width               = this.width / this.gridBase;
    square.style.width      = width + units;
    square.style.height     = width + units;
    square.style.lineHeight = width + units;
    square.style.fontSize   = (width/100)*60 + units;
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
  this.message.innerHTML = parseInt(this.level-1)+'. ' +'Choose all of the numbers divisible by ' + this.level + '.'+ '\n\n' +'Get 10 right to move up to the next level!';
  this.showLevel.innerHTML = this.level-1;
  // this.message.innerHTML += 'Level' + parseInt(this.level-1) +'Choose all of the numbers divisible by ' + this.level +'\n';
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
  var newValue      = this.randomNumber();
  var bContinue      = false;

  switch (true) {
    case sequenceNumber === this.lastSquare:
    //don't want to see something popping up in immediately in the same spot
      break;
    case square.innerHTML !== '':
      break;
    default:
      if(this.beenSeen.indexOf(newValue)=== -1){
        // not already seen
        this.beenSeen.push(newValue);
        bContinue =true;
      }
  }
  if (!bContinue) return this.runSequence;
  setTimeout(function(){
    Game.showSquare(square,newValue);
  }, this.pause * this.getRandomInt(1, 5));
};


Game.showSquare = function showSquare(square, squareValue){
  square.style.color = 'white';
  square.innerHTML = squareValue;
  setTimeout(function(){
    square.innerHTML = '';
  }, this.pause * this.getRandomInt(1, 5));
};

Game.selectSquare = function selectSquare() {
  if (this.innerHTML % Game.level === 0) {
    this.style.color = 'green';
    Game.score.innerHTML = parseInt(Game.score.innerHTML) + 1;
  } else {
    this.style.color = 'red';
    console.log(Game.lives.innerHTML);
    Game.lives.innerHTML = parseInt(Game.lives.innerHTML) - 1;
  }

  if (parseInt(Game.lives.innerHTML) === 0) {
    Game.message.innerHTML = 'GAME OVER';
    Game.clearSquares();
  }

  if (parseInt(Game.score.innerHTML) % 10 === 0) {
    Game.level++;
    //reset the array
    Game.beenSeen.splice(0,  Game.beenSeen .length);
    Game.displayInstructions();
  }
};

Game.clearSquares = function clearSquare() {
  this.timeSpent = parseInt(this.timeSpent)+this.interval;
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
