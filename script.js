'use strict';

// Selecting Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  console.log('init function called');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Genrating a random cide roll
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceValue}.png`;
    // 3. Check if rolled 1; if true then switch to next player
    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game declaring winner
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
