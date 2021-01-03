'use strict';

// ----- VARIABLES -----

const winningValue = 100;
const playerScores = [0, 0];
let turnScore = 0;
let playerOneTurn = true;
let gameLive = true;

// ----- HTML ELEMENTS -----

const userOneDisplayScore = document.getElementById('score--0');
const userTwoDisplayScore = document.getElementById('score--1');
const currentTurnOne = document.getElementById('current--0');
const currentTurnTwo = document.getElementById('current--1');
const playerOneSide = document.querySelector('.player--0');
const playerTwoSide = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const startNewGame = function () {
  userOneDisplayScore.textContent = 0;
  userTwoDisplayScore.textContent = 0;
  dice.classList.add('hidden');
};

startNewGame();

// Helper Functions

const updateTurnScore = function (score) {
  if (playerOneTurn) {
    currentTurnOne.textContent = score;
  } else {
    currentTurnTwo.textContent = score;
  }
};

const updateOverallScore = function () {
  playerOneTurn
    ? (userOneDisplayScore.textContent = playerScores[0])
    : (userTwoDisplayScore.textContent = playerScores[1]);
};

const checkWin = function () {
  if (playerScores[0] >= 100) {
    gameLive = false;
    playerOneSide.classList.add('player--winner');
  } else if (playerScores[1] >= 100) {
    gameLive = false;
    playerTwoSide.classList.add('player--winner');
  }
};

const toggleActivePlayer = function () {
  turnScore = 0;
  playerOneTurn = !playerOneTurn;
  playerOneSide.classList.toggle('player--active');
  playerTwoSide.classList.toggle('player--active');
};

// Rolling dice funcitonality

btnRoll.addEventListener('click', () => {
  if (!gameLive) {
    return;
  }
  const roll = Math.ceil(Math.random() * 6);
  console.log(roll);
  dice.src = `dice-${roll}.png`;
  dice.classList.remove('hidden');

  if (roll !== 1) {
    turnScore += roll;
    updateTurnScore(turnScore);
  } else {
    updateTurnScore(0);
    toggleActivePlayer();
  }
});

// Hold button functionality

btnHold.addEventListener('click', () => {
  if (!gameLive) {
    return;
  }
  playerOneTurn
    ? (playerScores[0] += turnScore)
    : (playerScores[1] += turnScore);
  updateOverallScore();
  updateTurnScore(0);
  checkWin();
  toggleActivePlayer();
});

// Reset Game

btnNew.addEventListener('click', () => {
  playerScores[0] = 0;
  playerScores[1] = 0;
  startNewGame();
  currentTurnOne.textContent = 0;
  currentTurnTwo.textContent = 0;
  playerOneTurn = true;
  gameLive = true;
  playerOneSide.classList.add('player--active');
  playerTwoSide.classList.remove('player--active');
  playerOneSide.classList.remove('player--winner');
  playerTwoSide.classList.remove('plater--winner');
});
