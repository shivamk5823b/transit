// ==========================================
// BEASTOR TRANSIT - JAVASCRIPT
// ==========================================


// ==========================================
// 1. TRACK BUS BUTTON
// ==========================================

const trackBtn = document.getElementById("trackBtn");

trackBtn.addEventListener("click", function () {

    // Find the map section
    const mapSection = document.querySelector(".tracking-section");

    // Scroll smoothly to the map
    mapSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ==========================================
// 2. SEARCH BUS
// ==========================================

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    // Get values from input boxes
    const from = document.getElementById("fromInput").value;
    const to = document.getElementById("toInput").value;


    // Check if user entered both locations
    if (from === "" || to === "") {

        alert("Please enter both From and To locations.");

        return;
    }


    // Show search result
    alert(
        "Searching buses from " +
        from +
        " to " +
        to
    );

});


// ==========================================
// 3. VIEW BUS BUTTONS
// ==========================================

// Get all View Bus buttons
const viewButtons = document.querySelectorAll(".viewBtn");


// Add click event to every button
viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get the bus card containing the clicked button
        const busCard = button.parentElement;

        // Get bus name
        const busName = busCard.querySelector("h3").innerText;

        // Show message
        alert(
            "You selected " +
            busName +
            ".\nLive tracking will be available soon!"
        );

    });

});


// ==========================================
// 4. WEBSITE LOADED MESSAGE
// ==========================================

console.log("Beastor Transit loaded successfully!");


// ==========================================
// 5. TEST FUNCTION
// ==========================================

function sayHello() {

    console.log("Welcome to Beastor Transit!");

}


// Call the function
sayHello();
// ==========================================
// 6. CREATE REAL MAP
// ==========================================

// Create the map
const map = L.map("map").setView([25.5941, 85.1376], 13);


// Add OpenStreetMap tiles
L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);


// ==========================================
// 7. ADD TEST BUS
// ==========================================

const bus = L.marker([25.5941, 85.1376])
    .addTo(map);


// Add information to bus marker
bus.bindPopup(`
    <b>🚌 Beastor Bus 101</b>
    <br>
    Route: City Center → Railway Station
    <br>
    Status: Active
`);