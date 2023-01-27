/**
 * 
Generates HTML for the next hour weather report
@param {Object} data - The data object returned by the API call
@returns {void} - This function updates the DOM with the generated HTML
*/
export function nextHourReportHtml(data) {

    const container = document.querySelector(".next_hour")
    const viewMoreButton = document.querySelector(".view_more");

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
    /**
     * 
    Show more weather data.
    @event
    */
    viewMoreButton.addEventListener("click", function () {
        const elementsToShow = document.querySelectorAll(".d-none");
        elementsToShow.forEach(function (element) {
            element.classList.remove("d-none");
            viewMoreButton.classList.add("d-none")
        });
    });

}