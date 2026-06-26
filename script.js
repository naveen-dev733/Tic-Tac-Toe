// Game variables
let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

// Winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const statusMessage = document.getElementById('statusMessage');
const resetBtn = document.getElementById('resetBtn');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// Initialize game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.textContent = '';
    });
    updateStatus();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already filled or game is inactive
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Update game board and cell
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('animate');

    // Check for winner or draw
    if (checkWinner()) {
        endGame(`Player ${currentPlayer} Wins! 🎉`);
        currentPlayer === 'X' ? scoreX++ : scoreO++;
        updateScores();
    } else if (gameBoard.every(cell => cell !== '')) {
        endGame('It\'s a Draw! 🤝');
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Check for winner
function checkWinner() {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

// Update game status
function updateStatus() {
    const playerInfo = document.querySelectorAll('.player');
    playerInfo.forEach(player => player.classList.remove('active'));

    if (currentPlayer === 'X') {
        playerInfo[0].classList.add('active');
        statusMessage.textContent = `PLAYER ${currentPlayer}'S TURN`;
    } else {
        playerInfo[1].classList.add('active');
        statusMessage.textContent = `PLAYER ${currentPlayer}'S TURN`;
    }

    gameStatus.classList.remove('winner', 'draw');
}

// End game
function endGame(message) {
    gameActive = false;
    statusMessage.textContent = message;
    gameStatus.classList.add('winner');

    // Add glow effect to winning cells
    if (message.includes('Wins')) {
        WINNING_COMBINATIONS.forEach(combination => {
            if (combination.every(index => gameBoard[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].style.boxShadow = `0 0 20px ${currentPlayer === 'X' ? '#00b4ff' : '#ff9500'}`;
                });
            }
        });
    }

    if (message.includes('Draw')) {
        gameStatus.classList.remove('winner');
        gameStatus.classList.add('draw');
    }
}

// Update scores
function updateScores() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.boxShadow = '';
        cell.classList.remove('animate');
    });
    updateStatus();
}

// Event listeners
resetBtn.addEventListener('click', resetGame);

// Start game
initGame();