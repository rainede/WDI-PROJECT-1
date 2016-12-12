/*

  STILL INCOMPLETE... but it's a start.

  - Make a grid
  - Make a sequence of a certain length
  - Light up the squares
  - Record user input
  - Check sequence against user input
  - Display result
  - Start again with a harder sequence

*/

var Game = Game || {};

Game.sequence       = [];
Game.guess          = [];
Game.gridBase       = 4;
Game.sequenceLength = 4;
Game.pause          = 1000;
Game.width          = 400;
Game.activeClass    = 'mole';

Game.setupGame = function() {
  var body = document.getElementsByTagName('main')[0];
  // Clear body
  body.innerHTML = '';

  // Create the grid
  var grid = document.createElement('ul');
  body.appendChild(grid);
  for (var i = 0; i < this.gridBase*this.gridBase; i++) {
    var square = document.createElement('li');
    square.style.width  = this.width / this.gridBase + 'px';
    square.style.height = this.width / this.gridBase + 'px';
    grid.appendChild(square);
  }

  // Create the start button
  var start = document.createElement('button');
  start.innerHTML = 'Play';
  body.appendChild(start);
  start.addEventListener('click', Game.chooseSequence);
};

Game.chooseSequence = function() {
  for (var i = 0; i < Game.sequenceLength; i++) {
    Game.sequence.push(Game.randomSequenceNumber());
  }
  console.log(Game.sequence);
  Game.runSequence();
};

Game.randomSequenceNumber = function() {
  return Math.round(Math.random() * ((Game.gridBase * Game.gridBase) -1));
};

Game.runSequence = function() {
  var squares = document.getElementsByTagName('li');
  for (var i = 0; i < Game.sequence.length; i++) {
    // Must pass in the value of i
    setTimeout(function(i){
      var square = squares[Game.sequence[i]];
      console.log(i, square);
      Game.turnOnSquare(square);
    }, (i)*Game.pause, i);
  }
  Game.prepareForGuess();
};

Game.turnOnSquare = function(square){
  square.classList.add(Game.activeClass);
  setTimeout(function(){
    Game.turnOffSquare(square);
  }, (Game.pause/2));
};

Game.turnOffSquare = function(square) {
  square.classList.remove(Game.activeClass);
};

Game.prepareForGuess = function(){
  var squares = document.getElementsByTagName('li');
  squares = [].slice.call(squares);
  for (var i = 0; i < (Game.gridBase * Game.gridBase); i++) {
    squares[i].addEventListener('click', function(e){
      Game.guess.push(squares.indexOf(e.target));
      console.log(Game.guess);
      if (Game.guess.length === Game.sequenceLength) {
        Game.checkForWin();
      }
    });
  }
};

Game.checkForWin = function(){
  var result = Game.guess.sort().toString() === Game.sequence.sort().toString();
  if (result) {
    alert('Win');
  } else {
    alert('Lose');
  }
};

Game.start = function() {
  this.setupGame();
};

document.addEventListener('DOMContentLoaded', Game.start.bind(Game));
