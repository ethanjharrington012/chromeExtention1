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
// Fetch all points and log them
// function fetchAllPoints() {
//     const pointsElements = document.querySelectorAll('.points-total');
//     const pointsList = Array.from(pointsElements).map(el => el.textContent.trim());
//     console.log("Points found on page:", pointsList);
//     return pointsList;
// }

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchFlightDetails") {
        let flights = [];
        document.querySelectorAll('.flight-block').forEach(item => {
            let flight = {
                departureTime: item.querySelector('.departure-time').textContent.trim(),
                arrivalTime: item.querySelector('.arrival-time').textContent.trim(),
                origin: item.querySelector('.departure-name').textContent.trim(),
                destination: item.querySelector('.arrival-name').textContent.trim(),
                airline: item.querySelector('.operating-airline').textContent.trim(),
                // Add more details as needed
            };
            flights.push(flight);
        });
        sendResponse({flights: flights});
    }
});




// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.


