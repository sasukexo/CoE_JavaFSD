// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Tab Functionality
    const tabs = document.querySelectorAll('.tab-button');
    const categoryArticles = document.getElementById('category-articles');

    const articlesData = {
        politics: [
            { title: 'Political News 1', description: 'Description of political news 1...' },
            { title: 'Political News 2', description: 'Description of political news 2...' }
        ],
        sports: [
            { title: 'Sports News 1', description: 'Description of sports news 1...' },
            { title: 'Sports News 2', description: 'Description of sports news 2...' }
        ],
        tech: [
            { title: 'Tech News 1', description: 'Description of tech news 1...' },
            { title: 'Tech News 2', description: 'Description of tech news 2...' }
        ]
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            loadCategoryArticles(category);
        });
    });

    function loadCategoryArticles(category) {
        const articles = articlesData[category];
        categoryArticles.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="#" class="read-more">Read More</a>
            `;
            categoryArticles.appendChild(articleElement);
        });
    }

    // Load default category articles
    loadCategoryArticles('politics');

    // Search Functionality
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const allArticles = document.querySelectorAll('.articles article');
        allArticles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });

    // Comment Functionality
    const commentForm = document.getElementById('comment-form');
    const commentSection = document.getElementById('comment-section');

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = commentText;
            commentSection.appendChild(commentElement);
            commentInput.value = '';
        }
    });
});