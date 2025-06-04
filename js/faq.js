document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item")

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header")

    header.addEventListener("click", () => {
      item.classList.toggle("active")
    })
  })

  // Search functionality
  const searchInput = document.getElementById("faq-search-input")
  const searchButton = document.getElementById("faq-search-btn")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      accordionItems.forEach((item) => {
        item.style.display = "block"
        item.classList.remove("active")
      })
      return
    }

    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header h3").textContent.toLowerCase()
      const content = item.querySelector(".accordion-content").textContent.toLowerCase()

      if (header.includes(searchTerm) || content.includes(searchTerm)) {
        item.style.display = "block"
        item.classList.add("active")

        // Scroll to the first match
        if (item === document.querySelector('.accordion-item[style="display: block;"]')) {
          item.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      } else {
        item.style.display = "none"
      }
    })
  }

  searchButton.addEventListener("click", performSearch)

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
