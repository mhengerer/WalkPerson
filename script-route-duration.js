<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4&callback=initMap"></script>

var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";

x = navigator.geolocation;
x.getCurrentPosition();

var userLat = position.coords.latitiude; //keep - finds user lat
var userLong = position.coords.longitude; //keep - finds user long
var userLocation = [userLat, userLong]; //use for origin in route duration - merges lat and long into usable data for user origin
var userDestination = document.getElementById("dest-input").value;


 document.getElementById("submitButton").addEventListener("click", initMap); //event listener for when button is pressed to find user 

function initMap () {

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


function myMap() {
var mapProp= {
  center:new google.maps.LatLng(userLocation, userDestination),
  zoom:5,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);


renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4Y&callback=initMap");
    window.initMap = this.initMap;
  }
}





 // map should already be linked through HTML

 // insert direction service object use root method to get result 
 var directionService = new google.maps.maps.DirectionService();

 // direction render object used to display the root 
 var directionsRenderer = new google.maps.DirectionsRenderer();

 // call the directions to the map 
 directionsDisplay.setMap(Map);
 

var mapsetting = {

    center: myLatLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};




