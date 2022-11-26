<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4&callback=initMap"></script>

var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";

x = navigator.geolocation;
x.getCurrentPosition(getUserLocation);

var userLat = position.coords.latitiude; //keep - finds user lat
var userLong = position.coords.longitude; //keep - finds user long
var userLocation = [userLat, userLong]; //use for origin in route duration - merges lat and long into usable data for user origin


 document.getElementById("button").addEventListener("click", routeDurationCalc); //event listener for when button is pressed to find user 

function routeDurationCalc () {

    var routeData = {  

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


