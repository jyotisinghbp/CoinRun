function updateUI() {
    updateScore(score);
    updateTimer(timer);
    updateLevel(level);
}

function updateScore(val) {
    document.getElementById('score').textContent = `Score: ${val}`;
}

function updateTimer(val) {
    document.getElementById('timer').textContent = `Time: ${val}`;
}

function updateLevel(val) {
    document.getElementById('level').textContent = `Level: ${val}`;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawCoins();
    drawPlayer();
}