// -------- LOAD PLAYER AND LEADERBOARD --------
window.onload = async () => {
    await loadPlayerInfo();
    await loadLeaderboard();
    startCoinRunGame();   // call your original game start function
};

// Load current user info
async function loadPlayerInfo() {
    const result = await api("/user/me", "GET", null, true);

    document.getElementById("player-info").innerText =
        `Player: ${result.username} | Character: ${result.characterName}`;
}

// Load Top 3 scores
async function loadLeaderboard() {
    const data = await api("/game/top");

    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.user} (${item.character}) - Score: ${item.scoreValue} | Time: ${item.timeTaken}s`;
        list.appendChild(li);
    });
}

// -------- SEND SCORE WHEN GAME ENDS --------
// Call this function from your existing game end logic
async function submitScore(finalScore, totalTime) {
    await api("/game/score", "POST", {
        scoreValue: finalScore,
        timeTaken: totalTime
    }, true);

    await loadLeaderboard();  // refresh leaderboard
    alert("Score saved!");
}


// -------- YOUR EXISTING GAME CODE BELOW --------
// Replace this with your real game start function
function startCoinRunGame() {
    console.log("Game starting... integrate with your existing game logic here");
}
