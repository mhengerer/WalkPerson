var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";
x = navigator.geolocation;
x.getCurrentPosition (success, failure); 

var global_userLat;
var global_userLong;
var origMap;

function success (position) {
console.log("success")

var userLat = position.coords.latitude; //keep - finds user lat
var userLong = position.coords.longitude; //keep - finds user 
console.log(userLat)
console.log(userLong)

global_userLat = userLat;
global_userLong = userLong;
var userLocation = [userLat,userLong]; //use for origin in route duration - merges lat and long into usable data for user origin
console.log(userLocation)

var mapAttr = {
    zoom: 12, 
    center: {lat:userLat, lng:userLong}, 
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

origMap = new google.maps.Map(document.getElementById("origMap"), mapAttr);
var userMarker = new google.maps.Marker ({
    position: {lat:userLat, lng:userLong},
    origMap,
    title:"You're Here!"
});

window.initMap = this.initMap;
userMarker.setMap(origMap);

}


function failure () {
    console.log("failure")
    //modal for "unable to find user"
}

var directionsService 
function initMap () {
    console.log('test')
    directionsService = new google.maps.DirectionsService()
}

document.getElementById("submitButton").addEventListener("click", routeDuration); //event listener for when button is pressed to find user 
 //disable refresh 

 function routeDuration() {
   console.log("enter destination and finding RD");
   var userDestination = document.getElementById("dest-input").value;
   console.log(userDestination);
   var routeData = {
     origin: { lat: global_userLat, lng: global_userLong },
     destination: userDestination,
     travelMode: google.maps.TravelMode.DRIVING,
     unitSystem: google.maps.UnitSystem.IMPERIAL,
   };

   var directionsService = new google.maps.DirectionsService();
   var request = {
     origin: {lat: global_userLat, lng: global_userLong}
     destination: destination, // LatLng|string
     travelMode: google.maps.DirectionsTravelMode.DRIVING,
   };
   directionsService.route(routeData, (result, status) => {
     if (status == origMap.maps.DirectionStatus.Ok) {
       //find the distance and route diration
       const duration = document.querySelector("#duration");

       duration.innerHTML =
         "Your trip is " +
         result.routes[0].legs[0].distance.text +
         "long and will take " +
         result.routes[0].legs[0].duration.text +
         "!";

       directionsDisplay.setDirections(result);
     } else {
       directionsDisplay.setDirections({ routes: [] });
     }
   });
 }

//route duration in miliseconds and pushed to local storage


/*
function myMap() {
var mapProp= {
  center: userLocation,
  zoom:12,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
*/
//let latLngArray = [];
//for (let i = 0; i < array.length; i++) {
  //const gData = new google.maps.LatLng(array[i][0], array[i][1]);
  //latLngArray.push(gData);
//}