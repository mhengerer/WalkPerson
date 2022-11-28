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


 function routeDuration() {
   console.log("enter destination and finding RD");

   var geoCoder = new google.maps.Geocoder();
   var userDestination = $('#dest-input').val();
   console.log(userDestination);
   geoCoder.geocode( { 'address': userDestination}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        destLat = results[0].geometry.location.lat();
        destLong = results[0].geometry.location.lng();
    } else {
    alert('Geocode was not successful for the following reason: ' + status);
    }
  })
  
  var destLat;
  var destLong;
  //-------------------------------------------------------
  var service = new google.maps.DistanceMatrixService();
  var origin = new google.maps.LatLng(global_userLat,global_userLong);
  var destination = new google.maps.LatLng(destLat,destLong);
  console.log(destination)
  console.log(origin)

  service.getDistanceMatrix(
    {
      origins: {lat:global_userLat, lng:global_userLong},
      destinations: {lat:destLat, lng:destLong},
      travelMode: 'DRIVING'
    })
    

   var routeData = {
     origin: { lat: global_userLat, lng: global_userLong },
     destination: userDestination,
     travelMode: google.maps.TravelMode.DRIVING,
     unitSystem: google.maps.UnitSystem.IMPERIAL,
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