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
// popup.js
document.getElementById('fetch-data').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "fetchFlightDetails"}, function(response) {
            displayFlights(response.flights);
        });
    });
});

function displayFlights(flights) {
    const displayElement = document.getElementById('flights-display');
    displayElement.innerHTML = ''; // Clear previous entries
    flights.forEach(flight => {
        const flightInfo = document.createElement('div');
        flightInfo.innerHTML = `
            <p>Airline: ${flight.airline}</p>
            <p>Depart: ${flight.departureTime}</p>
            <p>Arrive: ${flight.arrivalTime}</p>
            <p>From: ${flight.origin} (${flight.originDetails ? flight.originDetails.name : 'No details'})</p>
            <p>To: ${flight.destination}</p>
        `;
        displayElement.appendChild(flightInfo);
    });
}
// example flow

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.