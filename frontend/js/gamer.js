// -------- LOAD PLAYER AND LEADERBOARD --------
window.onload = async () => {
    // Check for token
    const token = getToken();
    if (!token) {
        document.getElementById("login-section").classList.remove("hidden");
        document.getElementById("game-section").classList.add("hidden");
        return;
    }

    try {
        await loadPlayerInfo();
        await loadLeaderboard();
        
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("game-section").classList.remove("hidden");

        startCoinRunGame();   // call your original game start function
    } catch (error) {
        console.error("Initialization failed:", error);
        // If 401, show login
        if (error.status === 401) {
            document.getElementById("login-section").classList.remove("hidden");
            document.getElementById("game-section").classList.add("hidden");
        }
    }
};

// Global user info
let currentUser = null;

// Load current user info
async function loadPlayerInfo() {
    const result = await api("/user/me", "GET", null, true);
    currentUser = result; // Store globally

    document.getElementById("player-info").innerText =
        `Player: ${result.username}`;
    
    // Pre-select the character in the dropdown if on select screen
    const select = document.getElementById("character-select");
    if (select) {
        select.value = result.characterName;
    }
}

// Load Top 3 scores
async function loadLeaderboard() {
    const data = await api("/game/top");

    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.user} - Score: ${item.scoreValue} | Time: ${item.timeTaken}s`;
        list.appendChild(li);
    });
}

// -------- SEND SCORE WHEN GAME ENDS --------
// Call this function from your existing game end logic
async function submitScore(finalScore, totalTime) {
    console.log(`Attempting to submit score: ${finalScore}, Time: ${totalTime}`);
    try {
        const response = await api("/game/score", "POST", {
            scoreValue: finalScore,
            timeTaken: totalTime
        }, true);
        
        console.log("API Response:", response);

        console.log("Score submitted successfully. Refreshing leaderboard...");
        await loadLeaderboard();  // refresh leaderboard immediately
        
        // Optional: Highlight that the score was updated
        const list = document.getElementById("leaderboard");
        list.style.border = "2px solid #ffd700";
        setTimeout(() => list.style.border = "none", 1000);
        
    } catch (error) {
        console.error("Failed to submit score:", error);
    }
}

function logout() {
    localStorage.removeItem("token");
    location.reload();
}


// -------- YOUR EXISTING GAME CODE BELOW --------
// Replace this with your real game start function
function startCoinRunGame() {
    console.log("Game starting... integrate with your existing game logic here");
    if (typeof initGame === 'function') {
        initGame(false); // Do not auto-start
    } else {
        console.error("initGame function not found!");
    }
}
