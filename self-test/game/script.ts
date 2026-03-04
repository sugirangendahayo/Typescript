type Choice = "rock" | "paper" | "scissors";


const rockBtn = document.getElementById("rock") as HTMLButtonElement;
const paperBtn = document.getElementById("paper") as HTMLButtonElement;
const scissorsBtn = document.getElementById("scissors") as HTMLButtonElement;

const userChoiceP = document.getElementById("user-choice") as HTMLParagraphElement;
const computerChoiceP = document.getElementById("computer-choice") as HTMLParagraphElement;
const winnerP = document.getElementById("winner") as HTMLParagraphElement;


function getComputerChoice(): Choice {
  const choices: Choice[] = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length); 
  return choices[randomIndex];
}

function decideWinner(user: Choice, computer: Choice): string {
  if (user === computer) return "Draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) return "You Win!";
  return "Computer Wins!";
}

function playGame(userChoice: Choice) {
  const computerChoice = getComputerChoice();

  userChoiceP.textContent = `Your choice is: ${userChoice}`;
  computerChoiceP.textContent = `Computer choice: ${computerChoice}`;
  winnerP.textContent = `Winner: ${decideWinner(userChoice, computerChoice)}`;
}

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
