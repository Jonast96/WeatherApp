/**
 * 
@function MIApiCall
@async
@param {number} lat - Latitude of the location.
@param {number} lon - Longitude of the location.
@returns {Object} - JSON object containing the location forecast data from the met.no API.
@throws {Error} - If an error occurs while fetching the data
@description - This function takes in latitude and longitude as parameters, makes a fetch call to the met.no API using the provided latitude and longitude, and returns the location forecast data in a JSON object.
*/
export async function MIApiCall(lat, lon) {
    try {
        const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}