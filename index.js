// content.js
// this is my content scrips that interact with the DOM directly.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeColor") {
        const elements = document.querySelectorAll('.flight-cabin-cell');
        elements.forEach(element => {
            element.style.backgroundColor = 'red'; // Change this value to any color you like.
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeHeader") {
        const elements = document.querySelectorAll('.route-subheading.ng-star-inserted');
        elements.forEach(element => {
            element.style.backgroundColor = 'green'; // Change this value to any color you like.
        });
    }
});

// Fetch all points and log them
function fetchAllPoints() {
    const pointsElements = document.querySelectorAll('.points-total');
    const pointsList = Array.from(pointsElements).map(el => el.textContent.trim());
    console.log("Points found on page:", pointsList);
    return pointsList;
}

// Example of sending this data to the popup or handling it in some other way
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "fetch_points") {
            const pointsList = fetchAllPoints();
            sendResponse({points: pointsList});
        }
    }
);



// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.


