'use strict';

// game element selections
let bottunRollDice = document.querySelector('.btn--roll');
let bottunHold = document.querySelector('.btn--hold');
let buttonNewGame = document.querySelector('.btn--new');
let diceImage = document.querySelector('.dice');

let scoreElement = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
let currentElement = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
let playerSection = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

// game function definitions
const switchPlayer = function () {
  playerSection[currentPlayer].classList.remove('player--active');
  currentElement[currentPlayer].textContent = 0;

  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  playerSection[currentPlayer].classList.add('player--active');
  currentElement[currentPlayer].textContent = 0;

  currentScore = 0;
};

const declarePlayerWinner = function (player) {
  gameone = false;
  playerSection[player].classList.add('player--winner');
};

const rollDiceClicked = function () {
  if (gameone) {
    let dice_number = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${dice_number}.png`;
    diceImage.classList.remove('hidden');

    if (dice_number === 1) {
      switchPlayer();
    } else {
      currentScore += dice_number;
      currentElement[currentPlayer].textContent = String(currentScore);
    }
  }
};

const holdClicked = function () {
  if (gameone) {
    score[currentPlayer] = score[currentPlayer] + currentScore;
    scoreElement[currentPlayer].textContent = String(score[currentPlayer]);

    score[currentPlayer] >= GAME_LIMIT
      ? declarePlayerWinner(currentPlayer)
      : switchPlayer();
  }
};

const newGameClicked = function () {
  initializeGame();
};

const initializeGame = function () {
  score = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  gameone = true;
  diceImage.classList.add('hidden');

  for (let i = 0; i < 2; i++) {
    scoreElement[i].textContent = 0;
    currentElement[i].textContent = 0;
    playerSection[i].classList.remove('player--active');
    playerSection[i].classList.remove('player--winner');
  }

  playerSection[0].classList.add('player--active');
};

// game begins here
const GAME_LIMIT = 100;
let score = [],
  currentScore,
  currentPlayer,
  gameone;

initializeGame();

// game event listenning
bottunRollDice.addEventListener('click', rollDiceClicked);
bottunHold.addEventListener('click', holdClicked);
buttonNewGame.addEventListener('click', newGameClicked);
