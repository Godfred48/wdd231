    //script to dynamically set the current year in the footer
const year = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = year;

//script for the last modified date in the footer
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

//script to fetch and display members from the JSON file
const membersContainer = document.getElementById('members');
const dataUrl = "./scripts/data/members.json";

async function getMembers() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    displayMembers(data.members);
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



//api for weatther 
const weatherDetails = document.getElementById("weatherDetails");
const url = 'https://api.open-meteo.com/v1/forecast?latitude=5.60&longitude=-0.18&current_weather=true';

async function getWeather() {
    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        // Call displayWeather with the correct object
        displayWeather(weatherData.current_weather);

    } catch (error) {
        console.error("Error loading weather:", error);
    }
}

function displayWeather(weather) {
    // Build HTML string
    const html = `
        <p>Temperature: ${weather.temperature} °C</p>
        <p>Wind Speed: ${weather.windspeed} km/h</p>
        <p>Wind Direction: ${weather.winddirection}°</p>
        <p>Time: ${weather.time}</p>
    `;

    weatherDetails.innerHTML = html;
}

// Call the async function
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
