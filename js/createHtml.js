export function nextHourReportHtml(data) {
  let loopLimit = 3;
  const container = document.querySelector(".next_hour")
  for (let i = 0; i < loopLimit; i++) {
    const date = new Date(data.properties.timeseries[i].time);
    const options = { hour: 'numeric' };
    const time = date.toLocaleTimeString([], options)

    container.innerHTML += `
      <div
      class="text-light py-1 border-bottom d-flex justify-content-around align-items-center"
    >
      <p class="fs-4">${time}</p>
      <img style="width:80px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${data.properties.timeseries[i].data.next_1_hours.summary.symbol_code}.png" alt="" />
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.air_temperature)}°c</p>
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount)} mm</p>
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.wind_speed)} m/s</p>
      </div>
    `
  }

  const viewMoreButton = document.querySelector("#view-more-button");
  viewMoreButton.addEventListener("click", () => {
    for (let i = loopLimit; i < loopLimit + 5; i++) {
      const date = new Date(data.properties.timeseries[i].time);
      const options = { hour: 'numeric' };
      const time = date.toLocaleTimeString([], options)

      container.innerHTML += `
      <div
      class="text-light py-1 border-bottom d-flex justify-content-around align-items-center"
    >
      <p class="fs-4">${time}</p>
      <img style="width:80px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${data.properties.timeseries[i].data.next_1_hours.summary.symbol_code}.png" alt="" />
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.air_temperature)}°c</p>
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount)} mm</p>
      <p class="fs-5">${Math.floor(data.properties.timeseries[i].data.instant.details.wind_speed)} m/s</p>
      </div>
    `
    }
    loopLimit += 5;
  });
}
export function currentReportHtml(weatherData, img, location) {
  const container = document.querySelector(".container_section1")
  container.innerHTML = `
    <p class="display-6 text-light p-5">${location}</p>
    <div class="text-white row align-items-center border border-opacity-25 rounded d-flex justify-content-center">
      <p class="fs-1 order-lg-1 order-2 col-12 col-lg-2">${weatherData.temp}°c</p>
      <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.amount} mm</p>
      <p class="fs-3 order-lg-1 order-2 col-4 col-lg-2">${weatherData.wind} m/s</p>
      <img style="width:150px" class="img-fluid col-12 col-lg-2 order-1 order-lg-2" src="/images/${img}.png" alt="" />
    </div>
      `
}