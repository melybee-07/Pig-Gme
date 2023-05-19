'use strict';

// selecting elements
const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

// starting condition

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  player0E.classList.remove('player--winner');
  player1E.classList.remove('player--winner');
  player0E.classList.add('player--active');
  player1E.classList.remove('player--active');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0E.classList.toggle('player--active');
  player1E.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Dispay Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. add current score to the active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. check if playes's score is >= 10
  if (scores[activePlayer] >= 10) {
    // finish the gamed
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    // switch to the next player
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
