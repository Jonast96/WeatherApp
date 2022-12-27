const API_KEY = 'a41bb766615fcb644552efb56837e51d';

// if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(getForecast);
// } else {
//     console.log('Geolocation is not supported by this browser.');
// }

async function getForecast(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}


const form = document.querySelector(".form")
const container = document.querySelector(".search_options")
const searchInput = document.querySelector(".search")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getPosition(searchInput.value);
});

async function getPosition(searchInput) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displaySearchSuggestions(data);
        getForecast(data[0].lat, data[0].lon)
    } catch (error) {
        console.error(error);
    }
}

function displaySearchSuggestions(data) {
    console.log(data.length);
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        container.innerHTML += `<p class="text-white">
      ${data[i].name}, ${data[i].country}
      </p>`;
    }
}
