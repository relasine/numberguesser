var maxNumber = 100;
var minNumber = 1;
var playerOneTotal = 0;
var playerTwoTotal = 0;
var activePlayer = "Player One";
var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
var userGuess = document.querySelector(".user-guess");
var guessButton = document.querySelector(".submit-button");
var responseText = document.querySelector(".high-low-text");
var lastGuess = document.querySelector(".last-guess-number");
var clearButton = document.querySelector(".clear-button");
var resetButton = document.querySelector(".reset-button"); 
var changeMinMaxButton = document.querySelector(".change-min-max-value");
var minValueEntry = document.querySelector(".min-value-entry");
var maxValueEntry = document.querySelector(".max-value-entry"); 
var playerOneTotalDisplay = document.querySelector(".player-one-guess-total");
var playerTwoTotalDisplay = document.querySelector(".player-two-guess-total");
var lastGuessText = document.querySelector(".last-guess-text");

guessButton.addEventListener('click', function(event) {
  event.preventDefault();
  minValueEntry.value = minNumber;
  maxValueEntry.value = maxNumber;
  minValueEntry.disabled = true;
  maxValueEntry.disabled = true;
  var parsedNum = parseInt(userGuess.value);
  lastGuess.innerText = parsedNum;
  userGuess.value = "";
  guessButton.disabled = true;
  clearButton.disabled = true;
    if (parsedNum === randomNumber && activePlayer == "Player One") {
      correctAnswerP1();
    } else if (parsedNum === randomNumber && activePlayer == "Player Two") {
      correctAnswerP2();
    } else if (parsedNum > maxNumber) { 
      invalidAnswer(); 
    } else if (parsedNum < minNumber) {
      invalidAnswer();
    } else if (parsedNum > randomNumber && activePlayer == "Player One") {
      tooHighP1();
    } else if (parsedNum > randomNumber && activePlayer == "Player Two") {
      tooHighP2();
    } else if (parsedNum < randomNumber && activePlayer == "Player One") {
      tooLowP1();
    } else if (parsedNum < randomNumber && activePlayer == "Player Two") {
      tooLowP2();
    } else
      invalidAnswer();
})

clearButton.addEventListener('click', function(event) {
  event.preventDefault();
  userGuess.value = "";
  disabledButton();
})

resetButton.addEventListener('click', function(event) {
  event.preventDefault();
  minValueEntry.disabled = false;
  maxValueEntry.disabled = false;
  minNumber = 1;
  maxNumber = 100;
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  userGuess.value = "";
  lastGuess.innerText = "-";
  responseText.innerText = "That is too ...";
  guessButton.disabled = true;
  clearButton.disabled = true;
  resetButton.disabled = true;
  minValueEntry.value = "";
  maxValueEntry.value = "";
  activePlayer = "Player One";
  playerOneTotal = 0;
  playerTwoTotal = 0;
  playerOneTotalDisplay.innerText = "Player One: " + playerOneTotal;
  playerTwoTotalDisplay.innerText = "Player Two: " + playerTwoTotal;
})

userGuess.addEventListener('keyup', disabledButton);

minValueEntry.addEventListener('keyup', disabledChangeButton);
maxValueEntry.addEventListener('keyup', disabledChangeButton);

changeMinMaxButton.addEventListener('click', changeMinMax);

function correctAnswerP1() {
  playerOneTotal ++;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  playerOneTotalDisplay.innerText = "Player One: " + playerOneTotal;
  activePlayer = "Player Two";
  if (playerOneTotal == 1) {
    responseText.innerText = "Correct in " + playerOneTotal + " guess! Player Two's turn.";
  } else {
    responseText.innerText = "Correct in " + playerOneTotal + " guesses! Player Two's turn.";
  }
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  minValueEntry.value = minNumber;
  maxValueEntry.value = maxNumber;
}

function correctAnswerP2() {
  playerTwoTotal ++;
  playerTwoTotalDisplay.innerText = "Player Two: " + playerTwoTotal;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  if (playerOneTotal < playerTwoTotal) {
    var winningPlayer = "Player One wins! Next level ready.";
  } else if (playerOneTotal > playerTwoTotal) {
    var winningPlayer = "Player Two wins! Next level ready.";
  } else if (playerOneTotal == playerTwoTotal) {
    var winningPlayer = "It's a tie! Next level ready.";
  }
  activePlayer = "Player One";
   if (playerTwoTotal == 1) {
    responseText.innerText = "Correct in " + playerTwoTotal + " guess! " + winningPlayer;
  } else {
    responseText.innerText = "Correct in " + playerTwoTotal + " guesses! " + winningPlayer;
  }
  minNumber = minNumber - 10;
  maxNumber = maxNumber + 10;
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  minValueEntry.value = minNumber;
  maxValueEntry.value = maxNumber;
  playerOneTotal = 0;
  playerTwoTotal = 0;
  playerOneTotalDisplay.innerText = "Player One: " + playerOneTotal;
  playerTwoTotalDisplay.innerText = "Player Two: " + playerTwoTotal;
}

function tooHighP1() {
  playerOneTotal ++;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  playerOneTotalDisplay.innerText = "Player One: " + playerOneTotal;
  responseText.innerText = "That is too high";
  resetButton.disabled = false;
}

function tooHighP2() {
  playerTwoTotal ++;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  playerTwoTotalDisplay.innerText = "Player Two: " + playerTwoTotal;
  responseText.innerText = "That is too high";
  resetButton.disabled = false;
}

function tooLowP1() {
  playerOneTotal ++;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  playerOneTotalDisplay.innerText = "Player One: " + playerOneTotal;
  responseText.innerText = "That is too low";
  resetButton.disabled = false;
}

function tooLowP2() {
  playerTwoTotal ++;
  lastGuessText.innerText = activePlayer + ": your last guess was";
  playerTwoTotalDisplay.innerText = "Player Two: " + playerTwoTotal;
  responseText.innerText = "That is too low";
  resetButton.disabled = false;
}

function invalidAnswer() {
  alert("Please enter a number between " + minNumber + " and " + maxNumber); 
  lastGuess.innerText = "-";
  responseText.innerText = "That is too ...";
}

function changeMinMax() {
  lastGuess.innerText = "-";
  responseText.innerText = "That is too ...";
  var parsedMinChange = parseInt(minValueEntry.value);
  var parsedMaxChange = parseInt(maxValueEntry.value);
  minNumber = parsedMinChange;
  maxNumber= parsedMaxChange;
  changeMinMaxButton.disabled = true;
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function disabledButton() {
  var parsedGuess = parseInt(userGuess.value);
  if (parsedGuess > maxNumber) {
    guessButton.disabled = true;
    clearButton.disabled = true; 
  } else if (parsedGuess < minNumber) {
    guessButton.disabled = true;
    guessButton.disabled = true;
  } else if (Number.isInteger(parsedGuess)) {
    guessButton.disabled = false;
    clearButton.disabled = false;
  } else {
    guessButton.disabled = true;
    clearButton.disabled = true;
  }
}  

function disabledChangeButton() {
  var parsedMin = parseInt(minValueEntry.value);
  var parsedMax = parseInt(maxValueEntry.value);
  if (Number.isInteger(parsedMin) && Number.isInteger(parsedMax)) {
    changeMinMaxButton.disabled = false;
  } else {
    changeMinMaxButton.disabled = true;
  }
}