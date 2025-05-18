document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Password visibility toggle
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Get stored user data
            const storedUserData = JSON.parse(localStorage.getItem('userData'));

            // Verify credentials
            if (storedUserData && storedUserData.email === email) {
                // In a real application, you would hash the password and compare properly
                // For demo purposes, we're using the stored password directly
                if (storedUserData.password === password) {
                    // Set login status
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    // Redirect to profile page
                    window.location.href = 'profile.html';
                } else {
                    alert('Incorrect password. Please try again.');
                }
            } else {
                alert('No account found with this email. Please sign up.');
            }
        });
    }
});