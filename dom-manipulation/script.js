let quotes = [
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categorySelect = document.getElementById("categorySelect");

function loadCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}
function showRandomQuote() {
  const selectedCategory = categorySelect.value;

  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  quoteDisplay.textContent = `"${randomQuote.text}" — (${randomQuote.category})`;
}
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both a quote and category.");
    return;
  }
  quotes.push({ text: newText, category: newCategory });
  loadCategories();
  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
loadCategories();
