/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- A player looses his ENTIRE score when he rolls two 6 in a row.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach Final Score (default value 100) points on GLOBAL score wins the game

*/

var currentPlayer, scores, currentTotal, gamestatus, finalScore;

// At the begining we set default values with newGame() function.

newGame();

//Roll dice button actions
//Get random two number and show them on screen.

document.getElementById("rollBtn").addEventListener("click", function() {
  if (gamestatus) {
    // Getting two random number 1-6.
    var dice1 = Math.ceil(Math.random() * 6);
    var dice2 = Math.ceil(Math.random() * 6);
    // Display random numbers with dice picture on screen.
    document.getElementById("dice-1").src = `dice-${dice1}.png`;
    document.getElementById("dice-2").src = `dice-${dice2}.png`;
    // Change our current status.
    currentTotal += dice1 + dice2;
    document.querySelector(
      `.player_${currentPlayer}_current`
    ).textContent = currentTotal;
    // when any dice value equals 1 player will be change.
    if (dice1 === 1 || dice2 === 1) {
      //reset and change
      changePlayer();
    }
    // when any bot of dices value is equals 6, player result value will be reseted.
    else if (dice1 === 6 && dice2 === 6) {
      scores[currentPlayer - 1] = 0;
      document.querySelector(`.player_${currentPlayer}_result`).textContent =
        scores[currentPlayer - 1];
    }
  }
});

//hold button actions
document.getElementById("holdBtn").addEventListener("click", function() {
  if (gamestatus) {
    scores[currentPlayer - 1] = scores[currentPlayer - 1] + currentTotal;
    document.querySelector(`.player_${currentPlayer}_result`).textContent =
      scores[currentPlayer - 1];

    // Get final score value for checking winner
    finalScore = document.querySelector(".final-score").value;
    // before we change player, we will look for winning status
    if (scores[currentPlayer - 1] >= finalScore) {
      currentTotal = 0;
      document.querySelector(`.player_${currentPlayer}_name`).textContent =
        "WINNER";
      gamestatus = false;
    } else {
      //reset and change player
      changePlayer();
    }
  }
});
// changing player function.
function changePlayer() {
  document
    .querySelector(`.player_${currentPlayer}_name`)
    .classList.toggle("active");
  currentTotal = 0;
  document.querySelector(
    `.player_${currentPlayer}_current`
  ).textContent = currentTotal;
  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
  document
    .querySelector(`.player_${currentPlayer}_name`)
    .classList.toggle("active");
}

//new game button actions

document.getElementById("new_game_btn").addEventListener("click", newGame);

// new game function
function newGame() {
  currentPlayer = 1;
  scores = [0, 0];
  currentTotal = 0;
  gamestatus = true;
  finalScore = 100;

  document.querySelector(`.player_1_name`).textContent = "Player 1";
  document.querySelector(`.player_2_name`).textContent = "Player 2";

  document.querySelector(`.player_1_name`).classList.remove("active");
  document.querySelector(`.player_2_name`).classList.remove("active");
  document.querySelector(`.player_1_name`).classList.add("active");

  document.querySelector(`.player_1_current`).textContent = "current";
  document.querySelector(`.player_2_current`).textContent = "current";

  document.querySelector(`.player_1_result`).textContent = "result";
  document.querySelector(`.player_2_result`).textContent = "result";
}
