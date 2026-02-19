    //script to dynamically set the current year in the footer
const year = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = year;

//script for the last modified date in the footer
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

//toogle for open and close button
const menuButton = document.querySelector("#menu");
const mobileNav = document.querySelector(".mobileNav");

//eventlistener to react to navbar on small screens 
menuButton.addEventListener( "click", ()=>{
    mobileNav.classList.toggle("show");
    menuButton.classList.toggle("show");
});
