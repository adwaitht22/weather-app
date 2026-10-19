const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

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

    console.log(place.name, weatherData.current);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
});