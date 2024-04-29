// this is my popup scrips

// popup.js







document.getElementById('change-header').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeHeader"});
    });
});

document.getElementById('color-info').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "colorInfo"});
    });
});
document.getElementById('getting').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getting"});
    });
});
// display
// displays points
// document.addEventListener('DOMContentLoaded', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message: "fetch_points"}, function(response) {
//             if (response && response.points) {
//                 document.getElementById('points-display').textContent = response.points;
//             }
//         });
//     });
// });

// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('flights-display');
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "fetchFlightDetails"}, response => {
            if(response && response.flights) {
                response.flights.forEach(flight => {
                    const flightInfo = document.createElement('div');
                    flightInfo.textContent = `Airline: ${flight.airline}, Depart: ${flight.departureTime}, Arrive: ${flight.arrivalTime}, From: ${flight.origin}, To: ${flight.destination}`;
                    displayElement.appendChild(flightInfo);
                });
            } else {
                displayElement.textContent = 'No flight data available.';
            }
        });
    });
});




// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.