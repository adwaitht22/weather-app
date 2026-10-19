# Weather App

A responsive weather dashboard built with HTML, CSS, and JavaScript. Search any city and see its live weather.

🔗 **Live demo:** https://adwaitht22.github.io/weather-app/

## Features

- Search any city for live temperature, conditions, humidity, and wind speed
- Dynamic weather icons that change with the conditions
- °C / °F unit toggle
- Loading state while data is fetched
- Error handling for an unknown city, an empty search, and network failures

## Tech Used

- HTML5
- CSS3 (Flexbox)
- JavaScript (ES6+, async/await, Fetch API)
- [Open-Meteo API](https://open-meteo.com/) (geocoding and forecast, no API key required)

## How It Works

1. The city name is sent to the Open-Meteo geocoding API to get its latitude and longitude.
2. Those coordinates are sent to the forecast API to get the current weather.
3. The JSON response is used to update the card on the page (DOM manipulation).
4. Temperature is stored in Celsius and converted only when displayed, so the °C / °F toggle never loses accuracy.

## What I Learned

- Fetching data from REST APIs and working with JSON
- Using `async/await` and chaining two dependent API calls
- Handling errors with `try/catch` and showing clear messages to users
- Updating the page dynamically with DOM manipulation
- Building layouts with Flexbox
- Using Git and GitHub, and deploying with GitHub Pages

## Screenshot

<img width="685" height="597" alt="image" src="https://github.com/user-attachments/assets/d68d9ca4-6bcb-423e-8795-acf1e6e26a65" />


## Run Locally

1. Clone the repo: `git clone https://github.com/adwaitht22/weather-app.git`
2. Open `index.html` in your browser (or use the VS Code Live Server extension).

## Future Improvements

- Use my current location
- 5-day forecast
- Save recent searches with localStorage
