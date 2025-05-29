document.addEventListener("DOMContentLoaded", function () {
	// Video Player Functionality
	const videoPlayer = document.querySelector(".video-player");
	const playButton = document.querySelector(".play-button");
	const videoThumbnail = document.querySelector(".video-thumbnail");

	if (playButton && videoPlayer) {
		playButton.addEventListener("click", function () {
			const videoElement = document.createElement("video");
			videoElement.src = "https://example.com/video.mp4"; // Replace with actual video URL
			videoElement.controls = true;
			videoElement.autoplay = true;
			videoElement.className = "video-thumbnail";

			// Replace thumbnail with video
			videoPlayer.removeChild(videoThumbnail);
			videoPlayer.removeChild(playButton);
			videoPlayer.appendChild(videoElement);
		});
	}

	// Interaction Bar Functionality
	const likeBtn = document.querySelector(".like-btn");
	const dislikeBtn = document.querySelector(".dislike-btn");
	const shareBtn = document.querySelector(".share-btn");
	const bookmarkBtn = document.querySelector(".bookmark-btn");
	const commentBtn = document.querySelector(".comment-btn");

	// Like Button
	if (likeBtn) {
		likeBtn.addEventListener("click", function () {
			toggleActive(likeBtn);
			const likeCount = likeBtn.nextElementSibling;
			if (likeBtn.classList.contains("active")) {
				likeCount.textContent = parseInt(likeCount.textContent) + 1;
			} else {
				likeCount.textContent = parseInt(likeCount.textContent) - 1;
			}
		});
	}

	// Dislike Button
	if (dislikeBtn) {
		dislikeBtn.addEventListener("click", function () {
			toggleActive(dislikeBtn);
			const dislikeCount = dislikeBtn.nextElementSibling;
			if (dislikeBtn.classList.contains("active")) {
				dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
			} else {
				dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
			}
		});
	}

	// Share Button
	if (shareBtn) {
		shareBtn.addEventListener("click", function () {
			if (navigator.share) {
				navigator
					.share({
						title: document.querySelector(".video-title").textContent,
						text:
							document
								.querySelector(".video-description")
								.textContent.substring(0, 100) + "...",
						url: window.location.href,
					})
					.catch((error) => console.log("Error sharing:", error));
			} else {
				alert("Share this content: " + window.location.href);
			}
		});
	}

	// Bookmark Button
	if (bookmarkBtn) {
		bookmarkBtn.addEventListener("click", function () {
			toggleActive(bookmarkBtn);
			if (bookmarkBtn.classList.contains("active")) {
				bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
			} else {
				bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
			}
		});
	}

	// Comment Button scroll to comments section
	if (commentBtn) {
		commentBtn.addEventListener("click", function () {
			const commentsSection = document.querySelector(".comments-section");
			commentsSection.scrollIntoView({ behavior: "smooth" });

			const commentTextarea = document.querySelector(
				".comment-input-container textarea"
			);
			setTimeout(() => {
				commentTextarea.focus();
			}, 500);
		});
	}

	// Comment Functionality
	const commentForm = document.querySelector(".comment-form");
	const commentTextarea = document.querySelector(
		".comment-input-container textarea"
	);
	const commentSubmitBtn = document.querySelector(".comment-btn");
	const cancelBtn = document.querySelector(".cancel-btn");
	const commentsSection = document.querySelector(".comments-section");

	// Show/hide comment actions based on input focus
	if (commentTextarea) {
		commentTextarea.addEventListener("focus", function () {
			commentForm.classList.add("active");
		});

		if (cancelBtn) {
			cancelBtn.addEventListener("click", function () {
				commentTextarea.value = "";
				commentForm.classList.remove("active");
			});
		}

		if (commentSubmitBtn) {
			commentSubmitBtn.addEventListener("click", function () {
				const commentText = commentTextarea.value.trim();
				if (commentText) {
					addNewComment(commentText);
					commentTextarea.value = "";
					commentForm.classList.remove("active");

					// Update comment count
					const commentCount = document.querySelector(".comments-section h3");
					const currentCount = parseInt(
						commentCount.textContent.match(/\d+/)[0]
					);
					commentCount.textContent = `Comments (${currentCount + 1})`;
				}
			});
		}
	}

	// Sort Comments
	const sortBtns = document.querySelectorAll(".sort-btn");
	if (sortBtns) {
		sortBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				sortBtns.forEach((b) => b.classList.remove("active"));

				this.classList.add("active");

				console.log(`Sorting by: ${this.textContent}`);
			});
		});
	}

	// Comment Actions (Like, Dislike, Reply)
	const commentLikeBtns = document.querySelectorAll(".comment-like-btn");
	const commentDislikeBtns = document.querySelectorAll(".comment-dislike-btn");
	const commentReplyBtns = document.querySelectorAll(".comment-reply-btn");

	// Comment Like Buttons
	if (commentLikeBtns) {
		commentLikeBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				toggleActive(btn);
				const likeCount = btn.querySelector("span");
				if (btn.classList.contains("active")) {
					likeCount.textContent = parseInt(likeCount.textContent) + 1;
				} else {
					likeCount.textContent = parseInt(likeCount.textContent) - 1;
				}
			});
		});
	}

	// Comment Dislike Buttons
	if (commentDislikeBtns) {
		commentDislikeBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				toggleActive(btn);
				const dislikeCount = btn.querySelector("span");
				if (btn.classList.contains("active")) {
					dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
				} else {
					dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
				}
			});
		});
	}

	// Comment Reply Buttons
	if (commentReplyBtns) {
		commentReplyBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				const comment = btn.closest(".comment");
				const authorName = comment.querySelector(
					".comment-author-name"
				).textContent;

				commentTextarea.focus();
				commentTextarea.value = `@${authorName} `;
			});
		});
	}

	// Load More Content
	const loadMoreBtn = document.querySelector(".load-more-btn");
	if (loadMoreBtn) {
		loadMoreBtn.addEventListener("click", function () {
			this.textContent = "Loading...";

			setTimeout(() => {
				this.textContent = "Load more content";
				alert("In a real application, more content would be loaded here.");
			}, 1000);
		});
	}

	// Helper Functions
	function toggleActive(element) {
		element.classList.toggle("active");
	}

	function addNewComment(text) {
		const now = new Date();

		// Create new comment element
		const newComment = document.createElement("div");
		newComment.className = "comment";

		newComment.innerHTML = `
            <div class="comment-header">
                <div class="comment-author">
                    <img src="/assets/pp.svg" alt="User" class="user-img">
                    <div class="comment-author-info">
                        <span class="comment-author-name">Current User</span>
                        <span class="comment-time">Just now</span>
                    </div>
                </div>
                <button class="more-btn">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
            <div class="comment-content">
                <p>${text}</p>
            </div>
            <div class="comment-actions">
                <button class="comment-like-btn">
                    <i class="far fa-thumbs-up"></i>
                    <span>0</span>
                </button>
                <button class="comment-dislike-btn">
                    <i class="far fa-thumbs-down"></i>
                    <span>0</span>
                </button>
                <button class="comment-reply-btn">Reply</button>
            </div>
        `;

		// Add event listeners to the new comment buttons
		const newCommentLikeBtn = newComment.querySelector(".comment-like-btn");
		const newCommentDislikeBtn = newComment.querySelector(
			".comment-dislike-btn"
		);
		const newCommentReplyBtn = newComment.querySelector(".comment-reply-btn");

		newCommentLikeBtn.addEventListener("click", function () {
			toggleActive(this);
			const likeCount = this.querySelector("span");
			if (this.classList.contains("active")) {
				likeCount.textContent = parseInt(likeCount.textContent) + 1;
			} else {
				likeCount.textContent = parseInt(likeCount.textContent) - 1;
			}
		});

		newCommentDislikeBtn.addEventListener("click", function () {
			toggleActive(this);
			const dislikeCount = this.querySelector("span");
			if (this.classList.contains("active")) {
				dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
			} else {
				dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
			}
		});

		newCommentReplyBtn.addEventListener("click", function () {
			commentTextarea.focus();
			commentTextarea.value = `@Current User `;
		});

		// Insert the new comment at the top of the comments section after the sort options
		const sortOptions = document.querySelector(".sort-options");
		commentsSection.insertBefore(newComment, sortOptions.nextSibling);
	}
});
