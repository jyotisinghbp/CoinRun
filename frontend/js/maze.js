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
    tileWidth = canvas.width / cols;
    tileHeight = canvas.height / rows;

    // Define color themes for levels
    const themes = {
       
        1: { wallStart: '#355E3B', wallEnd: '#6B8E23', path: '#FFD580' },
        2: { wallStart: '#092635', wallEnd: '#0B3B3B', path: '#5C8374' }, 
        3: { wallStart: '#0A1F44', wallEnd: '#1E3A5F', path: '#A9B8D4' }  
    };

    const theme = themes[level] || themes[1]; // fallback to level 1 theme

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                // Gradient for wall tiles
                const gradient = ctx.createLinearGradient(
                    x * tileWidth, y * tileHeight,
                    (x + 1) * tileWidth, (y + 1) * tileHeight
                );
                gradient.addColorStop(0, theme.wallStart);
                gradient.addColorStop(1, theme.wallEnd);
                ctx.fillStyle = gradient;

                // Shadow for depth
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 6;

                ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            } else {
                // Path tiles
                ctx.fillStyle = theme.path;
                ctx.shadowBlur = 0;
                ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
    }

    ctx.shadowBlur = 0;
}

