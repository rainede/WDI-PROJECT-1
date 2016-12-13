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
Game.gridBase       = 2;
Game.sequenceLength = 2;
Game.pause          = 1000;
Game.width          = 400;
Game.activeClass    = 'mole mole.up';
Game.levels   = 1;
Game.plays =0;
Game.lastHole;
Game.timeUp = false;
Game.scoreCat = 0;
Game.scoreMouse = 0;


Game.setupGame = function() {
  var gameView= document.getElementsByTagName('main')[0];
  var turn = document.createElement('h2');

  Game.inProgress =true;
  // Clear body
  gameView.innerHTML = '';


  // turn.innerHTML ='Whack the' + (Game.plays%2 === 0) ? 'Whack the Cat' : 'Whack the Mouse';

  // gameView.appendChild(turn);

  //   //Create the player scores
  // const player1 = document.createElement('h1');
  //  player1.innerHTML = 'Player 1 score:';
  //   body.appendChild( player1);
  //   const player2 = document.createElement('h1');
  //   player2.innerHTML = 'Player 2 score:';
  //    body.appendChild( player2);
  // // Create the grid
  var grid = document.createElement('ul');
  gameView.appendChild(grid);
  for (var i = 0; i < this.gridBase*this.gridBase; i++) {
    var square = document.createElement('li');
    square.style.top =randomNumber(this.top, this.top+ this.height);
      square.style.left =randomNumber(this.left, this.left+ this.width);
    square.style.width  = this.width / this.gridBase + 'px';
    square.style.height = this.width / this.gridBase + 'px';
    grid.appendChild(square);
  }

  // Create the start button
//  var start = document.createElement('button');
//  start.innerHTML = 'Play';
  //body.appendChild(start);
  var start =document.getElementById('play');
  start.addEventListener('click', Game.chooseSequence);

};


Game.chooseSequence = function() {
  //random sequence
  for (var i = 0; i < Game.sequenceLength; i++) {
    Game.sequence.push(Game.randomSequenceNumber());
  }
  console.log(Game.sequence);
  Game.runSequence();
};

Game.randomSequenceNumber = function() {
//  return randomNumber(0, (Game.gridBase * Game.gridBase) -1)
return Math.round(Math.random() * ((Game.gridBase * Game.gridBase) -1));
};

function randomNumber(min, max){
  return Math.round(Math.random() * (max - min) + min);
}


Game.runSequence = function() {
  var squares = document.getElementsByTagName('li');
  var square
  for (var i = 0; i < Game.sequence.length; i++) {
    // Must pass in the value of i
    setTimeout(function(i){
      square = squares[Game.sequence[i]];
      console.log(i, square);
      Game.turnOnSquare(square);
    }, (i)*Game.pause, i);
  }
  Game.prepareForGuess();
};

// function peep() {
//   const time = randomNumber(200, 1000);
//   const hole = randomHole(holes);
//   hole.classList.add('up');
//   setTimeout(() => {
//     hole.classList.remove('up');
//     if (!timeUp) peep();
//   }, time);
// }
//
// function molePopUp() {
//   var time = randomNumber(200, 1000);
//   const hole = randomHole(holes);
//   hole.classList.add('up');
//   setTimeout(() => {
//     hole.classList.remove('up');
//     if (!timeUp) peep();
//   }, time);
// }
Game.turnOnSquare = function(square){
  $(square).addClass(Game.activeClass)
  // square.classList.add(Game.activeClass);
  setTimeout(function(){
      // square.classList.remove(Game.activeClass);
        $(square).removeClass(Game.activeClass)
  }, (Game.pause/2));
};


Game.prepareForGuess = function(){
  var squares = document.getElementsByTagName('li');
  squares = [].slice.call(squares);
  for (var i = 0; i < (Game.gridBase * Game.gridBase); i++) {
    squares[i].addEventListener('click', function(e){
      Game.guess.push(squares.indexOf(e.target));
    //  console.log(Game.guess);
            console.table(Game);
      if (Game.guess.length === Game.sequenceLength) {
        Game.checkForWin();
      }
    });
  }
};


Game.checkForWin = function(){
  var result = Game.guess.sort().toString() === Game.sequence.sort().toString();
  Game.inProgress =false;
  Game.plays++
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
