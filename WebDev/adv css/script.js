// Sample Data for Comments
let comments = [
    { id: 1, text: "Great article!", timestamp: "2023-10-01T12:00:00Z" },
    { id: 2, text: "Very informative.", timestamp: "2023-10-01T12:30:00Z" },
];

// Render Comments
function renderComments() {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <p>${comment.text}</p>
            <small>${new Date(comment.timestamp).toLocaleString()}</small>
        </div>
    `).join("");
}

// Handle Comment Submission
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newComment = {
        id: Date.now(),
        text: commentInput.value,
        timestamp: new Date().toISOString(),
    };

    // Add new comment to the list
    comments.push(newComment);

    // Clear input
    commentInput.value = "";

    // Re-render comments
    renderComments();
});

// Initialize Comments
renderComments();