"use strict";
// game is like this: one player rolls a dice, but whenever he rolls a one, his current score resets. If player gets one, it "transfers" the dice automatically to second player. Same goes bothways.

//current score is max points that player has gotten upon dicing that one, or if he "holds", just like in poker.

// first player to reachs 100 points, wins the game!
const player = document.querySelector(".player");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const scoreFirst = document.querySelector("#score--0");
const scoreSecond = document.getElementById("score--1");
const dices = document.querySelectorAll(".dice");
let currentValue1 = document.getElementById("current--0");
let currentValue2 = document.getElementById("current--1");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");

let scores = [0, 0];
let player1Score = scores[0];
let player2Score = scores[1];
let scoreFirstValue;
let scoreSecondValue;

const clearDice = function () {
  for (let i = 0; i < dices.length; i++) {
    dices[i].classList.add("hidden");
  }
};
newGameButton.addEventListener("click", function () {
  init();
});

let diceRandom = function () {
  return Math.floor(Math.random() * 6 + 1);
};

let dicePictureShow = function (randomNumber) {
  switch (randomNumber) {
    case 1:
      clearDice();
      dices.item(0).classList.remove("hidden");
      break;
    case 2:
      clearDice();
      dices.item(1).classList.remove("hidden");
      break;
    case 3:
      clearDice();
      dices.item(2).classList.remove("hidden");
      break;
    case 4:
      clearDice();
      dices.item(3).classList.remove("hidden");
      break;
    case 5:
      clearDice();
      dices.item(4).classList.remove("hidden");
      break;
    case 6:
      clearDice();
      dices.item(5).classList.remove("hidden");
      break;
    default:
      console.error("Somethings wrong");
  }
};
let updateCurrentScore = function () {
  currentValue1.textContent = player1Score;
  currentValue2.textContent = player2Score;
};

//beginning -> set score values to zero
let init = function () {
  clearDice();
  rollDiceButton.disabled = false;
  holdButton.disabled = false;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  scoreFirst.textContent = 0;
  scoreSecond.textContent = 0;
  currentValue1.textContent = 0;
  currentValue2.textContent = 0;
  scoreFirstValue = 0;
  scoreSecondValue = 0;
  //start
  player1.classList.add("player--active");
  if (player2.classList.contains("player--active")) {
    player2.classList.remove("player--active");
  }
};

let switchPlayer = function () {
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  } else if (player2.classList.contains("player--active")) {
    player2.classList.remove("player--active");
    player1.classList.add("player--active");
  }
};
let gameOverAndWinnerState = function () {
  if (scoreFirstValue >= 30) {
    player1.classList.add("player--winner", "name");
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
    newGameButton.addEventListener("click", function () {
      init();
    });
  } else if (scoreSecondValue >= 30) {
    player2.classList.add("player--winner", "name");
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
    newGameButton.addEventListener("click", function () {
      init();
    });
  } else {
    switchPlayer();
  }
};
let resetCurrentPlayerScore = function () {
  if (player1.classList.contains("player--active")) {
    player1Score = 0;
  } else if (player2.classList.contains("player--active")) {
    player2Score = 0;
  }
  updateCurrentScore();
};

init();

//first button logic (roll dice)
rollDiceButton.addEventListener("click", function () {
  let randomNumber = diceRandom();
  dicePictureShow(randomNumber);
  console.log(randomNumber);
  //if "roll dice" -> add dice value(randomNumber) to current score of player that has "player--active class"
  if (randomNumber != 1) {
    if (player1.classList.contains("player--active")) {
      player1Score += randomNumber;
    } else if (player2.classList.contains("player--active")) {
      player2Score += randomNumber;
    }
  } else {
    resetCurrentPlayerScore();
    switchPlayer();
  }
  updateCurrentScore();
  console.log(player1Score, player2Score);
  //if "randomNumber == 1" -> reset current score
});

//if "hold" -> add current score to score.
holdButton.addEventListener("click", function () {
  scoreFirstValue += player1Score;
  scoreSecondValue += player2Score;
  console.log(scoreFirstValue, scoreSecondValue);
  scoreFirst.textContent = scoreFirstValue;
  scoreSecond.textContent = scoreSecondValue;
  resetCurrentPlayerScore();
  gameOverAndWinnerState();
});
