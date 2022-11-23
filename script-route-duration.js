<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4&callback=initMap"></script>

var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";

var destination = 



function getLocation() {
    document.getElementById(
        "buttonID").disabled = true;

    document.getElementById(
        "buttonID").innerHTML = "Executing..";

    if ("geolocation" in navigator) {
        navigator.geolocation
        .getCurrentPosition(function (position) {
            var currentLatitude 
                = position.coords.latitude;

            var currentLongitude 
                = position.coords.longitude;

            var infoLatLang = "Latitude: " 
                + currentLatitude +
                "<br>Longitude: " + 
                currentLongitude;

            var infoContent = 
                new google.maps.InfoWindow
                ({ map: map, content: infoLatLang });

            var currentLocation = {
                lat: currentLatitude,
                lng: currentLongitude
            };

            infoContent.setPosition(
                    currentLocation);
                      
            document.getElementById("buttonID")
                .style.display = 'none';
        });
    }
}// end function getLocation()

//--------------------usable data for locating user

// tracks user 
x = navigator.geolocation;
x.getCurrentPosition(getUserLocation);

var userLat = position.coords.latitiude; //keep - finds user lat
var userLong = position.coords.longitude; //keep - finds user long
var userLocation = [userLat, userLong];


 document.getElementById("button").addEventListener("click", routeDurationCalc); //event listener for when button is pressed to find user 

function routeDurationCalc () {

    var routeData = {  //use for origin in route duration - merges lat and long into usable data for user origin

        origin: userLocation,
        destination: document.getElementById("dest-input").value,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.IMPERIAL
    
    }

    directionsService.route(routeData, (result, status) => { 
            if (status == google.maps.DirectionStatus.Ok) { //find the distance and route diration

                const duration = document.querySelector("#duration");
                duration.innerHTML = "Your trip is " + result.routes[0].legs[0].distance.text + "long and will take " + result.routes[0].legs[0].duration.text + "!";

            }

    })

}

//event listener for when button is pressed to find user 



var userLocation = [userLat + userLong]; //use for origin in route duration - merges lat and long into usable data for user origin




//route duration 

//par - origin and dest 



