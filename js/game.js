let score = 0;
let timer = 60;
let currentLevelIndex = 0; // 0-based index into levels[]
let level = 1; // user-visible level number
let gameInterval; // timer interval
let gameTickInterval; // tick for enemies/fires
let levelCompleted = false; // flag to prevent multiple levelComplete calls
let enemies = [];
let fires = [];
let enemyImage = new Image();
enemyImage.src = 'assets/enemy.png';
let fireImage = new Image();
fireImage.src = 'assets/fire.png';

function initGame() {
    score = 0;
    currentLevelIndex = 0;
    level = 1;
    levelCompleted = false;
    loadLevel(currentLevelIndex);
}

function loadLevel(idx) {
    // clear any existing intervals
    clearInterval(gameInterval);
    clearInterval(gameTickInterval);

    levelCompleted = false; // reset flag for new level
    currentLevelIndex = idx;
    level = idx + 1;

    // setup maze and entities based on levels.js
    setupMaze(currentLevelIndex);
    setupPlayer();

    // setup coins based on level config
    const cfg = (typeof levels !== 'undefined' && levels[currentLevelIndex]) ? levels[currentLevelIndex] : null;
    const coinCount = cfg && cfg.coinCount ? cfg.coinCount : 5;

    // setup enemies and fires
    enemies = [];
    fires = [];
    if (cfg) {
        // clone enemies and initialize runtime properties
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

    // Place coins avoiding enemies and fires
    setupCoins(coinCount);

    // UI updates
    timer = cfg && cfg.timer ? cfg.timer : 60;
    updateLevel(level);
    updateTimer(timer);
    updateUI();

    drawGame();

    // start timer and tick loop
    startTimer();
    gameTickInterval = setInterval(() => {
        updateEnemies();
        updateFires();
        checkCollisions();
        drawGame();
    }, 400); // 400ms tick for enemy/fire movement
}

function startTimer() {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timer--;
        updateTimer(timer);
        if (timer <= 0) {
            clearInterval(gameInterval);
            clearInterval(gameTickInterval);
            endGame(`Time's up! Final Score: ${score}`);
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
        // move along path back and forth
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
    // coins handled elsewhere in checkCoinCollection
    enemies.forEach(enemy => {
        if (player.x === enemy.x && player.y === enemy.y) {
            endGame('You were caught by an enemy!');
        }
    });
    fires.forEach(fire => {
        const pos = fire.path[fire.activeIndex];
        if (player.x === pos.x && player.y === pos.y) {
            endGame('You got burned!');
        }
    });
}

function endGame(msg) {
    clearInterval(gameInterval);
    clearInterval(gameTickInterval);
    alert(msg + ` Final Score: ${score}`);
}

function levelComplete() {
    if (levelCompleted) return; // prevent multiple calls
    levelCompleted = true;
    
    console.log('levelComplete() called');
    clearInterval(gameInterval);
    clearInterval(gameTickInterval);
    
    // Check if there are more levels
    if (currentLevelIndex + 1 < levels.length) {
        console.log('Advancing to level', currentLevelIndex + 2);
        alert(`Level ${level} cleared! Proceeding to level ${level + 1}`);
        loadLevel(currentLevelIndex + 1);
    } else {
        console.log('Game complete!');
        alert(`You beat the game! Final Score: ${score}`);
    }
}

// wire buttons
document.getElementById('startBtn').addEventListener('click', () => {
    initGame();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    initGame();
});