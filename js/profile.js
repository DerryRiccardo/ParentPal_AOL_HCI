document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!isLoggedIn || !userData) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile information
    const nameElement = document.querySelector('.profile-details h2');
    const emailElement = document.querySelector('.profile-details p:nth-child(2)');
    const phoneElement = document.querySelector('.profile-details p:nth-child(3)');
    const joinDateElement = document.querySelector('.profile-details p:nth-child(5)');

    if (nameElement) {
        nameElement.textContent = `${userData.lastName}, ${userData.firstName}`;
    }
    if (emailElement) {
        emailElement.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;
    }
    if (phoneElement) {
        phoneElement.innerHTML = `<i class="fas fa-phone"></i> ${userData.phone}`;
    }
    if (joinDateElement) {
        joinDateElement.innerHTML = `<i class="fas fa-calendar"></i> Joined: ${userData.joinDate}`;
    }

    // Handle logout
    const logoutButton = document.querySelector('.profile-actions a:last-child');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
                // Only remove the login status, keep user data
            localStorage.setItem('isLoggedIn', 'false');
            alert('Succesfully logged out')
            window.location.href="../index.html";
        });
    }

    // Event listeners for buttons
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const viewActivityBtn = document.querySelector('.view-all-btn');
    const editInfoBtns = document.querySelectorAll('.edit-info-btn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => alert('Edit profile functionality to be implemented'));
    }

    if (viewActivityBtn) {
        viewActivityBtn.addEventListener('click', () => alert('View activity details functionality to be implemented'));
    }

    if (editInfoBtns.length > 0) {
        editInfoBtns.forEach(button => {
            button.addEventListener('click', function() {
                const childName = this.closest('.child-card').querySelector('h3').textContent;
                alert(`Edit information for ${childName}`);
            });
        });
    }
});