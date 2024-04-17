// Define a function to fetch data with configurable parameters
export async function fetchApiData(url, options) {
    try {
      const response = await fetch(url, options);
      const result = await response.json();  // Assuming the response is JSON. Use .text() if it's plain text.
      console.log(result);
      return result;  // Returning the result so it can be used where this function is called
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
// Example Flow:

// User Interaction: The user clicks a button in the popup.
// Popup Script (popup.js): Captures the click event and sends a message to the content script.
// Content Script (index.js): Listens for the message and changes the webpage's DOM in response.