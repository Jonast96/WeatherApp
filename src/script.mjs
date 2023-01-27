import { getLatLng } from './modules/getLagLng.mjs';
import { MIApiCall } from './modules/MIApiCall.mjs';
import { currentLocationReport } from './modules/currentLocationReport.mjs';
import { currentReportHtml } from './views/currentReport.mjs';
import { nextHourReportHtml } from './views/nextHourReport.mjs';
import { averageTemperature } from './modules/components.mjs';

currentLocationReport();

const container = document.querySelector(".next_hour")
const viewMoreButton = document.querySelector(".view_more");
const resultsList = document.querySelector(".results");
const searchInput = document.querySelector(".search");
const form = document.querySelector(".form_container");


/**
 * 
@function
@event form submit event
@param {event} e - The submit event of the form
@listens form#submit
@description This function is listening for the submit event on the form element, and when it is triggered, it will call the getLatLng function with the value of the searchInput element as an argument, and prevents the default behavior of the submit event.
*/
form.addEventListener("submit", e => {
  e.preventDefault();
  getLatLng(searchInput.value);
});

/**
 * 
@function
@param {Event} e - The click event on the results list element
Handles the click event on the results list element, when a user clicks on a location from the search results list
It retrieves the latitude and longitude of the clicked location, clears the search input, results list and container elements, calls the testing function with the latitude and longitude and removes the d-none class from the viewMoreButton.
*/
resultsList.addEventListener("click", e => {
  e.target.tagName === "A"
  let lat = e.target.parentNode.getAttribute("data-lat");
  let lon = e.target.parentNode.getAttribute("data-lon");
  resultsList.innerHTML = ""
  searchInput.value = ""
  container.innerHTML = ""

  viewMoreButton.classList.remove("d-none")
  viewMoreButton.classList.add("d-block")
  testing(lat, lon)
});


/**
 * @async
 * @function testing
 * @param {number} lat - Latitude of the location
 * @param {number} lon - Longitude of the location
 * 
 * @returns {undefined}
 *
 * @description The function makes an API call to the met.no API to get the weather forecast data for the given location (latitude and longitude).
 * It then logs the data in the console, call the currentReportHtml and nextHourReportHtml functions to display the data on the web page and also call averageTemperature function to get the average temperature of the location
 */
export async function testing(lat, lon) {
  const data = await MIApiCall(lat, lon)
  const weatherData = {
    temp: data.properties.timeseries[0].data.instant.details.air_temperature,
    weather: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
    amount: data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
    wind: data.properties.timeseries[0].data.instant.details.wind_speed,
    lat: data.geometry.coordinates[1],
    lon: data.geometry.coordinates[0]
  }
  console.log(data)
  currentReportHtml(weatherData)
  nextHourReportHtml(data)
  averageTemperature(lat, lon)

}
