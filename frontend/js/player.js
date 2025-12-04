let player = { x: 0, y: 0, direction: 0, frame: 0 };
let runnerImage = new Image();
runnerImage.src = 'assets/ninja.png'; // Updated to ninja sprite sheet
let keys = {};
let lastMoveTime = 0;
const MOVE_DELAY = 150; // milliseconds between moves

function setupPlayer() {
    player = { x: 0, y: 0, direction: 0, frame: 0 };
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
    // Check if game is running (variable from game.js)
    if (typeof isGameRunning !== 'undefined' && !isGameRunning) return;

    const now = Date.now();
    if (now - lastMoveTime < MOVE_DELAY) return;
    
    if (keys['ArrowUp']) { movePlayer(0, -1); lastMoveTime = now; }
    else if (keys['ArrowDown']) { movePlayer(0, 1); lastMoveTime = now; }
    else if (keys['ArrowLeft']) { movePlayer(-1, 0); lastMoveTime = now; }
    else if (keys['ArrowRight']) { movePlayer(1, 0); lastMoveTime = now; }
}

function movePlayer(dx, dy) {
    // Update direction based on movement
    // 0: Down, 1: Left, 2: Right, 3: Up
    if (dy === 1) player.direction = 0;
    else if (dx === -1) player.direction = 1;
    else if (dx === 1) player.direction = 2;
    else if (dy === -1) player.direction = 3;

    // Cycle animation frame (0-3)
    player.frame = (player.frame + 1) % 4;

    let newX = player.x + dx;
    let newY = player.y + dy;
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        checkCoinCollection();
        if (typeof checkCollisions === 'function') checkCollisions();
    }
    // Always redraw to show direction change even if blocked
    drawGame();
}

function drawPlayer() {
    // Draw player sprite image scaled to tile size
    const x = player.x * tileWidth;
    const y = player.y * tileHeight;
    
    if (runnerImage.complete && runnerImage.width > 0) {
        // Calculate sprite frame dimensions
        // Assuming 4x4 sprite sheet
        const frameWidth = runnerImage.width / 4;
        const frameHeight = runnerImage.height / 4;
        
        const sx = player.frame * frameWidth;
        const sy = player.direction * frameHeight;

        ctx.drawImage(
            runnerImage, 
            sx, sy, frameWidth, frameHeight, // Source: sprite sheet coordinates
            x, y, tileWidth, tileHeight      // Destination: canvas coordinates
        );
    } else {
        // fallback: draw green rectangle while image loads
        ctx.fillStyle = 'lime';
        ctx.fillRect(x, y, tileWidth, tileHeight);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupPlayer,
        processMovement,
        movePlayer,
        drawPlayer,
        getPlayer: () => player,
        setPlayer: (p) => { player = p; }
    };
}