// Expert Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
	// Check authentication
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (isLoggedIn !== "true" || !currentUser) {
		window.location.href = "login.html";
		return;
	}

	// If user is not expert, redirect to user dashboard
	if (currentUser.role !== "expert") {
		window.location.href = "user-dashboard.html";
		return;
	}

	// Load expert data
	loadExpertDashboard(currentUser);
});

function loadExpertDashboard(user) {
	// Update welcome message
	document.getElementById("expert-name").textContent = `Dr. ${user.firstName}`;

	// Update profile info in navigation
	const userName = document.getElementById("user-name");
	const userEmail = document.getElementById("user-email");

	if (userName) userName.textContent = `${user.firstName} ${user.lastName}`;
	if (userEmail) userEmail.textContent = user.email;

	// Load dashboard data
	loadTodayConsultations();
	loadTodoList();
	loadPendingQuestions();
	loadRecentDiscussions();
	loadExpertStats();
}

function loadTodayConsultations() {
	// This would typically fetch from an API
	console.log("Loading today's consultations...");
}

function loadTodoList() {
	// Setup todo list functionality
	const todoCheckboxes = document.querySelectorAll(".todo-checkbox");

	todoCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", (e) => {
			const todoItem = e.target.closest(".todo-item");
			if (e.target.checked) {
				todoItem.classList.add("completed");
			} else {
				todoItem.classList.remove("completed");
			}

			// Save todo state to localStorage
			saveTodoState();
		});
	});
}

function loadPendingQuestions() {
	// This would fetch pending questions from backend
	console.log("Loading pending questions...");
}

function loadRecentDiscussions() {
	// This would fetch recent community discussions
	console.log("Loading recent discussions...");
}

function loadExpertStats() {
	// This would fetch expert performance stats
	console.log("Loading expert statistics...");
}

function saveTodoState() {
	const todos = [];
	const todoItems = document.querySelectorAll(".todo-item");

	todoItems.forEach((item, index) => {
		const checkbox = item.querySelector(".todo-checkbox");
		const label = item.querySelector(".todo-label").textContent;
		const priority = item.querySelector(".todo-priority").textContent;

		todos.push({
			id: index,
			text: label,
			priority: priority,
			completed: checkbox.checked,
		});
	});

	localStorage.setItem("expertTodos", JSON.stringify(todos));
}

// Dashboard Actions
function manageSchedule() {
	alert("Opening schedule management...");
}

function addTask() {
	const taskText = prompt("Enter new task:");
	if (taskText) {
		const todoList = document.querySelector(".todo-list");
		const newTaskId = `task${Date.now()}`;

		const newTask = document.createElement("div");
		newTask.className = "todo-item";
		newTask.innerHTML = `
        <input type="checkbox" id="${newTaskId}" class="todo-checkbox">
        <label for="${newTaskId}" class="todo-label">${taskText}</label>
        <div class="todo-priority medium">Medium</div>
      `;

		todoList.appendChild(newTask);

		// Add event listener to new checkbox
		const newCheckbox = newTask.querySelector(".todo-checkbox");
		newCheckbox.addEventListener("change", (e) => {
			const todoItem = e.target.closest(".todo-item");
			if (e.target.checked) {
				todoItem.classList.add("completed");
			} else {
				todoItem.classList.remove("completed");
			}
			saveTodoState();
		});

		saveTodoState();
		showNotification("Task added successfully!", "success");
	}
}

function viewAllQuestions() {
	alert("Opening all questions view...");
}

function viewCommunity() {
	window.location.href = "community.html";
}

function createArticle() {
	alert("Opening article creation form...");
}

function scheduleConsultation() {
	alert("Opening consultation scheduling...");
}

function viewAnalytics() {
	alert("Opening analytics dashboard...");
}

function manageResources() {
	alert("Opening resource management...");
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
