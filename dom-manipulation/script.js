let quotes = [
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");


function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.textContent = `"${randomQuote.text}" — (${randomQuote.category})`;
}

newQuoteBtn.addEventListener("click", showRandomQuote);


function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please add both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  quoteDisplay.textContent = `"${text}" — (${category})`;

  textInput.value = "";
  categoryInput.value = "";
}
