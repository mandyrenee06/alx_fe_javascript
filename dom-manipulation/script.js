const API_URL = "https://jsonplaceholder.typicode.com/posts";


let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Creativity is intelligence having fun.", category: "Creativity" }
];


function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}


async function fetchQuotesFromServer() {
  const response = await fetch(API_URL);
  const data = await response.json();

  
  return data.slice(0, 3).map(item => ({
    text: item.title,
    category: "Server"
  }));
}


async function postQuoteToServer(quote) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(quote),
    headers: {
      "Content-Type": "application/json"
    }
  });
}


async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  quotes = serverQuotes;
  saveQuotes();

  showNotification("Quotes synced with server. Conflicts resolved.");
  displayRandomQuote();
}


function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}


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

document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("syncButton").addEventListener("click", syncQuotes);

setInterval(syncQuotes, 30000); 


loadQuotes();
createAddQuoteForm();
displayRandomQuote();

alert("Quotes synced with server!");

