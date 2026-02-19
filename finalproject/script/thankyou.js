const message = document.getElementById("thankYouMessage");

// Get stored name
const storedName = localStorage.getItem("voyageUserName");

if (storedName) {
    message.textContent = `Thank you, ${storedName}!`;
    
    // Optional: clear storage after displaying
    localStorage.removeItem("voyageUserName");
}
