//innitialize variables and select elemnts to use from html
const weatherForcast = document.getElementById("weatherForcast");
const searchInput = document.getElementById("searchinput");
const searchBtn = document.getElementById("searchButton");
const travelTipsContainer = document.getElementById("TravelTips");


//describe a weather code map based on the code API will deliver
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
}

// //convert city name to longitude and latitude using Nominatim and also async function
// async function getCoordinates(city){
//     //fetch corddinates from city typed
//     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
//     //await convert response from api to json 
//     const cityData = await response.json();
//     //check if the city doesnt exist
//     if (!cityData[0]) throw new Error("City not found");
//     //if city exist return value
//     return {lat:cityData[0].lat , lon: cityData[0].lon}
//     //using cityData[0] becauuse its likely the api could return a array of other city with the samr name. its better to use the first value the api gives so we use the 0 index
// }

// 

async function getCoordinates(city) {

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const data = await response.json();

  if (!data.results || !data.results.length) {
    throw new Error("City not found");
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude
  };
}


function generateTravelTips(weatherCode, temperature) {

  if (weatherCode === 0 || weatherCode === 1) {
    return [
      "Perfect for sightseeing and outdoor tours.",
      "Great day for photography and city walks.",
      "Ideal weather for beach or hiking activities."
    ];
  }

  if (weatherCode === 2 || weatherCode === 3) {
    return [
      "Good day for exploration.",
      "Carry a light jacket just in case.",
      "Comfortable for shopping and casual outings."
    ];
  }

  if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) {
    return [
      "Rain expected. Pack an umbrella.",
      "Consider indoor attractions like museums.",
      "Wear waterproof shoes for comfort."
    ];
  }

  if (weatherCode === 71) {
    return [
      "Snow conditions — dress warmly.",
      "Check road and transport conditions.",
      "Great opportunity for winter photography."
    ];
  }

  if (weatherCode === 95) {
    return [
      "Thunderstorm alert — avoid outdoor travel.",
      "Stay indoors if possible.",
      "Monitor weather updates before planning trips."
    ];
  }

  if (temperature >= 35) {
    return [
      "Very hot weather — stay hydrated.",
      "Avoid midday outdoor exposure.",
      "Wear light breathable clothing."
    ];
  }

  if (temperature <= 10) {
    return [
      "Cold weather — wear warm layers.",
      "Plan indoor sightseeing activities.",
      "Hot beverages recommended for comfort."
    ];
  }

  return [
    "Check local updates before traveling.",
    "Prepare suitable clothing.",
    "Stay informed about weather changes."
  ];
}

// //insert longitude and latitude to get weatheer from weather api
// async function getWeather(city){
//     // using try and catch to handlee error when the function runs. errors from getCoordinates can be caugth here.
//     try{
//         //get long and lat from getCoordinates()
//         const {lat, lon} = await getCoordinates(city);
//         //api for geting weather
//         const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`;
//         //fetch weather data from api
//         const response = await fetch(url);
//         //convert response to json
//         const weatherData = await response.json();
//         displayWeather(weatherData.current_weather, city);
//     } catch(error){
//           weatherForcast.innerHTML = `<p style=color:red;>{error.message}</p>`
//     }
// }

async function getWeather(city) {
  try {
    const { lat, lon } = await getCoordinates(city);

    const url =
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
  `&longitude=${lon}` +
  `&current_weather=true` +
  `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
  `&forecast_days=7` +
  `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API failed");
    }

    const weatherData = await response.json();

    if (!weatherData.current_weather) {
      throw new Error("Weather data unavailable");
    }
        displayWeather(weatherData, city);


  } catch (error) {
    weatherForcast.innerHTML =
      `<p style="color:red;">${error.message}</p>`;
  }
}


// Display weather
function displayWeather(data, city) {
  const current = data.current_weather;
  const tips = generateTravelTips(current.weathercode, current.temperature);
  const daily = data.daily;

  const currentCondition =
    weatherMap[current.weathercode] || { text: "Unknown", icon: "❓" };

  let dailyHTML = "";

  for (let i = 0; i < daily.time.length; i++) {

    const day = new Date(daily.time[i]).toLocaleDateString("en-US", {
      weekday: "long"
    });

    const condition =
      weatherMap[daily.weathercode[i]] || { text: "Unknown", icon: "❓" };

    dailyHTML += `
      <div class="day-card">
        <h4>${day}</h4>
        <span>${condition.icon}</span>
        <p>Max: ${daily.temperature_2m_max[i]}°C</p>
        <p>Min: ${daily.temperature_2m_min[i]}°C</p>
        <p>${condition.text}</p>
      </div>
    `;
  }


  

  weatherForcast.innerHTML = `
    <div class="weather-card">
      <h2>${city}</h2>
      <h3>Current Weather</h3>
      <span class="weather-icon">${currentCondition.icon}</span>
      <p>${current.temperature}°C</p>
      <p>${currentCondition.text}</p>
    </div>

    <div class="weekly-forecast">
      <h3>7-Day Forecast</h3>
      <div class="days-container">
        ${dailyHTML}
      </div>
    </div>
  `;


let tipsHTML = "";

tips.forEach(tip => {
  tipsHTML += `<li>${tip}</li>`;
});

TravelTips.innerHTML = `
  <div class="travel-tip-card">
    <h3>Travel Tips</h3>
    <ul>
      ${tipsHTML}
    </ul>
  </div>
`;


}



//search button event listener
searchBtn.addEventListener( "click",()=>{
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Enter key support
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});



const randomforcast = document.getElementById("randomforcast");


//create an array of 12 popular cities to travel to
const popularcities = ["Paris", "New York", "Tokyo", "Sydney", "Rome", "Barcelona", "Dubai", "Singapore", "Istanbul", "Bangkok", "Amsterdam", "Los Angeles,","Accra","Lagos","Jouhanesburg","Cairo"];

//function to get a random of 3 city to display on the homepage
function getRandomCities(cityList, count) {
 // create an array where random selectede city will be stored
 const  selected = [];
 //loop through the city list to we get any randomm therr
 while (selected.length < count) {
    //use random formula
    const randomIndex = Math.floor(Math.random()*cityList.length);
    //check if selected array has the city already
    if(!selected.includes(cityList[randomIndex])){
        selected.push(cityList[randomIndex])
    }
 }
 return selected;
}

function displayRandomCities() {

  randomforcast.innerHTML = ""; // clear container first

  const randomCities = getRandomCities(popularcities, 3);

  randomCities.forEach(city => {
    getWeather(city, displayRandomWeather);
  });
}


function displayRandomWeather(data, city) {
  const current = data.current_weather;

  const condition =
    weatherMap[current.weathercode] || { text: "Unknown", icon: "❓" };

  const html = `
    <div class="random-city-card">
      <h3>${city}</h3>
      <span>${condition.icon}</span>
      <p>${current.temperature}°C</p>
      <p>${condition.text}</p>
    </div>
  `;

  randomforcast.insertAdjacentHTML("beforeend", html);
}


window.addEventListener("DOMContentLoaded", () => {
  displayRandomCities();
});

