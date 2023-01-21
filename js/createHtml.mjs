
const container = document.querySelector(".next_hour")
const viewMoreButton = document.querySelector(".view_more");


export function nextHourReportHtml(data) {
  for (let i = 0; i < 8; i++) {
    const date = new Date(data.properties.timeseries[i].time);
    const options = { hour: 'numeric' };
    const time = date.toLocaleTimeString([], options);
    let className = "text-light py-1 border-bottom d-flex justify-content-around align-items-center"
    if (i >= 4) {
      className += " d-none"
    }
    container.innerHTML += `
      <div class="${className}">
        <p class="fs-4">${time}</p>
        <img style="width:80px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${data.properties.timeseries[i].data.next_1_hours.summary.symbol_code}.png" alt="" />
        <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.air_temperature)}°c</p>
        <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount)} mm</p>
        <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.wind_speed)} m/s</p>
      </div>
    `
  }

  viewMoreButton.addEventListener("click", function () {
    const elementsToShow = document.querySelectorAll(".d-none");
    elementsToShow.forEach(function (element) {
      element.classList.remove("d-none");
      viewMoreButton.classList.add("d-none")
    });
  });

}

/**
 * Returns an array of data about the location passed in
 * @param {number} lat 
 * @param {number} lon 
 * @returns 
 */
async function getLocationFromLatLon(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
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

