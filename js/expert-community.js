document.addEventListener("DOMContentLoaded", () => {
  // Check authentication and expert status
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (isLoggedIn !== "true" || !currentUser) {
    window.location.href = "login.html"
    return
  }

  // If user is not expert, redirect to regular community page
  if (currentUser.role !== "expert") {
    window.location.href = "community.html"
    return
  }

  // Load expert community data
  loadExpertCommunityData(currentUser)

  // Add mobile sidebar toggle
  const contentMain = document.querySelector(".content-main")
  if (contentMain && window.innerWidth <= 768) {
    const mobileSidebarToggle = document.createElement("button")
    mobileSidebarToggle.className = "mobile-sidebar-toggle"
    mobileSidebarToggle.innerHTML = '<i class="fas fa-bars"></i> Show Expert Menu'
    contentMain.insertBefore(mobileSidebarToggle, contentMain.firstChild)

    mobileSidebarToggle.addEventListener("click", function () {
      const sidebar = document.querySelector(".sidebar")
      sidebar.classList.toggle("active")
      this.innerHTML = sidebar.classList.contains("active")
        ? '<i class="fas fa-times"></i> Hide Expert Menu'
        : '<i class="fas fa-bars"></i> Show Expert Menu'
    })
  }

  // Sidebar dropdown toggles
  const dropdownLinks = document.querySelectorAll(".nav-link.dropdown")

  if (dropdownLinks.length > 0) {
    dropdownLinks.forEach((dropdown) => {
      dropdown.addEventListener("click", function () {
        const chevron = this.querySelector(".fa-chevron-up, .fa-chevron-down")
        if (chevron) {
          chevron.classList.toggle("fa-chevron-up")
          chevron.classList.toggle("fa-chevron-down")
        }

        const nextElements = []
        let nextElement = this.parentElement.nextElementSibling

        while (nextElement && nextElement.classList.contains("indent")) {
          nextElements.push(nextElement)
          nextElement = nextElement.nextElementSibling
        }

        nextElements.forEach((element) => {
          element.style.display = element.style.display === "none" ? "block" : "none"
        })
      })
    })
  }

  // Section header dropdowns
  const sectionHeaders = document.querySelectorAll(".section-header.dropdown")

  if (sectionHeaders.length > 0) {
    sectionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const chevron = this.querySelector(".fa-chevron-up, .fa-chevron-down")
        if (chevron) {
          chevron.classList.toggle("fa-chevron-up")
          chevron.classList.toggle("fa-chevron-down")
        }

        const content = this.nextElementSibling
        if (content) {
          content.style.display = content.style.display === "none" ? "block" : "none"
        }

        const list = this.parentElement.querySelector(".community-list")
        if (list) {
          list.style.display = list.style.display === "none" ? "block" : "none"
        }
      })
    })
  }

  // Category filter buttons
  const categoryButtons = document.querySelectorAll(".category-btn")

  if (categoryButtons.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        categoryButtons.forEach((btn) => btn.classList.remove("active"))

        this.classList.add("active")

        const category = this.textContent.trim().toLowerCase()
        filterContent(category)
      })
    })
  }

  // Search functionality
  const searchInput = document.querySelector(".search-container input")
  const searchButton = document.querySelector(".search-btn")

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      performSearch(searchInput.value)
    })

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value)
      }
    })
  }

  // Expert action buttons
  const answerButtons = document.querySelectorAll(".answer-btn")
  const consultButtons = document.querySelectorAll(".consult-btn")

  if (answerButtons.length > 0) {
    answerButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (this.textContent.includes("Answer Question")) {
          answerQuestion(this)
        } else if (this.textContent.includes("Answer Questions")) {
          viewCommunityQuestions(this)
        }
      })
    })
  }

  if (consultButtons.length > 0) {
    consultButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (this.textContent.includes("Offer Consultation")) {
          offerConsultation(this)
        } else if (this.textContent.includes("View Community")) {
          viewCommunity(this)
        }
      })
    })
  }

  // Load more content button
  const loadMoreBtn = document.querySelector(".load-more-btn")

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      loadMoreCommunities()
    })
  }

  // Add expertise button
  const addExpertiseBtn = document.querySelector(".create-btn.expert")

  if (addExpertiseBtn) {
    addExpertiseBtn.addEventListener("click", () => {
      addExpertise()
    })
  }
})

// Expert-specific functions
function answerQuestion(button) {
  const questionCard = button.closest(".community-card")
  const questionTitle = questionCard.querySelector("h5").textContent

  const answer = prompt(`Provide your expert answer for: "${questionTitle}"`)
  if (answer) {
    alert("Answer submitted successfully!")

    // Mark question as answered
    button.textContent = "Answered"
    button.style.backgroundColor = "#6c757d"
    button.disabled = true
  }
}

function offerConsultation(button) {
  const questionCard = button.closest(".community-card")
  const questionTitle = questionCard.querySelector("h5").textContent

  const consultationType = prompt(
    `Offer consultation for: "${questionTitle}"\n\nChoose type:\n1. Video Call\n2. Phone Call\n3. Message Consultation\n\nEnter 1, 2, or 3:`,
  )

  if (consultationType) {
    alert("Consultation offer sent to parent!")
    button.textContent = "Consultation Offered"
    button.style.backgroundColor = "#6c757d"
  }
}

function viewCommunityQuestions(button) {
  const communityCard = button.closest(".community-card")
  const communityName = communityCard.querySelector("h5").textContent

  alert(`Opening questions for ${communityName}...`)
}

function viewCommunity(button) {
  const communityCard = button.closest(".community-card")
  const communityName = communityCard.querySelector("h5").textContent

  alert(`Opening ${communityName} community...`)
}

function addExpertise() {
  const expertise = prompt("Enter your new area of expertise:")
  if (expertise) {
    alert(`Added "${expertise}" to your expertise areas!`)
  }
}

// Function to filter content based on category
function filterContent(category) {
  console.log(`Filtering content by category: ${category}`)

  const questionCards = document.querySelectorAll(".community-card.expert-question")
  const communityCards = document.querySelectorAll(".community-card:not(.expert-question)")

  if (category === "all") {
    // Show all content
    questionCards.forEach((card) => (card.style.display = "block"))
    communityCards.forEach((card) => (card.style.display = "block"))
  } else if (category === "pending questions") {
    // Show only questions
    questionCards.forEach((card) => (card.style.display = "block"))
    communityCards.forEach((card) => (card.style.display = "none"))
  } else if (category === "my communities") {
    // Show only communities
    questionCards.forEach((card) => (card.style.display = "none"))
    communityCards.forEach((card) => (card.style.display = "block"))
  } else {
    alert(`Filtering by: ${category}`)
  }
}

// Function to perform search
function performSearch(query) {
  if (!query.trim()) {
    alert("Please enter a search term")
    return
  }

  console.log(`Searching for: ${query}`)
  alert(`Searching for: "${query}"`)
}

// Function to load more communities
function loadMoreCommunities() {
  console.log("Loading more communities...")

  const loadMoreBtn = document.querySelector(".load-more-btn")

  if (loadMoreBtn) {
    loadMoreBtn.textContent = "Loading..."
    loadMoreBtn.disabled = true

    setTimeout(() => {
      loadMoreBtn.textContent = "No more communities to load"
    }, 1500)
  }
}

// Navigation functions
function goToDashboard() {
  window.location.href = "expert-dashboard.html"
}

function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("currentUser")
  window.location.href = "../index.html"
}

function loadExpertCommunityData(user) {
  // Update profile info in navigation
  const userName = document.getElementById("user-name")
  const userEmail = document.getElementById("user-email")

  if (userName) userName.textContent = `${user.firstName} ${user.lastName}`
  if (userEmail) userEmail.textContent = user.email

  console.log("Loading expert community data for:", user.firstName)
}
