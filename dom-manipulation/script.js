let quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "Life" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Inspiration" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Perseverance" },
    { text: "Whoever is happy will make others happy too.", author: "Anne Frank", category: "Happiness" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi", category: "Wisdom" },
    { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa", category: "Love" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt", category: "Courage" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Adventure" }
];

// Extract unique categories from quotes
let categories = [...new Set(quotes.map(quote => quote.category))];

// Current active filter
let currentFilter = "All";

// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const quotesList = document.getElementById('quotesList');

// Function to display a random quote
function showRandomQuote() {
    let filteredQuotes = quotes;
    
    // Filter quotes if a specific category is selected
    if (currentFilter !== "All") {
        filteredQuotes = quotes.filter(quote => quote.category === currentFilter);
    }
    
    // If no quotes in filtered list, show all quotes
    if (filteredQuotes.length === 0) {
        filteredQuotes = quotes;
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
    // Clear display
    quoteDisplay.innerHTML = '';
    
    // Create quote elements using DOM manipulation
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${randomQuote.text}"`;
    
    const quoteAuthor = document.createElement('div');
    quoteAuthor.style.marginTop = '10px';
    quoteAuthor.style.fontWeight = '600';
    quoteAuthor.style.color = '#6a11cb';
    quoteAuthor.textContent = randomQuote.author ? `— ${randomQuote.author}` : "— Unknown";
    
    const quoteCategory = document.createElement('div');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = randomQuote.category;
    
    // Append to display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteAuthor);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to create category filter buttons
function createCategoryFilters() {
    // Clear existing buttons
    categoryFilter.innerHTML = '';
    
    // Create "All" button
    const allBtn = document.createElement('button');
    allBtn.className = `category-btn ${currentFilter === "All" ? 'active' : ''}`;
    allBtn.textContent = "All";
    allBtn.addEventListener('click', () => {
        setActiveFilter("All");
        showRandomQuote();
    });
    categoryFilter.appendChild(allBtn);
    
    // Create buttons for each category
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${currentFilter === category ? 'active' : ''}`;
        btn.textContent = category;
        btn.addEventListener('click', () => {
            setActiveFilter(category);
            showRandomQuote();
        });
        categoryFilter.appendChild(btn);
    });
}

// Function to set active filter
function setActiveFilter(category) {
    currentFilter = category;
    
    // Update active class on buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Function to display recent quotes
function displayRecentQuotes() {
    // Clear list
    quotesList.innerHTML = '';
    
    // Show last 5 quotes added (most recent first)
    const recentQuotes = [...quotes].reverse().slice(0, 5);
    
    if (recentQuotes.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.textContent = "No quotes yet. Add your first quote!";
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = '#666';
        emptyMsg.style.padding = '20px';
        quotesList.appendChild(emptyMsg);
        return;
    }
    
    recentQuotes.forEach(quote => {
        const quoteItem = document.createElement('div');
        quoteItem.className = 'quote-item';
        
        const quoteText = document.createElement('div');
        quoteText.textContent = `"${quote.text}"`;
        quoteText.style.fontStyle = 'italic';
        quoteText.style.marginBottom = '8px';
        
        const quoteMeta = document.createElement('div');
        quoteMeta.style.display = 'flex';
        quoteMeta.style.justifyContent = 'space-between';
        quoteMeta.style.fontSize = '0.9rem';
        quoteMeta.style.color = '#666';
        
        const quoteAuthor = document.createElement('span');
        quoteAuthor.textContent = quote.author || "Anonymous";
        
        const quoteCategory = document.createElement('span');
        quoteCategory.textContent = quote.category;
        quoteCategory.style.backgroundColor = '#eef2ff';
        quoteCategory.style.padding = '2px 8px';
        quoteCategory.style.borderRadius = '10px';
        quoteCategory.style.fontSize = '0.8rem';
        
        quoteMeta.appendChild(quoteAuthor);
        quoteMeta.appendChild(quoteCategory);
        
        quoteItem.appendChild(quoteText);
        quoteItem.appendChild(quoteMeta);
        
        quotesList.appendChild(quoteItem);
    });
}

// Function to populate category dropdown
function populateCategoryDropdown() {
    const categorySelect = document.getElementById('newQuoteCategory');
    
    // Clear existing options
    categorySelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a category';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);
    
    // Add each category as option
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Initialize the application
function initializeApp() {
    // Show initial random quote
    showRandomQuote();
    
    // Create category filters
    createCategoryFilters();
    
    // Display recent quotes
    displayRecentQuotes();
    
    // Populate category dropdown
    populateCategoryDropdown();
    
    // Event listener for new quote button
    newQuoteBtn.addEventListener('click', showRandomQuote);
    
    // Event listener for add quote button (Step 3 functionality)
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    
    // Allow Enter key to submit form
    document.getElementById('newQuoteText').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addQuote();
        }
    });
}

// Call initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
// Step 3: Dynamic Quote Addition Function
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteAuthor = document.getElementById('newQuoteAuthor').value.trim();
    const categorySelect = document.getElementById('newQuoteCategory');
    const customCategory = document.getElementById('customCategory').value.trim();
    
    // Validate input
    if (!quoteText) {
        alert("Please enter a quote!");
        document.getElementById('newQuoteText').focus();
        return;
    }
    
    // Determine category
    let category;
    if (customCategory) {
        category = customCategory;
    } else if (categorySelect.value) {
        category = categorySelect.value;
    } else {
        alert("Please select a category or create a new one!");
        return;
    }
    
    // Create new quote object
    const newQuote = {
        text: quoteText,
        author: quoteAuthor || "Anonymous",
        category: category
    };
    
    // Add to quotes array
    quotes.push(newQuote);
    
    // Add to categories if new
    if (!categories.includes(category)) {
        categories.push(category);
        
        // Update category filters
        createCategoryFilters();
        
        // Update category dropdown
        populateCategoryDropdown();
    }
    
    // Clear form
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteAuthor').value = '';
    document.getElementById('customCategory').value = '';
    categorySelect.selectedIndex = 0;
    
    // Update displays
    showRandomQuote();
    displayRecentQuotes();
    
    // Show success message
    alert("Quote added successfully!");
    
    // Save to localStorage if available
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('dynamicQuotes', JSON.stringify(quotes));
        localStorage.setItem('dynamicCategories', JSON.stringify(categories));
    }
}

// Load saved quotes from localStorage on page load
function loadSavedQuotes() {
    if (typeof(Storage) !== "undefined") {
        const savedQuotes = localStorage.getItem('dynamicQuotes');
        const savedCategories = localStorage.getItem('dynamicCategories');
        
        if (savedQuotes) {
            quotes = JSON.parse(savedQuotes);
        }
        
        if (savedCategories) {
            categories = JSON.parse(savedCategories);
        }
    }
}

// Update the initializeApp function to load saved quotes
function initializeApp() {
    // Load saved quotes
    loadSavedQuotes();
    
    // Show initial random quote
    showRandomQuote();
    
    // Create category filters
    createCategoryFilters();
    
    // Display recent quotes
    displayRecentQuotes();
    
    // Populate category dropdown
    populateCategoryDropdown();
    
    // Event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    
    // Enter key support
    document.getElementById('newQuoteText').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addQuote();
        }
    });
}
