document.addEventListener("DOMContentLoaded", () => {
	// Password visibility toggle
	const togglePassword = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("password");

	if (togglePassword && passwordInput) {
		togglePassword.addEventListener("click", () => {
			const type =
				passwordInput.getAttribute("type") === "password" ? "text" : "password";
			passwordInput.setAttribute("type", type);
			togglePassword.querySelector("i").classList.toggle("fa-eye");
			togglePassword.querySelector("i").classList.toggle("fa-eye-slash");
		});
	}

	// Form validation and submission
	const signupForm = document.getElementById("signupForm");

	if (signupForm) {
		signupForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const firstName = document.getElementById("firstName").value.trim();
			const lastName = document.getElementById("lastName").value.trim();
			const email = document.getElementById("email").value.trim();
			const phone = document.getElementById("phone").value.trim();
			const role = document.getElementById("role").value;
			const password = document.getElementById("password").value;
			const termsChecked = document.getElementById("terms").checked;

			// Simple validation
			if (!firstName || !lastName) {
				alert("Please enter your full name");
				return;
			}

			if (!validateEmail(email)) {
				alert("Email format is (user)@(domain).(extension) with no spaces");
				return;
			}

			if (password.length < 8) {
				alert("Password must be at least 8 characters long");
				return;
			}

			if (!phone) {
				alert("Please enter your phone number");
				return;
			}

			if (!role) {
				alert("Please select your role");
				return;
			}

			if (!termsChecked) {
				alert("You must agree to the Terms & Conditions");
				return;
			}

			// Check if email already exists in localStorage
			const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
			const emailExists = existingUsers.some((user) => user.email === email);

			if (emailExists) {
				alert(
					"An account with this email already exists. Please use a different email or login."
				);
				return;
			}

			// Create user data object
			const userData = {
				firstName,
				lastName,
				email,
				phone,
				role,
				password,
				joinDate: new Date().toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
				}),
				createdAt: new Date().toISOString(),
			};

			// Add user to users array in localStorage
			existingUsers.push(userData);
			localStorage.setItem("users", JSON.stringify(existingUsers));

			// Set current user data
			localStorage.setItem("currentUser", JSON.stringify(userData));
			localStorage.setItem("isLoggedIn", "true");

			alert("Account created successfully!");

			// Redirect based on role
			if (role === "expert") {
				window.location.href = "expert-dashboard.html";
			} else {
				window.location.href = "user-dashboard.html";
			}
		});
	}

	// Helper function to validate email format
	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email.toLowerCase());
	}
});
