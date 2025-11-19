let score = 0;
let timer = 60;
let currentLevelIndex = 0;
let level = 1;
let gameInterval;
let gameTickInterval;
let levelCompleted = false;
let enemies = [];
let fires = [];
let enemyImage = new Image();
enemyImage.src = 'assets/enemy.png';
let fireImage = new Image();
fireImage.src = 'assets/fire.png';

const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlay-message');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');

function initGame() {
    score = 0;
    currentLevelIndex = 0;
    level = 1;
    levelCompleted = false;
    hideOverlay();
    loadLevel(currentLevelIndex);
}

function loadLevel(idx) {
    clearInterval(gameInterval);
    clearInterval(gameTickInterval);

    levelCompleted = false;
    currentLevelIndex = idx;
    level = idx + 1;

    setupMaze(currentLevelIndex);
    setupPlayer();

    const cfg = (typeof levels !== 'undefined' && levels[currentLevelIndex]) ? levels[currentLevelIndex] : null;
    const coinCount = cfg && cfg.coinCount ? cfg.coinCount : 5;

    enemies = [];
    fires = [];
    if (cfg) {
        if (Array.isArray(cfg.enemies)) {
            cfg.enemies.forEach(e => {
                enemies.push({
                    x: e.x,
                    y: e.y,
                    path: e.path ? JSON.parse(JSON.stringify(e.path)) : [{x:e.x,y:e.y}],
                    pathIndex: 0
                });
            });
        }
        if (Array.isArray(cfg.fires)) {
            cfg.fires.forEach(f => {
                fires.push({
                    path: JSON.parse(JSON.stringify(f.path)),
                    idx: f.idx || 0,
                    direction: f.direction || 1,
                    activeIndex: f.idx || 0
                });
            });
        }
    }

    setupCoins(coinCount);

    timer = cfg && cfg.timer ? cfg.timer : 60;
    updateLevel(level);
    updateTimer(timer);
    updateUI();

    drawGame();

    startTimer();
    gameTickInterval = setInterval(() => {
        updateEnemies();
        updateFires();
        checkCollisions();
        drawGame();
    }, 400);
}

function startTimer() {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timer--;
        updateTimer(timer);
        if (timer <= 0) {
            clearInterval(gameInterval);
            clearInterval(gameTickInterval);
            showOverlay(`⏳ Time's up! Final Score: ${score}`, false);
        }
    }, 1000);
}

function updateEnemies() {
    enemies.forEach(enemy => {
        if (!enemy.path || enemy.path.length === 0) return;
        enemy.pathIndex = (enemy.pathIndex + 1) % enemy.path.length;
        const pos = enemy.path[enemy.pathIndex];
        enemy.x = pos.x;
        enemy.y = pos.y;
    });
}

function updateFires() {
    fires.forEach(fire => {
        if (!fire.path || fire.path.length === 0) return;
        fire.idx += fire.direction;
        if (fire.idx >= fire.path.length) { fire.idx = fire.path.length - 2; fire.direction = -1; }
        if (fire.idx < 0) { fire.idx = 1; fire.direction = 1; }
        fire.activeIndex = fire.idx;
    });
}

function drawEnemies() {
    enemies.forEach(en => {
        const x = en.x * tileWidth;
        const y = en.y * tileHeight;
        if (enemyImage.complete && enemyImage.width > 0) {
            ctx.drawImage(enemyImage, x, y, tileWidth, tileHeight);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, tileWidth, tileHeight);
        }
    });
}

function drawFires() {
    fires.forEach(f => {
        const pos = f.path[f.activeIndex];
        const x = pos.x * tileWidth;
        const y = pos.y * tileHeight;
        if (fireImage.complete && fireImage.width > 0) {
            ctx.drawImage(fireImage, x, y, tileWidth, tileHeight);
        } else {
            ctx.fillStyle = 'orange';
            ctx.fillRect(x, y, tileWidth, tileHeight);
        }
    });
}

function checkCollisions() {
    enemies.forEach(enemy => {
        if (player.x === enemy.x && player.y === enemy.y) {
            showOverlay(`💀 You were caught by an enemy! Final Score: ${score}`, false);
        }
    });
    fires.forEach(fire => {
        const pos = fire.path[fire.activeIndex];
        if (player.x === pos.x && player.y === pos.y) {
            showOverlay(`🔥 You got burned! Final Score: ${score}`, false);
        }
    });
}

function endGame(msg) {
    clearInterval(gameInterval);
    clearInterval(gameTickInterval);
    showOverlay(msg, false);
}

function levelComplete() {
    if (levelCompleted) return;
    levelCompleted = true;

    clearInterval(gameInterval);
    clearInterval(gameTickInterval);

    if (currentLevelIndex + 1 < levels.length) {
        showOverlay(`🎉 Level ${level} Cleared! Proceed to Level ${level + 1}`, true);
    } else {
        showOverlay(`🏆 You beat the game! Final Score: ${score}`, false);
    }
}

// Overlay functions
function showOverlay(message, hasNext) {
    overlayMessage.textContent = message;
    overlay.style.display = 'flex';
    nextBtn.style.display = hasNext ? 'inline-block' : 'none';
    retryBtn.style.display = 'inline-block';

    nextBtn.onclick = () => {
        overlay.style.display = 'none';
        loadLevel(currentLevelIndex + 1);
    };

    retryBtn.onclick = () => {
        overlay.style.display = 'none';
        loadLevel(currentLevelIndex);
    };
}

function hideOverlay() {
    overlay.style.display = 'none';
}

// Wire buttons
document.getElementById('startBtn').addEventListener('click', initGame);
document.getElementById('restartBtn').addEventListener('click', initGame);