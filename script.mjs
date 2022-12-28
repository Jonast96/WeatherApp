const API_KEY = 'a41bb766615fcb644552efb56837e51d';
const weatherContainer = document.querySelector(".weather_info")

async function getForecast(lat, lon) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        createWeatherInfo(data)
    } catch (error) {
        console.error(error);
    }
}

const form = document.querySelector(".form");
const container = document.querySelector(".search_options");
const searchInput = document.querySelector(".search");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getPosition(searchInput.value);
});

async function getPosition(searchInput) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        displaySearchSuggestions(data);
    } catch (error) {
        console.error(error);
    }
}

function displaySearchSuggestions(data) {
    console.log(data.length);
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        // Create a button element
        const button = document.createElement('button');
        button.classList.add('text-white', 'btn', 'btn-primary', 'd-block', 'my-1');
        button.innerHTML = `${data[i].name}, ${data[i].country}`;

        // Attach an event listener to the button
        button.addEventListener('click', (event) => {
            // Your event handler code goes here
            console.log(data[i].country);
            getForecast(data[i].lat, data[i].lon);
            container.innerHTML = ""

        });

        // Add the button to the container element
        container.appendChild(button);
    }
}



function createWeatherInfo(data) {

    let cards = "";

    for (let i = 1; i < 4; i++) {
        // Convert temperature from Kelvin to Celsius and round to one decimal place
        let temperature = (data.list[i].main.temp - 273.15).toFixed(1);

        cards += `
        <div class="card" style="width: 20rem">
          <img
            src="https://media4.giphy.com/media/Tdo9vQa9zcfozYJQIY/giphy.gif?cid=790b7611e4cc8b8d487123aed137ae78c9e66fb4c2de41c7&rid=giphy.gif&ct=g"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body"></div>
          <h5 class="card-title">${data.list[i].dt_txt}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${data.list[i].weather[0].main}</li>
            <li class="list-group-item">${temperature}C°</li>
            <li class="list-group-item">${data.list[i].main.humidity}%</li>
          </ul>
        </div>
      `;
    }

    weatherContainer.innerHTML = `
      <div>
            <h2 class="text-white">Today's weather, ${data.list[0].dt_txt}</h2>
            <h4 class="text-white">Current weather</h4>
          </div>
          <div>
            <ul class="d-flex justify-content-center">
              <li class="bg-light list-group-item rounded mx-3 px-3 py-1 h3">
              ${data.list[0].weather[0].main}
              </li>
              <li class="bg-light list-group-item rounded mx-3 px-3 py-1 h3">
              ${(data.list[0].main.temp - 273.15).toFixed(1)}C°
              </li>
              <li class="bg-light list-group-item rounded mx-3 px-3 py-1 h3">
              ${data.list[0].main.humidity}%
              </li>
            </ul>
          </div>
          <h3 class="text-white">Later today</h3>
          <div class="d-flex justify-content-around">
          ${cards}
          </div>
      `;
}


