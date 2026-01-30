
//script to fetch and display members from the JSON file
const membersContainer = document.getElementById('members');
const dataUrl = "./scripts/data/members.json";

//function to shuffle members for random display 
function getRandomMembers(members, count = 3) {
  const shuffled = [...members].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function getMembers() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

     //Randomly select member of 3.
    const randomMembers = getRandomMembers(data.members, 3);
    displayMembers(randomMembers);

  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  let html = "";

  members.forEach(member => {
    html += `
      <section class="member-card">
        <section class="member-info">
            <h3>${member.companyName}</h3>
             <p>Membership Level: ${member.membershipLevel}</p>
        </section>
        <section class="member-details">
           <section class="member-logo">
            <img src="images/${member.image}" alt="${member.companyName} logo" loading="lazy" height="100" width="100">
              </section>
        <section class="member-contact">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </section>
        </section>
      </section>
    `;
  });


  membersContainer.innerHTML = html;
}

getMembers();




//api for weatther 
// Weather container
const weatherDetails = document.getElementById("weatherDetails");

// Open-Meteo API (Accra)
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=5.60&longitude=-0.18&current_weather=true";

// Weather code → description + icon
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

// Fetch weather data
async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data.current_weather);
  } catch (error) {
    console.error("Error loading weather:", error);
  }
}

// Display weather
function displayWeather(weather) {
  const condition = weatherMap[weather.weathercode] || {
    text: "Unknown",
    icon: "❓"
  };

  const html = `
    <div class="weather-card">
      <span class="weather-icon">${condition.icon}</span>
      <p class="weather-temp">${weather.temperature}°C</p>
      <p class="weather-text">${condition.text}</p>
    </div>
  `;

  weatherDetails.innerHTML = html;
}

// Call function
getWeather();





//weatheer forcast 
const forecastSection = document.getElementById("forecast");

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=5.60&longitude=-0.18&daily=temperature_2m_max&current_weather=true&temperature_unit=fahrenheit&timezone=auto';

async function getForecast() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        const daily = data.daily;
        const current = data.current_weather;

        // Get dates
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        // Next Wednesday
        const nextWednesday = new Date();
        nextWednesday.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
        const wedStr = nextWednesday.toISOString().split('T')[0];

        // Next Thursday
        const nextThursday = new Date();
        nextThursday.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));
        const thuStr = nextThursday.toISOString().split('T')[0];

        // Find indexes in API response
        const todayIndex = daily.time.indexOf(todayStr);
        const wedIndex = daily.time.indexOf(wedStr);
        const thuIndex = daily.time.indexOf(thuStr);

        // Build HTML
        let html = " ";
        html += `<p><strong>Today:</strong> ${current.temperature} °F</p>`;
        if(wedIndex !== -1){
            html += `<p><strong>Wednesday:</strong> ${daily.temperature_2m_max[wedIndex]} °F</p>`;
        }
        if(thuIndex !== -1){
            html += `<p><strong>Thursday:</strong> ${daily.temperature_2m_max[thuIndex]} °F</p>`;
        }

        forecastSection.innerHTML = html;

    } catch (error) {
        console.error("Error fetching forecast:", error);
        forecastSection.innerHTML = "<p>Unable to load forecast data.</p>";
    }
}

// Call function
getForecast();




//toogle for open and close button
const menuButton = document.querySelector("#menu");
const navvMenu = document.querySelector("#navvMenu");

//eventlistener to react to navbar on small screens 
menuButton.addEventListener( "click", ()=>{
    navvMenu.classList.toggle("show");
    menuButton.classList.toggle("show");
});


//grid and list toogle
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");
const members = document.querySelector(".members");


gridBtn.addEventListener("click", () => {
    members.classList.remove("list-view");
    members.classList.add("grid-view");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    members.classList.remove("grid-view");
    members.classList.add("list-view");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});
