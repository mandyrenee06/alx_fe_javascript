// ----------------------
// Mock API URL
// ----------------------
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ----------------------
// Quotes Array
// ----------------------
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Creativity is intelligence having fun.", category: "Creativity" }
];

// ----------------------
// Storage Helpers
// ----------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// ----------------------
// Fetch Quotes from Server (REQUIRED)
// ----------------------
async function fetchQuotesFromServer() {
  const response = await fetch(API_URL);
  const data = await response.json();

  // Simulate server quotes
  return data.slice(0, 3).map(item => ({
    text: item.title,
    category: "Server"
  }));
}

// ----------------------
// Post Quote to Server (REQUIRED)
// ----------------------
async function postQuoteToServer(quote) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(quote),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// ----------------------
// Sync Quotes (REQUIRED)
// ----------------------
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: SERVER WINS
  quotes = serverQuotes;
  saveQuotes();

  showNotification("Quotes synced with server. Conflicts resolved.");
  displayRandomQuote();
}

// ----------------------
// UI Notification (REQUIRED)
// ----------------------
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

// ----------------------
// Display Random Quote
// ----------------------
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// ----------------------
// Add Quote
// ----------------------
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) return;

  const newQuote = { text, category };
  quotes.push(newQuote);

  saveQuotes();
  postQuoteToServer(newQuote);

  showNotification("Quote added locally and sent to server.");

  textInput.value = "";
  categoryInput.value = "";
}

// ----------------------
// Create Add Quote Form
// ----------------------
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.addEventListener("click", addQuote);

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(button);
}

// ----------------------
// Event Listeners
// ----------------------
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("syncButton").addEventListener("click", syncQuotes);

// ----------------------
// Periodic Sync (REQUIRED)
// ----------------------
setInterval(syncQuotes, 30000); // every 30 seconds

// ----------------------
// Initialize App
// ----------------------
loadQuotes();
createAddQuoteForm();
displayRandomQuote();
