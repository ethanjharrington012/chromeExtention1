// Purpose: Handle API requests and business logic.


const APIKEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2JkMzYxMGYzMWViMWExZWUxZGEwNjZhZWVlNTY1Yjk2NWI5MzkyNDYwYzAzZGMxMjc2YWQ3YTY4YzMzZWVmNGY0Y2ZmMDNhOThlMDNmZjYiLCJpYXQiOjE3MTM0NTE5MzgsIm5iZiI6MTcxMzQ1MTkzOCwiZXhwIjoxNzQ0OTg3OTM4LCJzdWIiOiIyMjQ0NCIsInNjb3BlcyI6W119.bBris5JQ4l_CRJ2wcoicpcTediwGMqct-D-30rwts2vFD8MBnFIA5RCjrPMyoeMLkkghENcxU3GrNqVJpQmTXg';

async function fetchAirportDetails() {
    const url = `https://app.goflightlabs.com/retrieveFlights?access_key=${APIKEY}&originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&date=2024-04-27`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Success:", data.context);
        data.itineraries.forEach(itinerary => {
            console.log(`Itinerary ID: ${itinerary.id}, Price: ${itinerary.price.formatted}`);
            itinerary.legs.forEach(leg => {
                console.log(`Leg ID: ${leg.id}, Origin: ${leg.origin.name}, Destination: ${leg.destination.name}`);
            });
        });
        return data;
    } catch (error) {
        console.error("Error fetching airport details:", error);
    }
}

fetchAirportDetails();
