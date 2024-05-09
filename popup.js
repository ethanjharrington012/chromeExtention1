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

// Ensures the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetch-data-button').addEventListener('click', () => {
        let cityQuery = document.getElementById('city-input').value;
        if (cityQuery) {
            chrome.runtime.sendMessage({action: "fetchAirportDetails", query: cityQuery}, (response) => {
                if (response.airportDetails) {
                    displayAirportDetails(response.airportDetails);
                } else if (response.error) {
                    console.error('Failed to fetch details:', response.error);
                    displayAirportDetails(null);
                }
            });
        }
    });
});

function displayAirportDetails(details) {
    const displayElement = document.getElementById('airport-details');
    if (details) {
        displayElement.innerHTML = `
            <p><strong>Sky ID:</strong> ${details.skyId}</p>
            <p><strong>Entity ID:</strong> ${details.entityId}</p>
        `;
    } else {
        displayElement.textContent = "No details available.";
    }
}




// popup.js

document.getElementById('fetch-data').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        // Make sure to get the tab ID correctly
        chrome.tabs.sendMessage(tabs[0].id, {action: "scrapeAndFetchFlights"}, (response) => {
            if (response && response.scrapedData && response.scrapedData.length > 0) {
                displayFlights(response.scrapedData);
            } else {
                console.error('No flight data received');
                document.getElementById('flights-display').textContent = 'No flight data available.';
            }
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
            <p>From: ${flight.origin}</p>
            <p>To: ${flight.destination}</p>
        `;
        displayElement.appendChild(flightInfo);
    });
}


// example flow

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.