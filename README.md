# CoinRun 🎮

CoinRun is a full-stack web-based maze runner game where players navigate through levels, collect coins, and avoid obstacles. The application features a robust .NET backend for user management and score tracking, paired with a responsive HTML5 Canvas frontend.

## ✨ Features

### Gameplay
- **Interactive Maze:** Navigate through custom-designed mazes using arrow keys.
- **Coin Collection:** Collect all coins to progress to the next level.
- **Level Progression:** Includes multiple levels with increasing difficulty.
- **Obstacles & Enemies:** Avoid hazards that appear as you progress.
- **Score & Timer:** Track your performance with a real-time score and countdown timer.

### Application Features
- **User Authentication:** Secure Registration and Login system using JWT (JSON Web Tokens).
- **Score Tracking:** Save your high scores to the database.
- **Responsive UI:** Clean interface with Start and Restart functionality.

---

## 🛠 Tech Stack

### Backend
- **Framework:** .NET 10.0 (ASP.NET Core Web API)
- **Database:** SQL Server
- **ORM:** Entity Framework Core
- **Authentication:** JWT Bearer Authentication
- **Documentation:** Swagger/OpenAPI

### Frontend
- **Core:** HTML5 Canvas, CSS3, Vanilla JavaScript
- **Testing:** Jest
- **Styling:** Custom CSS

---

## 🚀 How to Run

### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download) (version 10.0 or compatible)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB or full instance)
- [Node.js](https://nodejs.org/) (Optional, for running frontend tests)

### 1. Backend Setup
1. Navigate to the API directory:
   ```bash
   cd backend/CoinRun.API
   ```
2. Configure the database connection:
   - Open `appsettings.json`.
   - Ensure the `DefaultConnection` string points to your local SQL Server instance.
3. Apply database migrations to create the schema:
   ```bash
   dotnet ef database update
   ```
4. Start the backend server:
   ```bash
   dotnet run
   ```
   The API will typically start on `http://localhost:5000` or `https://localhost:5001`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. **Option A (VS Code Live Server):**
   - Install the "Live Server" extension in VS Code.
   - Right-click `index.html` and select "Open with Live Server".
3. **Option B (Simple HTTP Server):**
   - If you have Python installed: `python -m http.server`
   - If you have Node.js installed: `npx http-server .`
4. Open the game in your browser (usually `http://127.0.0.1:8080` or similar).

*Note: Ensure the frontend API calls point to the correct running backend URL (check `frontend/js/api.js` or configuration).*

---

## 🔮 Future Enhancements

- **Dynamic Maze Generation:** Implement algorithms (like Recursive Backtracking) to generate infinite unique levels.
- **Global Leaderboards:** Display top scores from all players worldwide.
- **Multiplayer Mode:** Real-time competitive racing against other players.
- **Mobile Support:** Touch controls and responsive design for mobile devices.
- **Power-ups:** Add items like speed boosts, shields, or time extensions.
- **Skin System:** Allow users to customize their player avatar.

---

## 🧪 Running Tests

To run the frontend unit tests:
```bash
cd frontend
npm install
npm test
```
