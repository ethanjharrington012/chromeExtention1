// // Purpose: Handle API requests and business logic.


// function formatDate(input) {
//     console.log("formatDate received input:", input); // Log input to debug

//     // Quick check to return the date if it's already in the expected format
//     if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
//         console.log("Date is already in correct format:", input);
//         return input; // Return as is if the date matches the YYYY-MM-DD pattern
//     }

//     const months = {
//         January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
//         July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'
//     };

//     // Attempt to split the string and extract date components
//     const parts = input.split(' ');
//     if (parts.length < 4) {
//         console.error("Date input format is incorrect, expected at least 4 parts:", parts);
//         return null;
//     }

//     const month = months[parts[1]];
//     const day = parts[2].replace(',', ''); // "15," -> "15"
//     const year = parts[3];

//     if (!month || !day || !year) {
//         console.error("Failed to parse date parts correctly from:", parts);
//         return null;
//     }

//     const dayFormatted = day.padStart(2, '0'); // Ensure day is always two digits
//     return `${year}-${month}-${dayFormatted}`;
// }

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchFlightDetails") {
        let flightsWithDetails = [];

        Promise.all(message.flights.map(flight => 
            fetch(`http://localhost:4000/fetch-airport?query=${encodeURIComponent(flight.origin)}`)
                .then(response => response.json())
                .then(details => ({...flight, originDetails: details}))
                .catch(error => ({...flight, error: error.toString()}))
        )).then(results => {
            sendResponse({flights: results});
        });

        return true; // Indicates an asynchronous response is pending.
    }
});


// // fetchFirstData()