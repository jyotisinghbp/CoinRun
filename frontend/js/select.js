async function saveCharacter() {
    const character = document.getElementById("character-select").value;

    const result = await api("/user/character", "PUT", { characterName: character }, true);

    alert("Character updated!");
}

function startGame() {
    window.location.href = "game.html";
}
