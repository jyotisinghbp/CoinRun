const API_URL = "http://localhost:5117"; // change to your backend URL

// Save token
function saveToken(token) {
    localStorage.setItem("token", token);
}

// Retrieve token
function getToken() {
    return localStorage.getItem("token");
}

// Simple wrapper for API requests
async function api(path, method = "GET", body = null, auth = false) {
    const headers = { "Content-Type": "application/json" };

    if (auth) headers["Authorization"] = "Bearer " + getToken();

    const response = await fetch(API_URL + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
        const error = new Error("API Error");
        error.status = response.status;
        const text = await response.text();
        try {
            error.data = JSON.parse(text);
        } catch (e) {
            error.data = text;
        }
        throw error;
    }

    // Handle empty responses (like 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}
