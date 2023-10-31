const apiKey = "a647d1cf5f7d32233ac0ffb4f8ff491f";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city));
        const respData = await resp.json();

        if (respData.cod === 200) {
            addWeatherToPage(respData);
        } else {
            displayError("City not found");
        }
    } catch (error) {
        displayError("Something went wrong");
        console.error(error);
        displayError("Something went wrong");

    }
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /> ${temp}°C</h2>
        <small>${data.weather[0].main}</small>
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

function KtoC(K) {
    return (K - 273.15).toFixed(2);
}

function displayError(message) {
    main.innerHTML = `<div class="weather">${message}</div>`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});