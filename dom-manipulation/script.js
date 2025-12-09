// Array of quote objects
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Perseverance" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Update the DOM
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
}

// Function to add a new quote
function addQuote() {
    // Get input values
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Check if inputs are not empty
    if (quoteText.trim() === '' || quoteCategory.trim() === '') {
        alert('Please fill in both fields');
        return;
    }
    
    // Create new quote object
    const newQuote = {
        text: quoteText,
        category: quoteCategory
    };
    
    // Add to quotes array
    quotes.push(newQuote);
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Update the DOM to show the new quote was added
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>Quote added successfully!</p>
        <p>"${newQuote.text}"</p>
        <p><strong>Category:</strong> ${newQuote.category}</p>
    `;
    
    console.log('New quote added:', newQuote);
    console.log('Total quotes:', quotes.length);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show initial quote
    showRandomQuote();
    
    // Add event listener to "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    
    // Add event listener to "Add Quote" button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    
    // Also allow Enter key in either input to trigger addQuote
    document.getElementById('newQuoteText').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addQuote();
        }
    });
    
    document.getElementById('newQuoteCategory').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addQuote();
        }
    });
});
