// coin.js
let coins = [];
let coinImage = new Image();
coinImage.src = 'assets/coin.png';

// BFS to find all reachable tiles from player's start
function getReachableTiles(startX, startY) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const reachable = [];
    const queue = [[startX, startY]];

    while (queue.length) {
        const [x, y] = queue.shift();
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        if (visited[y][x] || maze[y][x] !== 0) continue;

        visited[y][x] = true;
        reachable.push([x, y]);
        queue.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    return reachable;
}

function setupCoins(count = 5) {
    coins = [];
    const reachableTiles = getReachableTiles(player.x, player.y);
    for (let i = 0; i < count && reachableTiles.length; i++) {
        const index = Math.floor(Math.random() * reachableTiles.length);
        const [x, y] = reachableTiles.splice(index, 1)[0];
        coins.push({ x, y });
    }
}

function drawCoins() {
    coins.forEach(c => {
        const tileX = c.x * tileWidth;
        const tileY = c.y * tileHeight;
        if (coinImage.complete && coinImage.width > 0) {
            const coinSize = Math.min(tileWidth, tileHeight) * 0.7;
            const offsetX = (tileWidth - coinSize) / 2;
            const offsetY = (tileHeight - coinSize) / 2;
            ctx.drawImage(coinImage, tileX + offsetX, tileY + offsetY, coinSize, coinSize);
        } else {
            ctx.fillStyle = 'gold';
            ctx.beginPath();
            ctx.arc(tileX + tileWidth / 2, tileY + tileHeight / 2, Math.min(tileWidth, tileHeight) * 0.18, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function checkCoinCollection() {
    coins = coins.filter(c => {
        if (c.x === player.x && c.y === player.y) {
            score += 10;
            updateScore(score);
            return false;
        }
        return true;
    });

    if (coins.length === 0) {
        if (typeof levelComplete === 'function') {
            levelComplete();
        } else {
            alert('You win!');
        }
    }
}