import { getOldId } from "./components.js";
function showLatitudeAndLongitude() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      getForecast(latitude, longitude)
      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
showLatitudeAndLongitude()


async function getForecast(lat, lon) {
  try {
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    createHtml(data)
  } catch (error) {
    console.error(error);
  }
}

async function createHtml(data) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${data.geometry.coordinates[1]}&lon=${data.geometry.coordinates[0]}`;
  const container = document.querySelector(".weather_info")
  let oldId = getOldId(data.properties.timeseries[0].data.next_1_hours.summary.symbol_code);
  const response = await fetch(url);
  const locationData = await response.json();
  const location = `${locationData.address.city}, ${locationData.address.country}`
  const weatherData = {
    temp: data.properties.timeseries[0].data.instant.details.air_temperature,
    weather: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
    amount: data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
    wind: data.properties.timeseries[0].data.instant.details.wind_speed
  }

  console.log(weatherData)

  container.innerHTML = `
  <p class="display-6 text-light p-5">${location}</p>
  <div class="text-white row align-items-center border border-opacity-25 rounded d-flex justify-content-center">
    <p class="fs-1 order-lg-1 order-2 col-12 col-lg-2">${weatherData.temp}°</p>
    <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.weather}</p>
    <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.amount} mm</p>
    <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.wind} m/s</p>
    <img style="width:150px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${oldId.toString().padStart(2, "0")}.png" alt="" />
  </div>
    `

}

