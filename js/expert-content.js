document.addEventListener("DOMContentLoaded", () => {
	// Category filter buttons
	const categoryButtons = document.querySelectorAll(".category-btn");

	if (categoryButtons.length > 0) {
		categoryButtons.forEach((button) => {
			button.addEventListener("click", function () {
				categoryButtons.forEach((btn) => btn.classList.remove("active"));

				this.classList.add("active");

				const category = this.textContent.trim().toLowerCase();
				filterContent(category);
			});
		});
	}

	// Search functionality
	const searchInput = document.querySelector(".search-container input");
	const searchButton = document.querySelector(".search-btn");

	if (searchButton && searchInput) {
		searchButton.addEventListener("click", () => {
			performSearch(searchInput.value);
		});

		searchInput.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				performSearch(this.value);
			}
		});
	}

	// Create New Content button
	const createBtn = document.querySelector(".create-btn");
	if (createBtn) {
		createBtn.addEventListener("click", () => {
			showCreateContentModal();
		});
	}

	// View Drafts button
	const draftBtn = document.querySelector(".draft-btn");
	if (draftBtn) {
		draftBtn.addEventListener("click", () => {
			window.location.href = "#drafts";
			document
				.querySelector(".draft-content")
				.scrollIntoView({ behavior: "smooth" });
		});
	}

	// Scheduled Content button
	const scheduleBtn = document.querySelector(".schedule-btn");
	if (scheduleBtn) {
		scheduleBtn.addEventListener("click", () => {
			window.location.href = "#scheduled";
			document
				.querySelector(".scheduled-content")
				.scrollIntoView({ behavior: "smooth" });
		});
	}

	// Analytics button
	const analyticsBtn = document.querySelector(".analytics-btn");
	if (analyticsBtn) {
		analyticsBtn.addEventListener("click", () => {
			window.location.href = "analytics.html";
		});
	}

	// Edit buttons
	const editButtons = document.querySelectorAll(".edit-btn");
	if (editButtons.length > 0) {
		editButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const contentCard = this.closest(
					".article-card, .video-card, .content-card"
				);
				const contentTitle = contentCard.querySelector(
					".article-title, h4, h5"
				).textContent;
				alert(`Editing: ${contentTitle}`);
				// In a real app, this would open the content editor
			});
		});
	}

	// Stats buttons
	const statsButtons = document.querySelectorAll(".stats-btn");
	if (statsButtons.length > 0) {
		statsButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const contentCard = this.closest(
					".article-card, .video-card, .content-card"
				);
				const contentTitle = contentCard.querySelector(
					".article-title, h4, h5"
				).textContent;
				alert(`Viewing stats for: ${contentTitle}`);
				// In a real app, this would open the content statistics
			});
		});
	}

	// Publish buttons
	const publishButtons = document.querySelectorAll(".publish-btn");
	if (publishButtons.length > 0) {
		publishButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const contentCard = this.closest(".content-card");
				const contentTitle = contentCard.querySelector("h5").textContent;
				alert(`Publishing: ${contentTitle}`);
				// In a real app, this would open the publish dialog
			});
		});
	}

	// Reschedule buttons
	const rescheduleButtons = document.querySelectorAll(".schedule-edit-btn");
	if (rescheduleButtons.length > 0) {
		rescheduleButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const contentCard = this.closest(".content-card");
				const contentTitle = contentCard.querySelector("h5").textContent;
				alert(`Rescheduling: ${contentTitle}`);
				// In a real app, this would open the scheduling dialog
			});
		});
	}

	// More buttons (ellipsis)
	const moreButtons = document.querySelectorAll(".more-btn");
	if (moreButtons.length > 0) {
		moreButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const contentCard = this.closest(
					".article-card, .video-card, .content-card"
				);
				const contentTitle = contentCard.querySelector(
					".article-title, h4, h5"
				).textContent;

				// Create a simple dropdown menu
				const dropdown = document.createElement("div");
				dropdown.className = "more-dropdown";
				dropdown.innerHTML = `
                      <div class="dropdown-item">Preview</div>
                      <div class="dropdown-item">Duplicate</div>
                      <div class="dropdown-item delete">Delete</div>
                  `;

				// Position the dropdown
				dropdown.style.position = "absolute";
				dropdown.style.top = this.offsetTop + this.offsetHeight + "px";
				dropdown.style.right = "0";
				dropdown.style.backgroundColor = "white";
				dropdown.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
				dropdown.style.borderRadius = "8px";
				dropdown.style.padding = "8px 0";
				dropdown.style.zIndex = "100";

				// Add dropdown items styling
				const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
				dropdownItems.forEach((item) => {
					item.style.padding = "8px 16px";
					item.style.cursor = "pointer";
					item.style.fontSize = "0.9rem";

					item.addEventListener("mouseover", () => {
						item.style.backgroundColor = "#f8f9fa";
					});

					item.addEventListener("mouseout", () => {
						item.style.backgroundColor = "transparent";
					});

					item.addEventListener("click", () => {
						if (item.classList.contains("delete")) {
							if (
								confirm(`Are you sure you want to delete "${contentTitle}"?`)
							) {
								contentCard.remove();
							}
						} else {
							alert(`${item.textContent}: ${contentTitle}`);
						}
						document.body.removeChild(dropdown);
					});
				});

				// Add delete item styling
				const deleteItem = dropdown.querySelector(".delete");
				if (deleteItem) {
					deleteItem.style.color = "#dc3545";
				}

				// Add to body and handle outside clicks
				document.body.appendChild(dropdown);

				const handleOutsideClick = (e) => {
					if (!dropdown.contains(e.target) && e.target !== button) {
						document.body.removeChild(dropdown);
						document.removeEventListener("click", handleOutsideClick);
					}
				};

				// Delay adding the event listener to prevent immediate closing
				setTimeout(() => {
					document.addEventListener("click", handleOutsideClick);
				}, 10);
			});
		});
	}

	// View All buttons
	const viewAllButtons = document.querySelectorAll(
		".view-all-drafts, .view-all-scheduled, .view-analytics"
	);
	if (viewAllButtons.length > 0) {
		viewAllButtons.forEach((button) => {
			button.addEventListener("click", function () {
				if (this.classList.contains("view-all-drafts")) {
					alert("Viewing all draft content");
				} else if (this.classList.contains("view-all-scheduled")) {
					alert("Viewing all scheduled content");
				} else if (this.classList.contains("view-analytics")) {
					window.location.href = "analytics.html";
				}
			});
		});
	}
});

// Function to filter content based on category
function filterContent(category) {
	console.log(`Filtering content by category: ${category}`);

	const articlesSection = document.getElementById("articles");
	const videosSection = document.getElementById("videos");
	const draftSection = document.querySelector(".draft-content");
	const scheduledSection = document.querySelector(".scheduled-content");

	// Show/hide sections based on category
	if (category === "all content") {
		articlesSection.style.display = "block";
		videosSection.style.display = "block";
		draftSection.style.display = "block";
		scheduledSection.style.display = "block";
	} else if (category === "articles") {
		articlesSection.style.display = "block";
		videosSection.style.display = "none";
		draftSection.style.display = "block";
		scheduledSection.style.display = "block";
	} else if (category === "videos") {
		articlesSection.style.display = "none";
		videosSection.style.display = "block";
		draftSection.style.display = "block";
		scheduledSection.style.display = "block";
	} else {
		// Filter by content category (parenting, psychology, etc.)
		articlesSection.style.display = "block";
		videosSection.style.display = "block";
		draftSection.style.display = "block";
		scheduledSection.style.display = "block";

		// In a real app, we would filter the content cards based on their category
		alert(`Filtering content by category: ${category}`);
	}
}

// Function to perform search
function performSearch(query) {
	if (!query.trim()) {
		alert("Please enter a search term");
		return;
	}

	console.log(`Searching for: ${query}`);
	alert(`Searching for: ${query}`);

	// In a real app, this would filter the content based on the search query
}

// Function to show create content modal
function showCreateContentModal() {
	// Create modal overlay
	const modalOverlay = document.createElement("div");
	modalOverlay.className = "modal-overlay";
	modalOverlay.style.position = "fixed";
	modalOverlay.style.top = "0";
	modalOverlay.style.left = "0";
	modalOverlay.style.width = "100%";
	modalOverlay.style.height = "100%";
	modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	modalOverlay.style.display = "flex";
	modalOverlay.style.alignItems = "center";
	modalOverlay.style.justifyContent = "center";
	modalOverlay.style.zIndex = "1000";

	// Create modal content
	const modalContent = document.createElement("div");
	modalContent.className = "modal-content";
	modalContent.style.backgroundColor = "white";
	modalContent.style.borderRadius = "10px";
	modalContent.style.padding = "24px";
	modalContent.style.width = "90%";
	modalContent.style.maxWidth = "500px";
	modalContent.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";

	modalContent.innerHTML = `
          <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="margin: 0;">Create New Content</h3>
              <button class="close-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <div class="modal-body">
              <div style="margin-bottom: 20px;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 500;">Content Type</label>
                  <div style="display: flex; gap: 10px;">
                      <button class="content-type-btn active" data-type="article" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff6f6; cursor: pointer;">Article</button>
                      <button class="content-type-btn" data-type="video" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: white; cursor: pointer;">Video</button>
                  </div>
              </div>
              <div style="margin-bottom: 20px;">
                  <label for="content-title" style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label>
                  <input type="text" id="content-title" placeholder="Enter content title" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
              </div>
              <div style="margin-bottom: 20px;">
                  <label for="content-category" style="display: block; margin-bottom: 8px; font-weight: 500;">Category</label>
                  <select id="content-category" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                      <option value="">Select a category</option>
                      <option value="parenting">Parenting</option>
                      <option value="child-psychology">Child Psychology</option>
                      <option value="health">Health Info & Illness</option>
                      <option value="special-needs">Special Needs</option>
                      <option value="relationships">Relationships</option>
                  </select>
              </div>
          </div>
          <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
              <button class="cancel-btn" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 8px; background-color: white; cursor: pointer;">Cancel</button>
              <button class="create-content-btn" style="padding: 10px 20px; border: none; border-radius: 8px; background-color: #ff9999; color: white; cursor: pointer;">Create Content</button>
          </div>
      `;

	// Append modal to body
	modalOverlay.appendChild(modalContent);
	document.body.appendChild(modalOverlay);

	// Add event listeners
	const closeBtn = modalContent.querySelector(".close-btn");
	const cancelBtn = modalContent.querySelector(".cancel-btn");
	const createContentBtn = modalContent.querySelector(".create-content-btn");
	const contentTypeBtns = modalContent.querySelectorAll(".content-type-btn");

	closeBtn.addEventListener("click", () => {
		document.body.removeChild(modalOverlay);
	});

	cancelBtn.addEventListener("click", () => {
		document.body.removeChild(modalOverlay);
	});

	contentTypeBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			contentTypeBtns.forEach((b) => {
				b.classList.remove("active");
				b.style.backgroundColor = "white";
			});
			btn.classList.add("active");
			btn.style.backgroundColor = "#fff6f6";
		});
	});

	createContentBtn.addEventListener("click", () => {
		const title = document.getElementById("content-title").value;
		const category = document.getElementById("content-category").value;
		const type = modalContent.querySelector(".content-type-btn.active").dataset
			.type;

		if (!title) {
			alert("Please enter a title");
			return;
		}

		if (!category) {
			alert("Please select a category");
			return;
		}

		alert(`Creating new ${type}: "${title}" in category "${category}"`);
		document.body.removeChild(modalOverlay);
	});
}
