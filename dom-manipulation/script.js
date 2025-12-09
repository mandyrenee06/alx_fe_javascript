// Initial quotes
let quotes = [
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categorySelect = document.getElementById("categorySelect");

// Populate categories dynamically
function loadCategories() {
  // Get unique categories
  const categories = [...new Set(quotes.map(q => q.category))];

  // Clear dropdown to avoid duplicates
  categorySelect.innerHTML = "";

  // Add categories to dropdown
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Show random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;

  // Filter quotes by category
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  // Pick a random quote
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  // Update display
  quoteDisplay.textContent = `"${randomQuote.text}" — (${randomQuote.category})`;
}

// Add new quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both a quote and category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text: newText, category: newCategory });

  // Update category dropdown
  loadCategories();

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Load categories on start
loadCategories();
