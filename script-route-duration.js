<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4&callback=initMap"></script>

var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";

var destination = 

//code to locate user 
//pick apart, indicate what does what, decide what methods fit project needs
/*var map;
function initMap() {

    /* Access of single map object instance
    var mapContainer = document
        .getElementById("mapDivId");

    var coordinates = new 
        google.maps.LatLng(17.457427, 78.284296);
          
    var defaultOptions = {
        center: coordinates,

        /* Setting the initial resolution 
        zoom: 4
    }

    map = new google.maps.Map(
            mapContainer, defaultOptions);
} 
// end initMap() function */

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

x.getCurrentPosition(success, failure);

function success(position) {

    var userLat = position.coords.latitiude //keep - finds user lat

    var userLong = position.coords.longititude //keep - finds user long

    var userCoords = new google.maps.LatLong(userLat,userLong); //use for origin in route duration - merges lat and long into usable data for user origin

    var mapOptions = { //

        zoom: 10,
        center: userCoords, 
        mapTypeId: google.maps.mapTypeId.ROADMAP

    }

    var map = new google.maps.Map(document.getElementById('map'),mapOptions)

    var marker = new google.maps.Marker( {
        
        map: map,
        position: coords

    });

}

var userCoords = new google.maps.LatLong(userLat,userLong);

//route duration 

//par - origin and dest 

methods: {

    submitButtonClick () {
        const routeURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=${'


    }



}

