# CoinRun
A simple JavaScript maze game where players navigate through a maze, collect coins, and race against time to achieve the highest score.
 
 # Coin Rush Maze

## 🎮 Game Overview
Coin Rush Maze is a **Collect-a-Thon + Puzzle** game built using **HTML5 Canvas, CSS, and JavaScript**. The player navigates through a maze to collect all coins before time runs out. Each level increases in complexity, making the game progressively challenging.

---

## ✅ Features
- Player-controlled character (Arrow keys)
- Static maze (dynamic maze generation coming soon)
- Coins randomly placed in accessible positions
- Score system and timer
- Level progression
- Simple UI with Start and Restart buttons

---

## 🖼 Wireframe Sketch
+---------------------------------------------------+
| Score: 000   Timer: 60s   Level: 1              |
+---------------------------------------------------+
|                                                 |
|   [Maze Grid with Player and Coins]            |
|                                                 |
+---------------------------------------------------+
| [Start Button]   [Restart Button]              |
+---------------------------------------------------+


---

## 🛠 Technical Requirements
- **HTML5 Canvas** for rendering maze, player, coins.
- **CSS** for styling UI elements.
- **JavaScript** for:
  - Game loop (`requestAnimationFrame`).
  - Maze generation algorithm (Recursive Backtracking).
  - Collision detection (player vs walls, player vs coins).
  - Timer and score logic.
  - Event listeners for controls.

---

## 📜 Development Plan
### Phase 1: Setup
- Create HTML structure with `<canvas>` and UI elements.
- Initialize canvas and game loop.

### Phase 2: Player & Controls
- Draw player object.
- Implement keyboard controls for movement.

### Phase 3: Maze Generation
- Implement maze algorithm.
- Render maze on canvas.

### Phase 4: Coins & Collection
- Draw coins on canvas.
- Detect collision with player.

### Phase 5: Timer & Level Progression
- Add countdown timer.
- Increase maze complexity each level.

### Phase 6: UI & Feedback
- Display score, timer, level.
- Add start/restart buttons.

### Phase 7: Polish
- Add animations, sounds.
- Optimize performance.

---

<!-- ## 🔍 Pseudocode
```javascript
function initGame() {
    createCanvas();
    setupUI();
    currentLevel = 1;
    score = 0;
    startGame();
}

function startGame() {
    maze = generateMaze(currentLevel);
    coins = placeCoins(maze);
    player = { x: startX, y: startY };
    timer = setTimer(currentLevel);
    gameLoop();
}

function gameLoop() {
    clearCanvas();
    drawMaze(maze);
    drawCoins(coins);
    drawPlayer(player);
    updateTimer();
    checkCollisions();
    if (coins.length === 0) nextLevel();
    if (timer <= 0) gameOver();
    requestAnimationFrame(gameLoop);
} -->
🚀 How to Run

Clone or download the repository.
Open index.html in any modern web browser.
Click Start Game to begin.
Use Arrow keys to move the player and collect coins.


🔮 Future Enhancements

Dynamic maze generation using Recursive Backtracking.
Difficulty scaling (larger maze, more coins).
Game Over screen with restart UI.
Animations and sound effects.
Power-ups and moving obstacles.
High score tracking with local storage.

🚀 Future Enhancements


Multiple Levels
Add progressive difficulty with different maze sizes and themes (Forest, Desert, Ice).


Obstacles
Introduce moving enemies, traps, locked doors with keys, and teleport portals.


Power-Ups
Speed boost, shield, and coin magnet for added strategy.


Dynamic Gameplay
Time limits, shifting walls, and hidden passages for extra challenge.


Scoring & Rewards
Bonus points, achievements, and leaderboards.


Visual & Audio Effects
Smooth animations, sound effects, and themed backgrounds.


Advanced Features
Random maze generator, character customization, and multiplayer mode.

📜 License
This project is open-source and free to use for learning and development purposes.
---
