  // Timestamp when page loads
  //document.getElementById("timestamp").value = new Date().toISOString();


  
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
}

// Back to home
function goHome() {
  window.location.href = "index.html";
}
