# 🎮 Coin Rush Maze

## **Game Overview**
Coin Rush Maze is a **Collect-a-Thon + Puzzle Adventure** game built using **HTML5 Canvas, CSS, and JavaScript**. The player navigates through a maze to collect coins while avoiding obstacles and enemies. The game features **multiple levels**, each increasing in complexity and challenge.

---

## ✅ **Features**
- Player-controlled character (Arrow keys).
- **Three Levels** with progressive difficulty.
- Static maze layout (dynamic maze generation planned).
- Coins placed in accessible positions.
- **Enemies and obstacles** appear as levels progress.
- Score system and countdown timer.
- Level progression after clearing coins.
- Simple UI with **Start** and **Restart** buttons.

---

## 🖼 **Wireframe Sketch**

+---------------------------------------------------+
| Score: 000   Timer: 60s   Level: 1              |
+---------------------------------------------------+
| [Start Button]   [Restart Button]              |
+---------------------------------------------------+
|                                                 |
|   [Maze Grid with Player, Coins, Obstacles]    |
|                                                 |
+---------------------------------------------------+


---

## 🛠 **Technical Requirements**
- **HTML5 Canvas** for rendering maze, player, coins, enemies.
- **CSS** for styling UI elements.
- **JavaScript** for:
  - Game loop (`requestAnimationFrame`).
  - Maze generation algorithm (Recursive Backtracking – future).
  - Collision detection (player vs walls, coins, enemies).
  - Timer and score logic.
  - Event listeners for controls.

---

## 📜 **Development Plan**
### **Phase 1: Setup**
- Create HTML structure with `<canvas>` and UI elements.
- Initialize canvas and game loop.

### **Phase 2: Player & Controls**
- Draw player object.
- Implement keyboard controls for movement.

### **Phase 3: Maze & Levels**
- Render maze layout.
- Add **three levels** with increasing complexity.

### **Phase 4: Coins & Collection**
- Draw coins on canvas.
- Detect collision with player.

### **Phase 5: Enemies & Obstacles**
- Add static obstacles and moving enemies in higher levels.
- Implement collision logic for game-over conditions.

### **Phase 6: Timer & Level Progression**
- Add countdown timer.
- Transition to next level after all coins are collected.

### **Phase 7: UI & Feedback**
- Display score, timer, level.
- Add start/restart buttons.

### **Phase 8: Polish (Not Yet Implemented)**
- Add animations, sounds.
- Optimize performance.

---

## 🚀 **How to Run**
1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. Click **Start Game** to begin.
4. Use **Arrow keys** to move the player and collect coins while avoiding obstacles.

---

## 🔮 **Future Enhancements**
- Dynamic Maze Generation using Recursive Backtracking.
- Level Outlets and better obstacle placement.
- Moving enemies with AI patterns.
- Power-ups (speed boost, shield, coin magnet).
- Game Over screen with restart UI.
- High score tracking with local storage.
- Visual & audio effects for immersive gameplay.
- Multiplayer mode and character customization.

---

