var currentPlayer, scores, currentTotal, gamestatus;
newGame();

//Roll dice button actions
//get random two number and show them on screen.

document.getElementById("rollBtn").addEventListener("click", function() {
  if (gamestatus) {
    // getting two random number 1-6.
    var dice1 = Math.ceil(Math.random() * 6);
    var dice2 = Math.ceil(Math.random() * 6);
    // showing random numbers with dice picture on screen.
    document.getElementById("dice-1").src = `dice-${dice1}.png`;
    document.getElementById("dice-2").src = `dice-${dice2}.png`;
    // change our current status.
    currentTotal += dice1 + dice2;
    document.querySelector(
      `.player_${currentPlayer}_current`
    ).textContent = currentTotal;
    // when any dice value equals 1 player will be change.
    if (dice1 === dice2) {
      //reset and change
      changePlayer();
    }
  }
});

//hold button actions
document.getElementById("holdBtn").addEventListener("click", function() {
  scores[currentPlayer - 1] = scores[currentPlayer - 1] + currentTotal;
  document.querySelector(`.player_${currentPlayer}_result`).textContent =
    scores[currentPlayer - 1];

  // before we change player, we will look for winning status
  if (scores[currentPlayer - 1] >= 20) {
    currentTotal = 0;
    document.querySelector(`.player_${currentPlayer}_name`).textContent =
      "WINNER";
    gamestatus = false;
  } else {
    //reset and change player
    changePlayer();
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
