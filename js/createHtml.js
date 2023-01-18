export function nextHourReportHtml(data, img) {
  const container = document.querySelector(".next_hour")
  for (let i = 0; i < 3; i++) {

    const date = new Date(data.properties.timeseries[i].time);
    const options = { hour: 'numeric', minute: 'numeric' };
    const time = date.toLocaleTimeString([], options)

    container.innerHTML += `
      <div
      class="text-light py-1 border-bottom d-flex justify-content-around align-items-center"
    >
      <p class="fs-4">${time}</p>
      <img style="width:80px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${img}.png" alt="" />
      <p class="fs-5">${data.properties.timeseries[i].data.instant.details.air_temperature}</p>
      <p class="fs-5">${data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount} mm</p>
      <p class="fs-5">${data.properties.timeseries[i].data.instant.details.wind_speed} m/s</p>
    </div>
    `
  }
}


export function currentReportHtml(weatherData, img, location) {
  const container = document.querySelector(".container_section1")
  container.innerHTML = `
    <p class="display-6 text-light p-5">${location}</p>
    <div class="text-white row align-items-center border border-opacity-25 rounded d-flex justify-content-center">
      <p class="fs-1 order-lg-1 order-2 col-12 col-lg-2">${weatherData.temp}°</p>
      <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.weather}</p>
      <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.amount} mm</p>
      <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.wind} m/s</p>
      <img style="width:150px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${img}.png" alt="" />
    </div>
      `
}