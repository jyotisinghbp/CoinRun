let player = { x: 0, y: 0 };
let runnerImage = new Image();
runnerImage.src = 'assets/runner.png';
let keys = {};
let lastMoveTime = 0;
const MOVE_DELAY = 150; // milliseconds between moves

function setupPlayer() {
    player = { x: 0, y: 0 };
    lastMoveTime = 0;
    keys = {};
    
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            keys[e.key] = true;
            processMovement();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            keys[e.key] = false;
        }
    });
}

function processMovement() {
    const now = Date.now();
    if (now - lastMoveTime < MOVE_DELAY) return;
    
    if (keys['ArrowUp']) { movePlayer(0, -1); lastMoveTime = now; }
    else if (keys['ArrowDown']) { movePlayer(0, 1); lastMoveTime = now; }
    else if (keys['ArrowLeft']) { movePlayer(-1, 0); lastMoveTime = now; }
    else if (keys['ArrowRight']) { movePlayer(1, 0); lastMoveTime = now; }
}

function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        checkCoinCollection();
        drawGame();
    }
}

function drawPlayer() {
    // Draw player sprite image scaled to tile size
    const x = player.x * tileWidth;
    const y = player.y * tileHeight;
    if (runnerImage.complete && runnerImage.width > 0) {
        ctx.drawImage(runnerImage, x, y, tileWidth, tileHeight);
    } else {
        // fallback: draw green rectangle while image loads
        ctx.fillStyle = 'lime';
        ctx.fillRect(x, y, tileWidth, tileHeight);
    }
}