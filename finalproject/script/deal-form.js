const form = document.getElementById("dealForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const userName = document.getElementById("name").value;

    // Save name to localStorage
    localStorage.setItem("voyageUserName", userName);

    // Redirect to thank you page
    window.location.href = "thankyou.html";
});
