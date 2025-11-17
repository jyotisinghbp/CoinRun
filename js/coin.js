let coins = [];
let coinImage = new Image();
coinImage.src = 'assets/coin.png';

function setupCoins(count = 5) {
    coins = [];
    for (let i = 0; i < count; i++) {
        let cx, cy;
        let attempts = 0;
        do {
            cx = Math.floor(Math.random() * cols);
            cy = Math.floor(Math.random() * rows);
            attempts++;
            // safety: if too many attempts, break to avoid infinite loop
            if (attempts > 1000) break;
        } while (maze[cy][cx] === 1 || (cx === player.x && cy === player.y));
        coins.push({ x: cx, y: cy });
    }
}

function drawCoins() {
    coins.forEach(c => {
        const tileX = c.x * tileWidth;
        const tileY = c.y * tileHeight;
        if (coinImage.complete && coinImage.width > 0) {
            // Draw coin image smaller (70% of tile) and centered to hide background
            const coinSize = Math.min(tileWidth, tileHeight);
            const offsetX = (tileWidth - coinSize) / 2;
            const offsetY = (tileHeight - coinSize) / 2;
            ctx.drawImage(coinImage, tileX + offsetX, tileY + offsetY, coinSize, coinSize);
        } else {
            // Fallback: draw gold circle while image loads
            const cx = tileX + tileWidth / 2;
            const cy = tileY + tileHeight / 2;
            const radius = Math.max(4, Math.min(tileWidth, tileHeight) * 0.18);
            ctx.fillStyle = 'gold';
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
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
    // If all coins collected and time remains, advance to next level
    if (coins.length === 0) {
        if (typeof levelComplete === 'function') {
            levelComplete();
        } else {
            // fallback behavior
            alert('You win!');
        }
    }
}