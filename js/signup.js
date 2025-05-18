document.addEventListener('DOMContentLoaded', () => {

    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Change the icon (this would be better with actual icons)
            const imgElement = this.querySelector('img');
            if (imgElement) {
                if (type === 'text') {
                    imgElement.setAttribute('alt', 'Hide Password');
                } else {
                    imgElement.setAttribute('alt', 'Show Password');
                }
            }
        });
    }
    
    // Form validation and submission
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Simple validation
            if (!firstName || !lastName) {
                alert('Please enter your full name');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Email format is (user)@(domain).(extension) with no spaces');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            if (!phone) {  // Add phone validation
                alert('Please enter your phone number');
                return;
            }

            if (!termsChecked) {
                alert('You must agree to the Terms & Conditions');
                return;
            }
            
            // If validation passes, you would typically send data to a server
            console.log('Form submission', { firstName, lastName, email });
            
            // Simulate successful signup
            alert('Account created successfully!');
            signupForm.reset();

            const userData = {
                firstName,
                lastName,
                email,
                phone,
                password,
                joinDate: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                })
            };

            // Store in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect to profile page
            window.location.href = 'profile.html';
        });
    }
    
    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});