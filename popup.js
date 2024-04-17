// this is my popup scrips

import { fetchApiData } from './api.js';

const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar?originSkyId=BOM&destinationSkyId=JFK&fromDate=2024-02-20';
const apiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '74ebc0e9dcmsh71dea7912518c41p16e12ejsn683db21b9e6a',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
};

document.getElementById('my-button').addEventListener('click', async () => {
    try {
        const data = await fetchApiData(apiUrl, apiOptions);
        document.getElementById('api-data').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('api-data').textContent = 'Failed to fetch data.';
    }
});


// here I am giving instruction so when the button with id of color-change is clicked
// it called a function in index.js action of ChangeColor
document.getElementById('change-color').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeColor"});
    });
});

document.getElementById('change-header').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeHeader"});
    });
});
// displays points
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "fetch_points"}, function(response) {
            if (response && response.points) {
                document.getElementById('points-display').textContent = response.points;
            }
        });
    });
});


// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.