const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function getCondition(code) {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain showers";
    return "Thunderstorm";
}

async function getWeather(city) {
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoResponse.json();
    const place = geoData.results[0];

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    cityName.textContent = place.name;
    temperature.textContent = Math.round(current.temperature_2m);
    condition.textContent = getCondition(current.weather_code);
    humidity.textContent = current.relative_humidity_2m + "%";
    wind.textContent = current.wind_speed_10m + " km/h";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
});