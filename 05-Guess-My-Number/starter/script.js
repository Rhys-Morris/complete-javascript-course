'use strict';

// ----- HTML ELEMENTS -----
const score = document.querySelector('.score');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const check = document.querySelector('.check');
const reset = document.querySelector('.again');

// ----- VARIABLES -----
let solution = Math.ceil(Math.random() * 20);
let userScore = 20;
let userHighscore = 0;

// ----- EVENT LISTENERS ------

// Check Number
check.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  const highscore = document.querySelector('.highscore');

  const updateHighScore = function () {
    if (userScore > userHighscore) {
      userHighscore = userScore;
      highscore.textContent = userScore;
    }
  };

  const handleIncorrectGuess = function (text) {
    message.textContent = text;
    userScore--;
    score.textContent = userScore;
  };

  if (!guess) {
    message.textContent = 'You must enter a value!';
    return;
  }

  number.textContent = guess;
  number.style.width = '30rem';

  // Run out of guesses
  if (userScore < 1) {
    message.textContent = 'You lost the game!';
    return;
  }

  // Guess incorrect
  if (guess !== solution) {
    guess > solution
      ? handleIncorrectGuess('Too high!')
      : handleIncorrectGuess('Too low!');
  }

  //Guess correct
  else {
    message.textContent = 'Correct!';
    updateHighScore();
    document.querySelector('body').style.backgroundColor = '#60b347';
  }
});

// Reset Game
reset.addEventListener('click', () => {
  solution = Math.ceil(Math.random() * 20);
  userScore = 20;
  message.textContent = 'Start guessing...';
  score.textContent = userScore;
  number.textContent = '?';
  number.style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});
