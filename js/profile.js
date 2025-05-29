// Profile page functionality
let isEditMode = false;
let originalData = {};

document.addEventListener("DOMContentLoaded", () => {
	// Check authentication
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (isLoggedIn !== "true" || !currentUser) {
		window.location.href = "login.html";
		return;
	}

	// Load profile data
	loadProfileData(currentUser);

	// Setup password form
	setupPasswordForm();
});

function loadProfileData(user) {
	// Store original data for cancel functionality
	originalData = { ...user };

	// Update navigation
	document.getElementById(
		"nav-user-name"
	).textContent = `${user.firstName} ${user.lastName}`;
	document.getElementById("nav-user-email").textContent = user.email;

	// Update navigation profile styling for experts
	const navProfileImage = document.getElementById("nav-profile-image");
	const navProfileIcon = document.getElementById("nav-profile-icon");
	const navExpertBadge = document.getElementById("nav-expert-badge");

	if (user.role === "expert") {
		navProfileImage.classList.add("expert");
		navProfileIcon.className = "fas fa-user-md";
		navExpertBadge.style.display = "flex";
	} else {
		navProfileImage.classList.remove("expert");
		navProfileIcon.className = "fas fa-user";
		navExpertBadge.style.display = "none";
	}

	// Update profile header
	document.getElementById(
		"profile-name"
	).textContent = `${user.firstName} ${user.lastName}`;
	document.getElementById("profile-role").textContent =
		user.role === "expert" ? "Parenting Expert" : "Parent";
	document.getElementById(
		"join-date"
	).textContent = `Member since ${user.joinDate}`;

	// Update avatar for experts
	const avatarIcon = document.getElementById("avatar-icon");
	const avatarCircle = document.getElementById("avatar-circle");
	if (user.role === "expert") {
		avatarIcon.className = "fas fa-user-md";
		avatarCircle.classList.add("expert");
		document.getElementById("expert-badge").style.display = "flex";
		document.getElementById("expert-section").style.display = "block";
	} else {
		avatarIcon.className = "fas fa-user";
		avatarCircle.classList.remove("expert");
		document.getElementById("expert-badge").style.display = "none";
		document.getElementById("expert-section").style.display = "none";
	}

	// Update personal information
	document.getElementById("display-firstName").textContent = user.firstName;
	document.getElementById("display-lastName").textContent = user.lastName;
	document.getElementById("display-email").textContent = user.email;
	document.getElementById("display-phone").textContent =
		user.phone || "Not provided";

	// Update expert information if applicable
	if (user.role === "expert") {
		document.getElementById("display-credentials").textContent =
			user.credentials || "Not provided";
		document.getElementById("display-specialization").textContent =
			user.specialization || "Not provided";
		document.getElementById("display-bio").textContent =
			user.bio || "No bio provided";
	}

	// Set edit input values
	document.getElementById("edit-firstName").value = user.firstName;
	document.getElementById("edit-lastName").value = user.lastName;
	document.getElementById("edit-email").value = user.email;
	document.getElementById("edit-phone").value = user.phone || "";

	if (user.role === "expert") {
		document.getElementById("edit-credentials").value = user.credentials || "";
		document.getElementById("edit-specialization").value =
			user.specialization || "";
		document.getElementById("edit-bio").value = user.bio || "";
	}
}

function toggleEditMode() {
	isEditMode = !isEditMode;

	const displayElements = document.querySelectorAll(".info-display span");
	const editElements = document.querySelectorAll(".edit-input");
	const editActions = document.getElementById("edit-actions");
	const editButton = document.querySelector(".btn-edit");

	if (isEditMode) {
		// Show edit inputs, hide display spans
		displayElements.forEach((el) => (el.style.display = "none"));
		editElements.forEach((el) => (el.style.display = "block"));
		editActions.style.display = "flex";
		editButton.innerHTML = '<i class="fas fa-times"></i> Cancel Edit';
		editButton.onclick = cancelEdit;
	} else {
		// Show display spans, hide edit inputs
		displayElements.forEach((el) => (el.style.display = "block"));
		editElements.forEach((el) => (el.style.display = "none"));
		editActions.style.display = "none";
		editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
		editButton.onclick = toggleEditMode;
	}
}

function saveProfile() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	// Get updated values
	const updatedUser = {
		...currentUser,
		firstName: document.getElementById("edit-firstName").value.trim(),
		lastName: document.getElementById("edit-lastName").value.trim(),
		email: document.getElementById("edit-email").value.trim(),
		phone: document.getElementById("edit-phone").value.trim(),
	};

	// Add expert fields if applicable
	if (currentUser.role === "expert") {
		updatedUser.credentials = document
			.getElementById("edit-credentials")
			.value.trim();
		updatedUser.specialization = document
			.getElementById("edit-specialization")
			.value.trim();
		updatedUser.bio = document.getElementById("edit-bio").value.trim();
	}

	// Validate required fields
	if (!updatedUser.firstName || !updatedUser.lastName || !updatedUser.email) {
		alert("Please fill in all required fields (First Name, Last Name, Email)");
		return;
	}

	// Validate email format
	if (!validateEmail(updatedUser.email)) {
		alert("Please enter a valid email address");
		return;
	}

	// Update localStorage
	localStorage.setItem("currentUser", JSON.stringify(updatedUser));

	// Update users array if user was registered (not predeclared)
	const users = JSON.parse(localStorage.getItem("users")) || [];
	const userIndex = users.findIndex((u) => u.email === originalData.email);
	if (userIndex !== -1) {
		users[userIndex] = updatedUser;
		localStorage.setItem("users", JSON.stringify(users));
	}

	// Reload profile data and exit edit mode
	loadProfileData(updatedUser);
	toggleEditMode();

	// Show success message
	showNotification("Profile updated successfully!", "success");
}

function cancelEdit() {
	// Restore original values
	loadProfileData(originalData);
	toggleEditMode();
}

function changeAvatar() {
	// This would typically open a file picker or avatar selection modal
	alert(
		"Avatar change functionality would be implemented here. This could include:\n\n• File upload for custom images\n• Selection from predefined avatars\n• Integration with services like Gravatar"
	);
}

function changePassword() {
	document.getElementById("password-modal").classList.add("active");
	document.body.style.overflow = "hidden";
}

function closePasswordModal() {
	document.getElementById("password-modal").classList.remove("active");
	document.body.style.overflow = "auto";

	// Clear form
	document.getElementById("password-form").reset();
}

function setupPasswordForm() {
	const passwordForm = document.getElementById("password-form");

	passwordForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const currentPassword = document.getElementById("current-password").value;
		const newPassword = document.getElementById("new-password").value;
		const confirmPassword = document.getElementById("confirm-password").value;

		const currentUser = JSON.parse(localStorage.getItem("currentUser"));

		// Validate current password
		if (currentPassword !== currentUser.password) {
			alert("Current password is incorrect");
			return;
		}

		// Validate new password
		if (newPassword.length < 8) {
			alert("New password must be at least 8 characters long");
			return;
		}

		// Validate password confirmation
		if (newPassword !== confirmPassword) {
			alert("New passwords do not match");
			return;
		}

		// Update password
		currentUser.password = newPassword;
		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		// Update users array if applicable
		const users = JSON.parse(localStorage.getItem("users")) || [];
		const userIndex = users.findIndex((u) => u.email === currentUser.email);
		if (userIndex !== -1) {
			users[userIndex].password = newPassword;
			localStorage.setItem("users", JSON.stringify(users));
		}

		closePasswordModal();
		showNotification("Password updated successfully!", "success");
	});
}

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email.toLowerCase());
}

function showNotification(message, type = "info") {
	// Create notification element
	const notification = document.createElement("div");
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
        <i class="fas fa-${
					type === "success" ? "check-circle" : "info-circle"
				}"></i>
        <span>${message}</span>
    `;

	// Add styles
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#28a745" : "#007bff"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

	document.body.appendChild(notification);

	// Animate in
	setTimeout(() => {
		notification.style.transform = "translateX(0)";
	}, 100);

	// Remove after 3 seconds
	setTimeout(() => {
		notification.style.transform = "translateX(100%)";
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Navigation functions (from main.js)
function goToDashboard() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {
		if (currentUser.role === "expert") {
			window.location.href = "expert-dashboard.html";
		} else {
			window.location.href = "user-dashboard.html";
		}
	}
}

function logout() {
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("currentUser");
	window.location.href = "../index.html";
}
