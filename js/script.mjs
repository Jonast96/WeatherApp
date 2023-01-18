
import {
  nextHourReportHtml,
  currentReportHtml
} from "./createHtml.js";
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


async function getForecast(lat, lon) {
  try {
    const blurOnLoad = document.querySelector(".blur")
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    createHtml(data)
    blurOnLoad.classList.remove("blur")
  } catch (error) {
    console.error(error);
  }
}

async function createHtml(data) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${data.geometry.coordinates[1]}&lon=${data.geometry.coordinates[0]}`;
  let weatherId = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code

  const response = await fetch(url);
  const locationData = await response.json();
  const location = `${locationData.address.city}, ${locationData.address.country}`
  const weatherData = {
    temp: data.properties.timeseries[0].data.instant.details.air_temperature,
    weather: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
    amount: data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
    wind: data.properties.timeseries[0].data.instant.details.wind_speed
  }

  currentReportHtml(weatherData, weatherId, location)
  nextHourReportHtml(data)
}



async function getLatLng(locationName) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${locationName}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lng = data[0].lon;
      console.log(data)
      return { lat, lng };
    } else {
      throw new Error("No results found for the given location name.");
    }
  } catch (error) {
    console.log("An error occurred: " + error);
  }
}
