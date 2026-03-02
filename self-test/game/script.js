// HTML elements
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

const userChoiceP = document.getElementById("user-choice");
const computerChoiceP = document.getElementById("computer-choice");
const winnerP = document.getElementById("winner");

// Helper functions
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function decideWinner(user, computer) {
  if (user === computer) return "Draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) return "You Win!";
  return "Computer Wins!";
}

// Event listeners
function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  userChoiceP.textContent = `Your choice: ${userChoice}`;
  computerChoiceP.textContent = `Computer choice: ${computerChoice}`;
  winnerP.textContent = `Winner: ${decideWinner(userChoice, computerChoice)}`;
}

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
