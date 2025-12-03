async function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const character = document.getElementById("reg-character").value;

    const result = await api("/auth/register", "POST", {
        username,
        password,
        characterName: character
    });

    alert(result);
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const result = await api("/auth/login", "POST", {
        username,
        password
    });

    if (result.token) {
        saveToken(result.token);
        
        // Load player info to get current character
        if (typeof loadPlayerInfo === 'function') {
            await loadPlayerInfo();
        }

        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("select-section").classList.remove("hidden");
    } else {
        alert("Login failed");
    }
}
