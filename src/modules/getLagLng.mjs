/**
 * 
@function getLatLng
@async
@param {string} locationName - The name of the location to search for.
@returns {void}
@throws {Error} If an error occurs while fetching the data
@description - This function takes in a location name, makes a fetch call to the OpenStreetMap API to search for that location and returns the top 5 results in a list format with latitude and longitude data attributes. The list of results is also displayed in the HTML element with the "resultsList" id.
*/
export async function getLatLng(locationName) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${locationName}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        let list = "";
        for (let i = 0; i < 5; i++) {
            try {
                let lat = data[i].lat;
                let lon = data[i].lon;
                list += `<li class=" list-group-item bg-transparent border-white w-75 mx-auto" data-lat="${lat}" data-lon="${lon}"><a class="text-white" href="#">${data[i].display_name}</a></li>`;
            } catch (error) {
                console.error(`An error occurred: ${error}`);
            }
        }
        resultsList.innerHTML = list;
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}