// Initial quotes array
let quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Dream big and dare to fail."
];

// Function to show a random quote
function showNewQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteDisplay").textContent = quotes[randomIndex];
}

// REQUIRED: Function named addQuote
function addQuote(newQuote) {
  if (newQuote.trim() === "") return;

  quotes.push(newQuote);

  // Update DOM after adding
  document.getElementById("quoteDisplay").textContent = newQuote;
}

// REQUIRED: createAddQuoteForm()
function createAddQuoteForm() {
  const container = document.getElementById("addQuoteContainer");

  // Create input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter a new quote";
  input.id = "quoteInput";

  // Create button
  const btn = document.createElement("button");
  btn.textContent = "Add Quote";
  btn.id = "addQuoteBtn";

  // Add event listener to button
  btn.addEventListener("click", function () {
    const newQuote = document.getElementById("quoteInput").value;
    addQuote(newQuote); // call required function
    document.getElementById("quoteInput").value = ""; // clear input
  });

  // Append to page
  container.appendChild(input);
  container.appendChild(btn);
}

// REQUIRED: event listener for Show New Quote button
document.getElementById("newQuoteBtn").addEventListener("click", showNewQuote);

// Initialize form at page load
createAddQuoteForm();
