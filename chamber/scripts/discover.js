import { places } from "../scripts/data/discover.mjs";

const container = document.getElementById("discoverContainer");

// Build Cards
places.forEach((place, index) => {
  const card = document.createElement("div");
  card.classList.add("discover-card");
  card.style.gridArea = `card${index + 1}`;

  card.innerHTML = `
    <h2 class="place">${place.name}</h2>
    <figure class="place-image">
        <img src="${place.image}" alt="${place.name}" loading="lazy" class="place-image">
    </figure>
    <address class="address">${place.address}</address>
    <p class="description">${place.description}</p>
  `;

  container.appendChild(card);
});

// LOCAL STORAGE VISIT MESSAGE
const messageBox = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageBox.textContent = "You last visited 1 day ago.";
  } else {
    messageBox.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
