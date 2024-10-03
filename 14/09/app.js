const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle box click
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
});

// Handle box click logic
function handleBoxClick(box, index) {
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWinner()) {
        displayMessage(`${currentPlayer} Wins!`);
    } else if (board.every(box => box !== '')) {
        displayMessage("It's a Draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for winner
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

// Display message
function displayMessage(text) {
    msgContainer.classList.remove('hide');
    msg.textContent = text;
    isGameActive = false;
}

// Reset game
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    boxes.forEach(box => {
        box.textContent = '';
    });
    msgContainer.classList.add('hide');
}
