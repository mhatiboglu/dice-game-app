var currentPlayer = 1;
var scores = [0, 0];
var currentTotal = 0;

//get random two number and show them on screen.
document.getElementById("rollBtn").addEventListener("click", function() {
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
  if (dice1 === 1 || dice2 === 1) {
    //reset and change
    changePlayer();
  }
});

document.getElementById("holdBtn").addEventListener("click", function() {
  scores[currentPlayer - 1] = scores[currentPlayer - 1] + currentTotal;
  document.querySelector(`.player_${currentPlayer}_result`).textContent =
    scores[currentPlayer - 1];

  //reset and change
  changePlayer();
});

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
