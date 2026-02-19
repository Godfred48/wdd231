const randomforcast = document.getElementById("randomforcast");

const popularcities = [
  "Paris", "New York", "Tokyo", "Sydney", "Rome",
  "Barcelona", "Dubai", "Singapore", "Istanbul",
  "Bangkok", "Amsterdam", "Los Angeles",
  "Accra", "Lagos", "Johannesburg", "Cairo"
];

// Simple weather map (copy from explore.js)
const weatherMap = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Drizzle", icon: "🌦️" },
  55: { text: "Heavy drizzle", icon: "🌧️" },
  61: { text: "Light rain", icon: "🌧️" },
  63: { text: "Moderate rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Snow", icon: "❄️" },
  95: { text: "Thunderstorm", icon: "⛈️" }
};

function generateTravelTips(weatherCode, temperature) {

  if (weatherCode === 0 || weatherCode === 1) {
    return "Perfect for sightseeing and outdoor adventures.";
  }

  if (weatherCode === 2 || weatherCode === 3) {
    return "Great for city walks and exploring attractions.";
  }

  if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) {
    return "Rain expected — consider indoor activities.";
  }

  if (weatherCode === 71) {
    return "Snowy conditions — dress warmly and plan ahead.";
  }

  if (weatherCode === 95) {
    return "Thunderstorms likely — outdoor travel not recommended.";
  }

  if (temperature >= 35) {
    return "Very hot — stay hydrated and avoid midday sun.";
  }

  if (temperature <= 10) {
    return "Cold weather — pack warm clothing.";
  }

  return "Check local conditions before planning activities.";
}


// Get coordinates
async function getCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  const data = await response.json();

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude
  };
}

// Get ONLY current weather
async function getCurrentWeather(city) {
  const { lat, lon } = await getCoordinates(city);

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
  );

  return await response.json();
}

// Random selection
function getRandomCities(cityList, count) {
  const selected = [];

  while (selected.length < count) {
    const randomIndex = Math.floor(Math.random() * cityList.length);
    const city = cityList[randomIndex];

    if (!selected.includes(city)) {
      selected.push(city);
    }
  }

  return selected;
}

// Display function
async function displayRandomCities() {
  randomforcast.innerHTML = "";

  const randomCities = getRandomCities(popularcities, 10);

  for (const city of randomCities) {

    const data = await getCurrentWeather(city);

    const current = data.current_weather;

    const condition =
      weatherMap[current.weathercode] || { text: "Unknown", icon: "❓" };

    const tip = generateTravelTips(
      current.weathercode,
      current.temperature
    );

    randomforcast.insertAdjacentHTML(
      "beforeend",
      `
      <div class="random-city-card">
        <h3>${city}</h3>
        <span>${condition.icon}</span>
        <p>${current.temperature}°C</p>
        <p>${condition.text}</p>
        <p class="travel-tip">✈️ ${tip}</p>
      </div>
      `
    );
  }
}


window.addEventListener("DOMContentLoaded", displayRandomCities);
