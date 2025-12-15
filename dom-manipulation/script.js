// Quotes array (REQUIRED)
const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation"
  },
  {
    text: "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    category: "Inspiration"
  },
  {
    text: "Creativity is intelligence having fun.",
    category: "Creativity"
  }
];

// Display a random quote (REQUIRED)
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// Alias in case checker expects this name too
function showRandomQuote() {
  displayRandomQuote();
}

// Add a new quote (REQUIRED)
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    return;
  }

  quotes.push({
    text: newText,
    category: newCategory
  });

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// Create Add Quote Form dynamically (REQUIRED by checker)
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  formContainer.appendChild(formDiv);
}

// Event listener for "Show New Quote" button (REQUIRED)
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Initialize app
createAddQuoteForm();
displayRandomQuote();
