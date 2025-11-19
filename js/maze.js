const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rows = 10;
const cols = 10;
let maze = [];

// tileWidth/Height are computed so the maze covers the whole canvas
let tileWidth = canvas.width / cols;
let tileHeight = canvas.height / rows;

const baseMaze = [
    [0,1,1,0,0,1,0,1,0,0],
    [0,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0],
    [1,1,1,1,0,1,1,0,1,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,1,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,0,1,0,1,0],
    [0,0,0,0,0,0,1,0,0,0],
    [1,1,1,1,1,0,0,0,1,0]
];

function setupMaze(levelIndex = 0) {
    // Load maze from levels if available; fallback to baseMaze
    if (typeof levels !== 'undefined' && levels[levelIndex] && levels[levelIndex].maze) {
        // clone to avoid mutating original
        maze = JSON.parse(JSON.stringify(levels[levelIndex].maze));
    } else {
        maze = JSON.parse(JSON.stringify(baseMaze));
    }
}

function drawMaze() {
    // Recalculate tile size in case canvas was resized
    tileWidth = canvas.width / cols;
    tileHeight = canvas.height / rows;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                // Create a gradient for a wood/rock effect
                const gradient = ctx.createLinearGradient(
                    x * tileWidth, y * tileHeight,
                    (x + 1) * tileWidth, (y + 1) * tileHeight
                );
                gradient.addColorStop(0, '#5C4033'); // Dark brown
                gradient.addColorStop(1, '#8B5A2B'); // Lighter brown
                ctx.fillStyle = gradient;

                // Add shadow for depth
                ctx.shadowColor = '#3e2a1e';
                ctx.shadowBlur = 8;

                ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            } else {
                // Path color (light beige for contrast)
                ctx.fillStyle = '#F5DEB3'; // Wheat color
                ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
    }

    // Reset shadow after drawing
    ctx.shadowBlur = 0;
}
