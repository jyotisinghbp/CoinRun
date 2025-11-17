let score = 0;
let timer = 60;
let level = 1;
let gameInterval;

function initGame() {
    score = 0;
    timer = 60;
    level = 1;
    updateUI();
    setupMaze();
    setupPlayer();
    setupCoins();
    drawGame();
}

function startTimer() {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timer--;
        updateTimer(timer);
        if (timer <= 0) {
            clearInterval(gameInterval);
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);
}

function levelComplete() {
    // Called when all coins are collected
    clearInterval(gameInterval);
    if (timer > 0) {
        alert(`Level ${level} cleared! Proceeding to level ${level + 1}`);
        level++;
        // increase difficulty by adding more coins each level
        const nextCoinCount = 5 + (level - 1) * 2;
        // reset timer for next level
        timer = 60;
        updateLevel(level);
        updateTimer(timer);
        setupMaze();
        setupPlayer();
        setupCoins(nextCoinCount);
        drawGame();
        startTimer();
    } else {
        alert('Time ran out before completing the level.');
    }
}

document.getElementById('startBtn').addEventListener('click', () => {
    initGame();
    startTimer();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    level = 1;
    initGame();
    startTimer();
});