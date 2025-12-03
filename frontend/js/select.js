async function saveCharacter() {
    const character = document.getElementById("character-select").value;

    try {
        // Check if character actually changed
        if (currentUser && currentUser.characterName !== character) {
            await api("/user/character", "PUT", { characterName: character }, true);
            alert("Character updated!");
        } else {
            console.log("Character unchanged, skipping update.");
        }
        
        document.getElementById("select-section").classList.add("hidden");
        document.getElementById("game-section").classList.remove("hidden");

        if (typeof loadPlayerInfo === 'function') await loadPlayerInfo();
        if (typeof loadLeaderboard === 'function') await loadLeaderboard();
        if (typeof initGame === 'function') initGame(false);

    } catch (e) {
        console.error(e);
        alert("Failed to save character");
    }
}
