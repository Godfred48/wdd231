const params = new URLSearchParams(window.location.search);

document.getElementById("fname").textContent = params.get("fname") || "";
document.getElementById("lname").textContent = params.get("lname") || "";
document.getElementById("email").textContent = params.get("email") || "";
document.getElementById("phone").textContent = params.get("phone") || "";
document.getElementById("business").textContent = params.get("business") || "";

// Format timestamp nicely
const rawTime = params.get("timestamp");

if (rawTime) {
  const date = new Date(rawTime);
  document.getElementById("timestamp").textContent =
    date.toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short"
    });
} else {
  document.getElementById("timestamp").textContent = "Not available";
}
