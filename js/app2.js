window.onload = init;

var squares,
    squaresArray,
    buttons,
    message,
    xMoves,
    oMoves,
    turns,
    finished,
    solutions = [
                  [0,1,2],[3,4,5],[6,7,8], // Horizontal
                  [0,3,6],[1,4,7],[2,5,8], // Vertical
                  [0,4,8],[2,4,6]          // Diagonal
                ];

function init(){
  squares      = document.getElementsByTagName("li");
  buttons      = document.getElementsByTagName("button");
  message      = document.getElementById("message");
  squaresArray = [].slice.call(squares);
  reset();
  bindEvents(squares, playSquare);
  bindEvents(buttons, reset);
}

function bindEvents(array, callback){
  for (var i = 0; i < array.length; i++) {
    array[i].addEventListener("click", callback);
  }
}

function reset(){
  clearBoard();
  xMoves            = [];
  oMoves            = [];
  turns             = 0;
  finished          = false;
  message.innerHTML = "Let's play!";
}

function clearBoard(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = "";
    squares[i].className = "";
  }
}

function playSquare(){
  if (this.innerHTML !== "" || finished) return;
  var player = (turns % 2 === 0) ? "t" : "h";
  updateSquare(this, player);
  var moves  = (player === "t") ? xMoves : oMoves;
  storeMove(moves, this);
  turns++;
  checkResult(moves, player);
}

function storeMove(moves, square){
  moves.push(squaresArray.indexOf(square));
}

function updateSquare(square, player){
  square.innerHTML  = player;
  square.classList += player;
}

function checkResult(moves, player){
  checkForWin(moves, player);
  checkForDraw();
}

function checkForDraw(){
  if (!finished && turns === 9) {
    finished = true;
    message.innerHTML = "It's a draw...";
  }
}

function checkForWin(moves, player){
  for (var i = 0; i < solutions.length; i++) {
    var counter = 0;
    for (var j = 0; j < solutions[i].length; j++) {
      if (moves.indexOf(solutions[i][j]) !== -1) counter++;
      if (counter === 3) {
        finished = true;
        message.innerHTML = player + " has won!";
      }
    }
  }
}
