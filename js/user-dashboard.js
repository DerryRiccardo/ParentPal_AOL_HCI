// User Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
	// Check authentication
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (isLoggedIn !== "true" || !currentUser) {
		window.location.href = "login.html";
		return;
	}

	// If user is expert, redirect to expert dashboard
	if (currentUser.role === "expert") {
		window.location.href = "expert-dashboard.html";
		return;
	}

	// Load user data
	loadUserDashboard(currentUser);
});

function loadUserDashboard(user) {
	// Update welcome message
	document.getElementById("welcome-name").textContent = user.firstName;

	// Update profile info in navigation
	const userName = document.getElementById("user-name");
	const userEmail = document.getElementById("user-email");

	if (userName) userName.textContent = `${user.firstName} ${user.lastName}`;
	if (userEmail) userEmail.textContent = user.email;

	// Load dashboard data
	loadTodaySchedule();
	loadActivitySummary();
	loadSavedContent();
	loadNotifications();
	loadProgressData();
}

function loadTodaySchedule() {
	// This would typically fetch from an API
	const scheduleContainer = document.getElementById("today-schedule");

	// Sample schedule data - in real app, this would come from backend
	const scheduleData = [
		{
			time: "10:00 AM",
			title: "Consultation with Dr. Sarah",
			type: "Video Call",
			status: "upcoming",
		},
		{
			time: "2:30 PM",
			title: "Parenting Workshop",
			type: "Online Event",
			status: "upcoming",
		},
		{
			time: "7:00 PM",
			title: "Reading Time Reminder",
			type: "Personal",
			status: "reminder",
		},
	];

	// Update schedule display
	scheduleContainer.innerHTML = scheduleData
		.map(
			(item) => `
      <div class="schedule-item">
        <div class="schedule-time">${item.time}</div>
        <div class="schedule-details">
          <div class="schedule-title">${item.title}</div>
          <div class="schedule-type">${item.type}</div>
        </div>
        <div class="schedule-status ${item.status}">${
				item.status.charAt(0).toUpperCase() + item.status.slice(1)
			}</div>
      </div>
    `
		)
		.join("");
}

function loadActivitySummary() {
	// This would fetch user's activity data from backend
	console.log("Loading activity summary...");
}

function loadSavedContent() {
	// This would fetch user's saved content from backend
	console.log("Loading saved content...");
}

function loadNotifications() {
	// This would fetch user's notifications from backend
	console.log("Loading notifications...");
}

function loadProgressData() {
	// This would fetch user's progress data from backend
	console.log("Loading progress data...");
}

// Dashboard Actions
function viewFullSchedule() {
	alert("Opening full schedule view...");
}

function askQuestion() {
	alert("Opening expert question form...");
}

function startChat() {
	window.location.href = "chatbot.html";
}

function bookConsultation() {
	alert("Opening consultation booking...");
}

function browseContent() {
	window.location.href = "content.html";
}

function viewAllSaved() {
	alert("Opening saved content library...");
}

function markAllRead() {
	const notifications = document.querySelectorAll(".notification-item.unread");
	notifications.forEach((notification) => {
		notification.classList.remove("unread");
	});

	showNotification("All notifications marked as read", "success");
}

function viewDetailedProgress() {
	alert("Opening detailed progress view...");
}

function updateProgress() {
	alert("Opening progress update form...");
}

// Utility Functions
function showNotification(message, type = "info") {
	const notification = document.createElement("div");
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
      <i class="fas fa-${
				type === "success" ? "check-circle" : "info-circle"
			}"></i>
      <span>${message}</span>
    `;

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

	setTimeout(() => {
		notification.style.transform = "translateX(0)";
	}, 100);

	setTimeout(() => {
		notification.style.transform = "translateX(100%)";
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Navigation functions
function goToDashboard() {
	document.getElementById("profile-icon").classList.remove("active");
}

function logout() {
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("currentUser");
	window.location.href = "../index.html";
}
