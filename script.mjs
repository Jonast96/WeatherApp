const API_KEY = 'a41bb766615fcb644552efb56837e51d';

// if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(getForecast);
// } else {
//     console.log('Geolocation is not supported by this browser.');
// }

// async function getForecast(lat, lon) {
//     try {
//         const weatherContainer = document.querySelector(".weather_info")
//         const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);
//         weatherContainer.innerHTML = `<p class="text-white">${data.city.id}</p>`
//     } catch (error) {
//         console.error(error);
//     }
// }

// const form = document.querySelector(".form");
// const container = document.querySelector(".search_options");
// const searchInput = document.querySelector(".search");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     getPosition(searchInput.value);
// });

// async function getPosition(searchInput) {
//     const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;
//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);
//         displaySearchSuggestions(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// function displaySearchSuggestions(data) {
//     console.log(data.length);
//     container.innerHTML = "";
//     for (let i = 0; i < data.length; i++) {
//         // Create a button element
//         const button = document.createElement('button');
//         button.classList.add('text-white', 'btn', 'btn-primary', 'd-block', 'my-1');
//         button.innerHTML = `${data[i].name}, ${data[i].country}`;

//         // Attach an event listener to the button
//         button.addEventListener('click', (event) => {
//             // Your event handler code goes here
//             console.log(data[i].country);
//             getForecast(data[i].lat, data[i].lon);
//             container.innerHTML = ""

//         });

//         // Add the button to the container element
//         container.appendChild(button);
//     }
// }


