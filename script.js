// ==========================================
// BEASTOR TRANSIT - JAVASCRIPT
// ==========================================


// ==========================================
// 1. TRACK BUS BUTTON
// ==========================================

const trackBtn = document.getElementById("trackBtn");

if (trackBtn) {

    trackBtn.addEventListener("click", function () {

        const mapSection =
            document.querySelector(".tracking-section");

        mapSection.scrollIntoView({
            behavior: "smooth"
        });

    });

}


// ==========================================
// 2. SEARCH BUS
// ==========================================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", function () {

        const from =
            document.getElementById("fromInput").value.trim();

        const to =
            document.getElementById("toInput").value.trim();


        // Check empty fields

        if (from === "" || to === "") {

            alert(
                "Please enter both From and To locations."
            );

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

}


// ==========================================
// 3. VIEW BUS BUTTONS
// ==========================================

const viewButtons =
    document.querySelectorAll(".viewBtn");


viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const busCard =
            button.parentElement;

        const busName =
            busCard.querySelector("h3").innerText;


        alert(
            "You selected " +
            busName +
            ".\nLive tracking will be available soon!"
        );

    });

});


// ==========================================
// 4. CREATE REAL MAP
// ==========================================

// Create map

const map = L.map("map").setView(
    [25.5941, 85.1376],
    13
);


// Add OpenStreetMap tiles

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// ==========================================
// 5. TEST BUS
// ==========================================

// Test bus location

const bus =
    L.marker([25.5941, 85.1376])
        .addTo(map);


// Bus information

bus.bindPopup(`
    <b>🚌 Beastor Bus 101</b>
    <br>
    Route: City Center → Railway Station
    <br>
    Status: Active
    <br>
    ETA: 8 minutes
`);


// ==========================================
// 6. DRIVER GPS LOCATION
// ==========================================

// Store driver marker

let driverMarker = null;


// Get driver's current location

function getDriverLocation() {

    // Check GPS support

    if (!navigator.geolocation) {

        alert(
            "GPS is not supported by this browser."
        );

        return;
    }


    // Get current position

    navigator.geolocation.getCurrentPosition(

        // SUCCESS

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            console.log(
                "Driver Latitude:",
                latitude
            );

            console.log(
                "Driver Longitude:",
                longitude
            );


            // Move map to driver

            map.setView(
                [latitude, longitude],
                16
            );


            // If marker already exists,
            // update its position

            if (driverMarker) {

                driverMarker.setLatLng([
                    latitude,
                    longitude
                ]);

            }

            // Otherwise create marker

            else {

                driverMarker =
                    L.marker([
                        latitude,
                        longitude
                    ])
                    .addTo(map);

            }


            // Update popup

            driverMarker
                .bindPopup(`
                    <b>📍 Driver Location</b>
                    <br>
                    Latitude:
                    ${latitude.toFixed(5)}
                    <br>
                    Longitude:
                    ${longitude.toFixed(5)}
                `)
                .openPopup();

        },


        // ERROR

        function (error) {

            console.error(
                "GPS Error:",
                error
            );


            alert(
                "Unable to get your location.\n\n" +
                "Please allow location permission."
            );

        }

    );

}


// ==========================================
// 7. GET MY LOCATION BUTTON
// ==========================================

const locationBtn =
    document.getElementById("locationBtn");


if (locationBtn) {

    locationBtn.addEventListener(
        "click",
        function () {

            getDriverLocation();

        }
    );

}


// ==========================================
// 8. WEBSITE LOADED
// ==========================================

console.log(
    "================================"
);

console.log(
    "Beastor Transit loaded successfully!"
);

console.log(
    "================================"
);