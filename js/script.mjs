import {
  currentReportHtml,
  nextHourReportHtml
} from "./createHtml.mjs";

const container = document.querySelector(".next_hour")
const viewMoreButton = document.querySelector(".view_more");


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

/**
 * If user has allowed location sharing, this function will run the getForecast function and display the weather for the users location
 */
function currentLocationReport() {
  if (navigator.geolocation) {
    let watchId = navigator.geolocation.watchPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      testing(latitude, longitude)
      navigator.geolocation.clearWatch(watchId);
      averageTemperature(latitude, longitude)
      return latitude, longitude
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

currentLocationReport();



const resultsList = document.querySelector(".results");
const searchInput = document.querySelector(".search");
const form = document.querySelector(".form_container");




form.addEventListener("submit", e => {
  e.preventDefault();
  getLatLng(searchInput.value);
});


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




async function testing(lat, lon) {
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


/**

@async
@function averageTemperature
@param {Number} latitude - Latitude value for location
@param {Number} longitude - Longitude value for location
Makes an API call to get temperature data for a given location, calculates the average temperature for the next 3 days, and updates the UI with the results.
*/
async function averageTemperature(latitude, longitude) {
  const data = await MIApiCall(latitude, longitude);
  const today = new Date();
  const todayDate = today.getDate();

  const averages = calculateAverages(data, todayDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = tomorrow.toLocaleString('default', { weekday: 'long' });
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const dayAfterTomorrowDay = dayAfterTomorrow.toLocaleString('default', { weekday: 'long' });


  updateUI(averages, tomorrowDay, dayAfterTomorrowDay);
}




/**

@function calculateAverages
@param {Object} data - Data object returned from API call
@param {Number} todayDate - The current date
Iterates through the temperature data and calculates the average temperature for the next 3 days. Returns an object with the averages for each day rounded to the nearest whole number.
*/
function calculateAverages(data, todayDate) {
  let day1Average = 0;
  let day2Average = 0;
  let day3Average = 0;
  let day1Count = 0;
  let day2Count = 0;
  let day3Count = 0;
  let day1WeatherSymbol = []
  let day2WeatherSymbol = []
  let day3WeatherSymbol = []
  let day1Downpour = 0
  let day2Downpour = 0
  let day3Downpour = 0
  let day1Wind = 0
  let day2Wind = 0
  let day3Wind = 0

  for (let i = 0; i < data.properties.timeseries.length; i++) {
    const reportDate = new Date(data.properties.timeseries[i].time);
    const todayReportDate = reportDate.getDate();
    const hours = reportDate.getHours();
    const time = hours;

    if (todayReportDate == todayDate && time >= 10 && time <= 22) {
      day1Average += data.properties.timeseries[i].data.instant.details.air_temperature;
      day1Downpour += data.properties.timeseries[i].data.next_6_hours.details.precipitation_amount
      day1Wind += data.properties.timeseries[i].data.instant.details.wind_speed
      day1WeatherSymbol.push(data.properties.timeseries[i].data.next_1_hours.summary.symbol_code)
      console.log(data.properties.timeseries[i].data.next_1_hours.summary.symbol_code)
      day1Count++;
    } else if (todayReportDate == todayDate + 1 && time >= 10 && time <= 22) {
      day2Downpour += data.properties.timeseries[i].data.next_6_hours.details.precipitation_amount
      day2Wind += data.properties.timeseries[i].data.instant.details.wind_speed

      day2Average += data.properties.timeseries[i].data.instant.details.air_temperature;
      day2WeatherSymbol.push(data.properties.timeseries[i].data.next_1_hours.summary.symbol_code)
      day2Count++;
    } else if (todayReportDate == todayDate + 2 && time >= 10 && time <= 22) {
      day3Average += data.properties.timeseries[i].data.instant.details.air_temperature;
      day3Wind += data.properties.timeseries[i].data.instant.details.wind_speed

      if (data.properties.timeseries[i].data.next_1_hours) {
        day3WeatherSymbol.push(data.properties.timeseries[i].data.next_1_hours.summary.symbol_code)
        day3Downpour += data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount
      } else {
        day3WeatherSymbol.push(data.properties.timeseries[i].data.next_6_hours.summary.symbol_code)
        day3Downpour += data.properties.timeseries[i].data.next_6_hours.details.precipitation_amount

      }

      day3Count++;
    }
  }

  day1Average /= day1Count;
  day2Average /= day2Count;
  day3Average /= day3Count;

  day1Downpour /= day1Count
  day2Downpour /= day2Count
  day3Downpour /= day3Count;

  day1Wind /= day1Count
  day2Wind /= day2Count
  day3Wind /= day3Count


  return {
    day1Average: Math.round(day1Average),
    day2Average: Math.round(day2Average),
    day3Average: Math.round(day3Average),
    day1Symbol: day1WeatherSymbol[1],
    day2Symbol: day2WeatherSymbol[1],
    day3Symbol: day3WeatherSymbol[1],
    day1Downpour: Math.round(day1Downpour),
    day2Downpour: Math.round(day2Downpour),
    day3Downpour: Math.round(day3Downpour),
    day1Wind: Math.round(day1Wind),
    day2Wind: Math.round(day2Wind),
    day3Wind: Math.round(day3Wind)
  };
}





/**

@function updateUI
@param {Object} averages - Object with average temperatures for each day
Updates the UI with the average temperatures for each day.


UPDATE THIS
*/
function updateUI(averages, tomorrowDay, dayAfterTomorrowDay) {
  const day1Temp = document.querySelector(".day1_temp")
  const day2Temp = document.querySelector(".day2_temp")
  const day3Temp = document.querySelector(".day3_temp")
  day1Temp.innerHTML = `${averages.day1Average}°c`
  day2Temp.innerHTML = `${averages.day2Average}°c`
  day3Temp.innerHTML = `${averages.day3Average}°c`

  const day2Day = document.querySelector(".day2_day")
  const day3Day = document.querySelector(".day3_day")
  day2Day.innerHTML = tomorrowDay;
  day3Day.innerHTML = dayAfterTomorrowDay;


  let img1 = document.querySelector(".day1_img")
  let img2 = document.querySelector(".day2_img")
  let img3 = document.querySelector(".day3_img")
  img1.src = `./images/${averages.day1Symbol}.png`
  img2.src = `./images/${averages.day2Symbol}.png`
  img3.src = `./images/${averages.day3Symbol}.png`

  const day1Downpour = document.querySelector(".day1_downpour")
  const day2Downpour = document.querySelector(".day2_downpour")
  const day3Downpour = document.querySelector(".day3_downpour")

  day1Downpour.innerHTML = `${averages.day1Downpour} mm`
  day2Downpour.innerHTML = `${averages.day2Downpour} mm`
  day3Downpour.innerHTML = `${averages.day3Downpour} mm`

  const day1Wind = document.querySelector(".day1_wind")
  const day2Wind = document.querySelector(".day2_wind")
  const day3Wind = document.querySelector(".day3_wind")

  day1Wind.innerHTML = `${averages.day1Wind} m/s`
  day2Wind.innerHTML = `${averages.day2Wind} m/s`
  day3Wind.innerHTML = `${averages.day3Wind} m/s`
}