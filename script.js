//Saul Zapata Project: "Quote Generator" 11/25/22
//console.log("testing"); // see data on browser console

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Loader
const loader = document.getElementById("loader");


let apiQuotes = []; // global access,this is not needed if fetching locally

// Show Loading function
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading function
function complete () {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote function
function newQuote() {
  loading();
  // Pick random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; // Dynamically online, for local change "apiQuotes" to "localQuotes"
  // Check if Author field is blank and replae it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 65) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // this will get the "text" separately
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Below is used when requesting the quote from the API starts here

// Get Quotes From API
async function getQuotes() {
  loading();
   const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json"
  try {
    const response = await fetch(apiUrl); // Store Quote
    apiQuotes = await response.json(); // gloabal variable
    //console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?=${quoteText.textContent} - ${authorText.textContent}`; // Template String with the back ticks
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

// loading();
// Above is used when requesting the quote from the API ends here

// This is requesting the quote from local quotes.json file
//newQuote();