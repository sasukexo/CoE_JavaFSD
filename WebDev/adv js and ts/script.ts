// Define Types
type Multimedia = {
    type: "image" | "video";
    url: string;
    caption: string;
};

type comment = {
    id: number;
    text: string;
    timestamp: string;
};

type Article = {
    id: number;
    title: string;
    content: string;
    multimedia: Multimedia[];
    comments: Comment[];
};

// Fetch Articles from JSON
async function fetchArticles(): Promise<Article[]> {
    const response = await fetch("articles.json");
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }
    return response.json();
}

// Render Multimedia Content
function renderMultimedia(multimedia: Multimedia[], containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = multimedia.map(item => `
        <div class="multimedia-item">
            ${item.type === "image" 
                ? `<img src="${item.url}" alt="${item.caption}">` 
                : `<video controls><source src="${item.url}" type="video/mp4">${item.caption}</video>`
            }
            <p>${item.caption}</p>
        </div>
    `).join("");
}

// Render Comments
function renderComments(comments: Comment[], containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <p>${comment.text}</p>
            <small>${new Date(comment.timestamp).toLocaleString()}</small>
        </div>
    `).join("");
}

// Handle Comment Submission
function setupCommentForm(articleId: number) {
    const form = document.getElementById("commentForm") as HTMLFormElement;
    const input = document.getElementById("commentInput") as HTMLTextAreaElement;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newComment: Comment = {
            id: Date.now(),
            text: input.value,
            timestamp: new Date().toISOString(),
        };

        // Simulate adding comment to the server
        console.log("New Comment:", newComment);

        // Clear input
        input.value = "";

        // Re-render comments
        const articles = await fetchArticles();
        const article = articles.find(article => article.id === articleId);
        if (article) {
            article.comments.push(newComment);
            renderComments(article.comments, "commentsList");
        }
    });
}

// Initialize Page
async function initializePage() {
    try {
        const articles = await fetchArticles();
        const article = articles[0]; // Display the first article for demonstration

        // Render Multimedia Content
        renderMultimedia(article.multimedia, "multimediaContent");

        // Render Comments
        renderComments(article.comments, "commentsList");

        // Setup Comment Form
        setupCommentForm(article.id);
    } catch (error) {
        console.error("Error initializing page:", error);
    }
}

// Run Initialization
initializePage();