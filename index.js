// content.js
// this is my content scrips that interact with the DOM directly.


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeHeader") {
        const elements = document.querySelectorAll('.route-subheading.ng-star-inserted');
        elements.forEach(element => {
            element.style.backgroundColor = 'green'; // Change this value to any color you like.
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "colorInfo") {
        const elements = document.querySelectorAll('.flight-block');
        elements.forEach(element => {
            element.style.backgroundColor = 'red'; // Change this value to any color you like.
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getting") {
        const elements = document.querySelectorAll('span.mat-caption.operating-airline');
        elements.forEach(element => {
            element.style.backgroundColor = 'blue'; // Change this value to any color you like.
        });
    }
});

// content.js


// content.js

// content.js

function scrapeAndFetchDetails() {
    const flightElements = document.querySelectorAll('.flight-block');
    const flights = [];

    flightElements.forEach(item => {
        let flight = {
            departureTime: item.querySelector('.departure-time').textContent.trim(),
            arrivalTime: item.querySelector('.arrival-time').textContent.trim(),
            origin: item.querySelector('.departure-name').textContent.trim(),
            destination: item.querySelector('.arrival-name').textContent.trim(),
            airline: item.querySelector('.operating-airline').textContent.trim(),
        };
        flights.push(flight);
    });

    // Send the scraped flights back to the popup or background script
    return flights; // Now this just returns the array of flights
}

// Listen for a message from the popup to start scraping
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeAndFetchFlights") {
        const scrapedData = scrapeAndFetchDetails();
        sendResponse({scrapedData}); // Send scraped data back to popup
        return true;  // Indicates asynchronous response expected.
    }
});


// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.


