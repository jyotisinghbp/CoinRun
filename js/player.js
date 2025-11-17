let player = { x: 0, y: 0 };
let runnerImage = new Image();
runnerImage.src = 'assets/runner.png';

function setupPlayer() {
    player = { x: 0, y: 0 };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') movePlayer(0, -1);
        if (e.key === 'ArrowDown') movePlayer(0, 1);
        if (e.key === 'ArrowLeft') movePlayer(-1, 0);
        if (e.key === 'ArrowRight') movePlayer(1, 0);
    });
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