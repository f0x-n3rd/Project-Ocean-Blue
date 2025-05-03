// For login page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        // Redirect to main page if logged in
        window.location.href = 'main.html';
        return;
    }

    // Handle login form submission
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get username and password values from input fields
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple check for hardcoded credentials
        if (username === "admin" && password === "password") {
            // Save login status in localStorage
            localStorage.setItem('loggedIn', 'true');
            // Redirect to main page after successful login
            window.location.href = "main.html";
        } else {
            // Show alert if credentials are incorrect
            alert("Incorrect username or password. Note: credentials currently hardcoded, username is 'admin' and password is 'password'. This is a school project, so the functionalities are limited.");
        }
    });
});
