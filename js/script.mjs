
import {
  nextHourReportHtml,
  currentReportHtml
} from "./createHtml.js";
const container = document.querySelector(".next_hour")
function showLatitudeAndLongitude() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getForecast(latitude, longitude)
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
showLatitudeAndLongitude()

async function getLocationFromLatLon(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}


async function getForecast(lat, lon) {
  try {
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    const weatherData = {
      temp: data.properties.timeseries[0].data.instant.details.air_temperature,
      weather: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
      amount: data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
      wind: data.properties.timeseries[0].data.instant.details.wind_speed,
      lat: data.geometry.coordinates[1],
      lon: data.geometry.coordinates[0]
    }

    const test = await getLocationFromLatLon(weatherData.lat, weatherData.lon)

    let weatherId = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code
    currentReportHtml(weatherData, weatherId, test.address.county)
    nextHourReportHtml(data)

  } catch (error) {
    console.error(error);
  }
}

const resultsList = document.querySelector(".results");
const searchInput = document.querySelector(".search");
const form = document.querySelector(".form_container");


async function getLatLng(locationName) {
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

form.addEventListener("submit", e => {
  e.preventDefault();
  getLatLng(searchInput.value);
});




resultsList.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    container.innerHTML = ""
    let lat = e.target.parentNode.getAttribute("data-lat");
    let lon = e.target.parentNode.getAttribute("data-lon");
    getForecast(lat, lon)

    resultsList.innerHTML = ""
    searchInput.value = ""

  }
});