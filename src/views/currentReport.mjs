/**
 * 
@function
@async
@param {number} lat - The latitude of the location.
@param {number} lon - The longitude of the location.
@returns {Promise<Object>} - Returns a promise that resolves to an object containing location data from OpenStreetMap's Nominatim service.
@throws {Error} - If there is a problem fetching the data or parsing the response.
*/
export async function getLocationFromLatLon(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
@function currentReportHtml
@async
@param {Object} weatherData - An object containing weather data
@property {number} weatherData.lat - Latitude of location
@property {number} weatherData.lon - Longitude of location
@property {number} weatherData.temp - Temperature in Celsius
@property {number} weatherData.amount - Amount of precipitation in millimeters
@property {number} weatherData.wind - Wind speed in meters per second
@property {string} weatherData.weather - Weather condition (used for image file name)
@returns {void}
@description - This function takes in an object containing weather data and uses it to update the HTML in the "container_section1" class container with the location, temperature, precipitation, wind speed and weather condition image.
*/
export async function currentReportHtml(weatherData) {
  const location = await getLocationFromLatLon(weatherData.lat, weatherData.lon)
  const container = document.querySelector(".container_section1")
  container.innerHTML = `
      <p class="display-6 text-light fw-semibold p-5">${location.address.county}</p>
      <div class="text-white row align-items-center border border-opacity-25 rounded d-flex justify-content-center">
        <p class="fs-1 order-lg-1 order-2 col-12 col-lg-2">${weatherData.temp}°c</p>
        <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.amount} mm</p>
        <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.wind} m/s</p>
        <img style="width:150px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${weatherData.weather}.png" alt="" />
      </div>
        `
}
