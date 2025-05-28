// Authentication check for protected pages
console.log("Auth check script loaded");

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM loaded, checking authentication...");

	// Get current page name
	const currentPage = window.location.pathname.split("/").pop() || "index.html";
	console.log("Current page:", currentPage);

	// Skip check for specific pages
	const allowedPages = ["index.html", "login.html", "signup.html", ""];

	// If on home page or auth pages, skip check
	if (allowedPages.includes(currentPage) || window.location.pathname === "/") {
		console.log("Skipping auth check for allowed page");
		return;
	}

	// Check if user is logged in
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	console.log("Is logged in:", isLoggedIn);
	console.log("Current user:", currentUser);

	// If not logged in, show login modal immediately
	if (!isLoggedIn || !currentUser) {
		console.log("User not logged in, showing modal...");
		// Small delay to ensure page is fully loaded
		setTimeout(() => {
			showAuthModal();
		}, 100);
	} else {
		console.log("User is logged in, allowing access");
	}
});

// Create and show authentication modal
function showAuthModal() {
	console.log("Creating auth modal...");

	// Remove any existing modal first
	const existingModal = document.querySelector(".auth-modal-overlay");
	if (existingModal) {
		existingModal.remove();
	}

	// Create modal elements
	const modalOverlay = document.createElement("div");
	modalOverlay.className = "auth-modal-overlay";

	const modalContent = document.createElement("div");
	modalContent.className = "auth-modal";

	// Modal HTML content
	modalContent.innerHTML = `
        <div class="auth-modal-header">
            <h2>Authentication Required</h2>
            <button class="auth-modal-close">&times;</button>
        </div>
        <div class="auth-modal-icon">
            <i class="fas fa-lock"></i>
        </div>
        <div class="auth-modal-body">
            <p>You need to be logged in to access this page.</p>
            <p>Please log in to continue or return to the home page.</p>
        </div>
        <div class="auth-modal-footer">
            <button class="auth-modal-btn auth-modal-btn-primary" id="modal-login-btn">Log In</button>
            <button class="auth-modal-btn auth-modal-btn-secondary" id="modal-home-btn">Go to Home</button>
        </div>
    `;

	// Append modal to body
	modalOverlay.appendChild(modalContent);
	document.body.appendChild(modalOverlay);

	console.log("Modal added to DOM");

	// Show modal with animation
	setTimeout(() => {
		modalOverlay.classList.add("active");
		console.log("Modal activated");
	}, 10);

	// Close button functionality
	const closeBtn = modalContent.querySelector(".auth-modal-close");
	closeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		goToHome();
	});

	// Login button functionality
	const loginBtn = document.getElementById("modal-login-btn");
	loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		window.location.href = getRelativePath("../html/login.html");
	});

	// Home button functionality
	const homeBtn = document.getElementById("modal-home-btn");
	homeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		goToHome();
	});

	// Prevent closing modal by clicking outside or pressing escape
	modalOverlay.addEventListener("click", (e) => {
		if (e.target === modalOverlay) {
			e.preventDefault();
			e.stopPropagation();
		}
	});

	// Prevent escape key from closing modal
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			e.preventDefault();
		}
	});

	// Prevent page scrolling when modal is open
	document.body.style.overflow = "hidden";
}

// Helper function to go to home page
function goToHome() {
	window.location.href = getRelativePath("index.html");
}

// Helper function to get relative path based on current location
function getRelativePath(targetPath) {
	const currentPath = window.location.pathname;

	// If in html subdirectory, go up one level
	if (currentPath.includes("/html/")) {
		return "../" + targetPath;
	}

	// If targeting a page in html folder from root
	if (!targetPath.includes("html/") && !currentPath.includes("/html/")) {
		if (targetPath === "index.html") {
			return targetPath;
		} else {
			return "html/" + targetPath;
		}
	}

	return targetPath;
}
