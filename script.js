// script.js
const board = document.getElementById("board");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((val, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val;
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      endGame(`Player ${cells[a]} Wins!`);
      return;
    }
  }

  if (!cells.includes("")) {
    endGame("It's a Draw!");
  }
}

function endGame(message) {
  gameActive = false;
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
}

function startNewGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  resultScreen.classList.add("hidden");
  renderBoard();
}

renderBoard();
