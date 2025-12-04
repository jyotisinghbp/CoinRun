async function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const msgDiv = document.getElementById("register-message");
    
    // Default character to Ninja since selection is removed
    const character = "Ninja";

    try {
        const result = await api("/auth/register", "POST", {
            username,
            password,
            characterName: character
        });

        // Assuming result is a string message based on previous code
        msgDiv.style.display = "block";
        msgDiv.style.color = "#ffd700"; // Success color
        msgDiv.innerText = result + " Please login above.";
    } catch (error) {
        msgDiv.style.display = "block";
        msgDiv.style.color = "#ff4444"; // Error color
        
        let msg = error.data;
        if (typeof msg === 'string' && msg.toLowerCase().includes("username already exists")) {
             msgDiv.innerText = "Username already exists. Please choose another.";
        } else {
             msgDiv.innerText = "Registration failed. Try a different username.";
        }
    }
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorDiv = document.getElementById("login-error");

    // Reset error
    errorDiv.style.display = "none";
    errorDiv.innerText = "";

    try {
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
            document.getElementById("game-section").classList.remove("hidden");

            if (typeof loadLeaderboard === 'function') await loadLeaderboard();
            if (typeof initGame === 'function') initGame(false);
        } else {
            // This block might not be reached if api() throws on non-200, 
            // but if it returns an object without token:
            errorDiv.style.display = "block";
            errorDiv.innerText = "Invalid username or password.";
        }
    } catch (error) {
        errorDiv.style.display = "block";
        
        let msg = error.data;
        // Handle potential JSON object response
        if (typeof msg === 'object' && msg !== null) {
             // Sometimes ASP.NET Core returns { "title": "...", "errors": { ... } }
             // or just the string if we parsed it from JSON string
             // But based on my api.js change, if it was a plain string "User not found", it would be in error.data as string.
             if (msg.message) msg = msg.message;
        }

        if (typeof msg === 'string') {
            if (msg.toLowerCase().includes("user not found")) {
                errorDiv.innerText = "Login failed: User not found. If you are new, please register below.";
                return;
            }
            if (msg.toLowerCase().includes("wrong password")) {
                errorDiv.innerText = "Login failed: Wrong password.";
                return;
            }
        }

        // Fallback
        if (error.status === 400 || error.status === 401 || error.status === 404) {
             errorDiv.innerText = "Invalid username or password.";
        } else {
             errorDiv.innerText = "Login failed. Please check your connection.";
        }
    }
}
