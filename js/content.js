document.addEventListener('DOMContentLoaded', function() {
    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                const category = this.textContent.trim().toLowerCase();
                filterContent(category);
            });
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // Load more content button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreContent();
        });
    }

    // Play video functionality (placeholder)
    // const videoCards = document.querySelectorAll('.video-card');
    
    // if (videoCards.length > 0) {
    //     videoCards.forEach(card => {
    //         card.addEventListener('click', function() {
    //             const videoTitle = this.querySelector('h4').textContent;
    //             alert(`Playing video: ${videoTitle}`);
    //             // Here you would actually implement video playing functionality
    //         });
    //     });
    // }
    
    // Read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    if (readMoreButtons.length > 0) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const articleTitle = this.closest('.article-content').querySelector('h3').textContent;
                alert(`Opening full article: ${articleTitle}`);
            });
        });
    }
});

// Function to filter content based on category
function filterContent(category) {
    console.log(`Filtering content by category: ${category}`);
    
    // Placeholder for demonstration
    if (category === 'all articles') {
        document.getElementById('articles').style.display = 'block';
        document.getElementById('videos').style.display = 'block';
        document.querySelector('.more-content').style.display = 'block';
    } else if (category === 'videos') {
        document.getElementById('articles').style.display = 'none';
        document.getElementById('videos').style.display = 'block';
        document.querySelector('.more-content').style.display = 'none';
    } else {
        document.getElementById('articles').style.display = 'block';
        document.getElementById('videos').style.display = 'block';
        document.querySelector('.more-content').style.display = 'block';
    }
}

// Function to perform search
function performSearch(query) {
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }
    
    console.log(`Searching for: ${query}`);
    
    alert(`Searching for: ${query}`);
}

// Function to load more content
function loadMoreContent() {
    console.log('Loading more content...');

    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        

        setTimeout(() => {
            loadMoreBtn.textContent = 'No more content to load';
        }, 1500);
    }
}