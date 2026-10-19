const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const message = document.getElementById("message");
const weatherIcon = document.getElementById("weather-icon");
const unitToggle = document.getElementById("unit-toggle");
const unit = document.getElementById("unit");

let currentTempC = 29;
let isCelsius = true;

function getCondition(code) {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain showers";
    return "Thunderstorm";
}

function getIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "⛈️";
}

function getTheme(code) {
    if (code === 0) return "sunny";
    if (code <= 3) return "cloudy";
    if (code <= 48) return "foggy";
    if (code <= 67) return "rainy";
    if (code <= 77) return "snowy";
    if (code <= 82) return "rainy";
    return "stormy";
}

function showTemperature() {
    if (isCelsius) {
        temperature.textContent = Math.round(currentTempC);
        unit.textContent = "°C";
    } else {
        temperature.textContent = Math.round(currentTempC * 9 / 5 + 32);
        unit.textContent = "°F";
    }
}

async function getWeather(city) {
    message.textContent = "Loading...";
    message.classList.remove("error");

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error("City not found. Check the spelling and try again.");
        }
        const place = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );
        if (!weatherResponse.ok) {
            throw new Error("Could not get weather data. Please try again.");
        }
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        cityName.textContent = place.name;
        currentTempC = current.temperature_2m;
        showTemperature();
        condition.textContent = getCondition(current.weather_code);
        weatherIcon.textContent = getIcon(current.weather_code);
        humidity.textContent = current.relative_humidity_2m + "%";
        wind.textContent = current.wind_speed_10m + " km/h";
        message.textContent = "";
    } catch (error) {
        message.textContent = error.message;
        message.classList.add("error");
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        message.classList.add("error");
        return;
    }
    getWeather(city);
});

unitToggle.addEventListener("click", function () {
    isCelsius = !isCelsius;
    showTemperature();
});