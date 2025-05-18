document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('userData')) {
        localStorage.setItem('isLoggedIn', 'false');
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const desktopLoginBtn = document.querySelector('.desktop-login');
    const mobileLoginBtn = document.querySelector('.mobile-login');


    if (userData && isLoggedIn) {
        // Create profile icon for desktop
        if (desktopLoginBtn) {
            const profileContainer = document.createElement('div');
            profileContainer.className = 'profile-icon';
            
            // Check if we're in the root directory or html directory
            const isRootDir = window.location.pathname.indexOf('/html/') === -1;
            const profilePath = isRootDir ? './html/profile.html' : './profile.html';

            profileContainer.innerHTML = `
                <div class="profile-image">
                    <i class="fas fa-user-circle"></i>
                </div>
                <i class="fas fa-chevron-down"></i>
                <div class="profile-dropdown">
                    <div class="dropdown-header">
                        <p class="user-name">${userData.firstName} ${userData.lastName}</p>
                        <p class="user-email">${userData.email}</p>
                    </div>
                    <div class="dropdown-content">
                        <a href="${profilePath}" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            View Profile
                        </a>
                        <button class="dropdown-item logout-btn">
                            <i class="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                </div>
            `;
            
            // Add click event to profile icon
            profileContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                profileContainer.classList.toggle('active');
            });

            // Add click event to logout button
            const logoutBtn = profileContainer.querySelector('.logout-btn');
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Only remove the login status, keep user data
                localStorage.setItem('isLoggedIn', 'false');
                alert('Succesfully logged out')
                window.location.reload();
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                profileContainer.classList.remove('active');
            });

            // Replace login button with profile icon
            desktopLoginBtn.replaceWith(profileContainer);

        } if (mobileLoginBtn) {
            mobileLoginBtn.style.display = 'none';
        }
    }else {
        // Show login buttons when logged out
        if (desktopLoginBtn) {
            desktopLoginBtn.style.display = 'block';
        }
        if (mobileLoginBtn) {
            mobileLoginBtn.style.display = 'block';
        }
    }
});