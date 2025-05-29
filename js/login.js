// Pre-declared accounts
const predeclaredAccounts = {
	"user@parentpal.com": {
		password: "password123",
		firstName: "John",
		lastName: "Doe",
		email: "user@parentpal.com",
		phone: "+1234567890",
		role: "user",
		joinDate: "January 2024",
	},
	"expert@parentpal.com": {
		password: "expert123",
		firstName: "Dr. Sarah",
		lastName: "Johnson",
		email: "expert@parentpal.com",
		phone: "+1987654321",
		role: "expert",
		joinDate: "December 2023",
		credentials: "PhD in Child Psychology",
		specialization: "Early Childhood Development",
	},
};

document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("loginForm");
	const togglePassword = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("password");

	// Password visibility toggle
	if (togglePassword && passwordInput) {
		togglePassword.addEventListener("click", () => {
			const type =
				passwordInput.getAttribute("type") === "password" ? "text" : "password";
			passwordInput.setAttribute("type", type);
			togglePassword.querySelector("i").classList.toggle("fa-eye");
			togglePassword.querySelector("i").classList.toggle("fa-eye-slash");
		});
	}

	// Handle login form submission
	if (loginForm) {
		loginForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const email = document.getElementById("email").value.trim();
			const password = document.getElementById("password").value;

			// Check predeclared accounts first
			if (predeclaredAccounts[email]) {
				const account = predeclaredAccounts[email];
				if (account.password === password) {
					localStorage.setItem("isLoggedIn", "true");
					localStorage.setItem("currentUser", JSON.stringify(account));

					if (account.role === "expert") {
						window.location.href = "expert-dashboard.html";
					} else {
						window.location.href = "user-dashboard.html";
					}
					return;
				} else {
					alert("Incorrect password. Please try again.");
					return;
				}
			}

			// Check registered users from localStorage
			const users = JSON.parse(localStorage.getItem("users")) || [];
			const user = users.find((u) => u.email === email);

			if (user) {
				if (user.password === password) {
					localStorage.setItem("isLoggedIn", "true");
					localStorage.setItem("currentUser", JSON.stringify(user));

					if (user.role === "expert") {
						window.location.href = "expert-dashboard.html";
					} else {
						window.location.href = "user-dashboard.html";
					}
				} else {
					alert("Incorrect password. Please try again.");
				}
			} else {
				alert(
					"No account found with this email. Please check the demo accounts or sign up."
				);
			}
		});
	}
});
