// Mobile menu functionality
const mobileMenuButton = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuButton && navLinks) {
	mobileMenuButton.addEventListener("click", () => {
		navLinks.classList.toggle("show");

		const icon = mobileMenuButton.querySelector("i");
		icon.classList.toggle("fa-bars");
		icon.classList.toggle("fa-times");
	});
}

// Profile dropdown functionality
const profileIcon = document.getElementById("profile-icon");

if (profileIcon) {
	profileIcon.addEventListener("click", function (e) {
		e.stopPropagation();
		this.classList.toggle("active");
	});

	// Close dropdown when clicking outside
	document.addEventListener("click", () => {
		profileIcon.classList.remove("active");
	});
}

// Check authentication status on page load
document.addEventListener("DOMContentLoaded", () => {
	checkAuthStatus();
});

function checkAuthStatus() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const desktopLogin = document.getElementById("desktop-login");
	const profileIcon = document.getElementById("profile-icon");
	const userName = document.getElementById("user-name");
	const userEmail = document.getElementById("user-email");

	if (isLoggedIn === "true" && currentUser) {
		// User is logged in
		if (desktopLogin) desktopLogin.style.display = "none";
		if (profileIcon) profileIcon.style.display = "flex";

		if (userName)
			userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
		if (userEmail) userEmail.textContent = currentUser.email;
	} else {
		// User is not logged in
		if (desktopLogin) desktopLogin.style.display = "block";
		if (profileIcon) profileIcon.style.display = "none";
	}
}

function goToDashboard() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {
		if (currentUser.role === "expert") {
			window.location.href = "./html/expert-dashboard.html";
		} else {
			window.location.href = "./html/user-dashboard.html";
		}
	}
}

function logout() {
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("currentUser");

	// Redirect to home page
	window.location.href = "../index.html";
}
