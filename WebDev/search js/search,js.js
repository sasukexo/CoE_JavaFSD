// Sample Data for News Articles
const newsData = [
    { title: "Tech Breakthrough", category: "technology", author: "John Doe", tags: ["AI", "Innovation"] },
    { title: "Stock Market Update", category: "business", author: "Jane Smith", tags: ["Finance", "Economy"] },
    { title: "New Health Guidelines", category: "health", author: "Alice Johnson", tags: ["Wellness", "Fitness"] },
    { title: "Latest Gadgets", category: "technology", author: "John Doe", tags: ["Gadgets", "Tech"] },
    { title: "Business Trends", category: "business", author: "Jane Smith", tags: ["Startups", "Economy"] },
    { title: "Healthy Eating Tips", category: "health", author: "Alice Johnson", tags: ["Nutrition", "Wellness"] },
];

// Function to Render News Articles
function renderNews(articles, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = articles.map(article => `
        <article class="news-item">
            <h3>${article.title}</h3>
            <p>Category: ${article.category}</p>
            <p>Author: ${article.author}</p>
            <p>Tags: ${article.tags.join(", ")}</p>
        </article>
    `).join("");
}

// Initialize with All Articles
renderNews(newsData, "latestNewsGrid");
renderNews(newsData, "categoryNewsGrid");

// Tab Functionality
const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to the clicked button
        button.classList.add("active");

        // Filter articles by category
        const category = button.getAttribute("data-category");
        const filteredArticles = category === "all" 
            ? newsData 
            : newsData.filter(article => article.category === category);
        renderNews(filteredArticles, "categoryNewsGrid");
    });
});

// Search Functionality
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filteredArticles = newsData.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
    );
    renderNews(filteredArticles, "latestNewsGrid");
});