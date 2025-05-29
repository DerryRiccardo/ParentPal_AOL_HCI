document.addEventListener('DOMContentLoaded', function() { 
    // Add mobile sidebar toggle button
    const contentMain = document.querySelector('.content-main');
    if (contentMain && window.innerWidth <= 768) {
        const mobileSidebarToggle = document.createElement('button');
        mobileSidebarToggle.className = 'mobile-sidebar-toggle';
        mobileSidebarToggle.innerHTML = '<i class="fas fa-bars"></i> Show Communities Menu';
        contentMain.insertBefore(mobileSidebarToggle, contentMain.firstChild);
        
        mobileSidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
            this.textContent = sidebar.classList.contains('active') ? 'Hide Communities Menu' : 'Show Communities Menu';
        });
    }

    // Sidebar dropdown toggles
    const dropdownLinks = document.querySelectorAll('.nav-link.dropdown');
    
    if (dropdownLinks.length > 0) {
        dropdownLinks.forEach(dropdown => {
            dropdown.addEventListener('click', function() {
                const chevron = this.querySelector('.fa-chevron-up, .fa-chevron-down');
                if (chevron) {
                    chevron.classList.toggle('fa-chevron-up');
                    chevron.classList.toggle('fa-chevron-down');
                }
                
                const nextElements = [];
                let nextElement = this.parentElement.nextElementSibling;
                
                while (nextElement && nextElement.classList.contains('indent')) {
                    nextElements.push(nextElement);
                    nextElement = nextElement.nextElementSibling;
                }
                
                nextElements.forEach(element => {
                    element.style.display = element.style.display === 'none' ? 'block' : 'none';
                });
            });
        });
    }

    // Section header dropdowns
    const sectionHeaders = document.querySelectorAll('.section-header.dropdown');
    
    if (sectionHeaders.length > 0) {
        sectionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const chevron = this.querySelector('.fa-chevron-up, .fa-chevron-down');
                if (chevron) {
                    chevron.classList.toggle('fa-chevron-up');
                    chevron.classList.toggle('fa-chevron-down');
                }
                
                const content = this.nextElementSibling;
                if (content) {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                }
                
                const list = this.parentElement.querySelector('.community-list');
                if (list) {
                    list.style.display = list.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    }

    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                const category = this.textContent.trim().toLowerCase();
                filterCommunities(category);
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

    // Join community buttons
    const joinButtons = document.querySelectorAll('.join-btn');
    
    if (joinButtons.length > 0) {
        joinButtons.forEach(button => {
            button.addEventListener('click', function() {
                const communityName = this.closest('.card-content').querySelector('h3').textContent;
                
                // Toggle join/leave status
                if (this.textContent === 'Join Community') {
                    this.textContent = 'Leave Community';
                    this.style.backgroundColor = '#666';
                    alert(`You have joined the "${communityName}" community!`);
                } else {
                    this.textContent = 'Join Community';
                    this.style.backgroundColor = 'var(--primary-color)';
                    alert(`You have left the "${communityName}" community.`);
                }
            });
        });
    }

    // Load more content button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreCommunities();
        });
    }

    // Create community button
    const createCommunityBtn = document.querySelector('.create-btn');
    
    if (createCommunityBtn) {
        createCommunityBtn.addEventListener('click', function() {
            alert('Create Community functionality coming soon!');
        });
    }
});

// Function to filter communities based on category
function filterCommunities(category) {
    console.log(`Filtering communities by category: ${category}`);

    const communityCards = document.querySelectorAll('.community-card');
    
    if (category === 'all') {
        // Show all communities
        communityCards.forEach(card => {
            card.style.display = 'block';
        });
    } else {
        alert(`Filtering by: ${category}`);   
    }
}

// Function to perform search
function performSearch(query) {
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }
    
    console.log(`Searching for: ${query}`);
    
    alert(`Searching for communities with: "${query}"`);
    
    const communityCards = document.querySelectorAll('.community-card');
    let results = 0;
    
    communityCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.description').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = 'block';
            results++;
        } else {
            card.style.display = 'none';
        }
    });
    
    console.log(`Found ${results} communities matching "${query}"`);
}

// Function to load more communities
function loadMoreCommunities() {
    console.log('Loading more communities...');
    
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.textContent = 'No more communities to load';
        }, 1500);
    }
}