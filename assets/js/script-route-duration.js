var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";
x = navigator.geolocation;
x.getCurrentPosition(success, failure);

var global_userLat;
var global_userLong;
var origMap;

function success(position) {
  console.log("success");

  var userLat = position.coords.latitude; //keep - finds user lat
  var userLong = position.coords.longitude; //keep - finds user
  console.log(userLat);
  console.log(userLong);

  global_userLat = userLat;
  global_userLong = userLong;
  var userLocation = [userLat, userLong]; //use for origin in route duration - merges lat and long into usable data for user origin
  console.log(userLocation);

  var mapAttr = {
    zoom: 12,
    center: { lat: userLat, lng: userLong },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  origMap = new google.maps.Map(document.getElementById("origMap"), mapAttr);
  var userMarker = new google.maps.Marker({
    position: { lat: userLat, lng: userLong },
    origMap,
    title: "You're Here!",
  });

  window.initMap = this.initMap;
  userMarker.setMap(origMap);
}

function failure() {
  console.log("failure");
  //modal for "unable to find user"
}

var directionsService;
function initMap() {
  console.log("test");
  directionsService = new google.maps.DirectionsService();
}

document
  .getElementById("submitButton")
  .addEventListener("click", routeDuration); //event listener for when button is pressed to find user

var global_destLat;
var global_destLong;

function routeDuration() {
  console.log("enter destination and finding RD");

  var geoCoder = new google.maps.Geocoder();
  var userDestination = $("#dest-input").val();

  console.log(userDestination);
  geoCoder.geocode({ address: userDestination }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      global_destLat = results[0].geometry.location.lat();
      global_destLong = results[0].geometry.location.lng();
      console.log(results[0].geometry.location.lng() + "geocoded lng");
      console.log(results[0].geometry.location.lat() + "geocoded lat");
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  setTimeout(delayedDistanceMatrix, 1000);
}

//-------------------------------------------------------
function delayedDistanceMatrix() {
  var service = new google.maps.DistanceMatrixService();
  var origin = new google.maps.LatLng(global_userLat, global_userLong);
  var destination = new google.maps.LatLng(global_destLat, global_destLong);
  console.log(global_destLat);
  console.log(global_destLong);

  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
    },
    callback
  );
  setTimeout(directions, 3000);
}
function callback(response, status) {
  if (status == "OK") {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var results = response.rows[0].elements;

    for (var j = 0; j < results.length; j++) {
      var element = results[j];
      var distance = element.distance.text;
      var duration = element.duration.text;
      var from = origins[0];
      var to = destinations[j];
      localStorage.setItem("driving", duration.split(" ")[0]);
      console.log(duration);
    }
  }
}

var directionsRenderer = new google.maps.DirectionsRenderer();

function directions() {

  var directionsService = new google.maps.DirectionsService();
  directionsService.route(
    {
      origin: { lat: global_userLat, lng: global_userLong },
      destination: { lat: global_destLat, lng: global_destLong },
      travelMode: 'DRIVING'

    },
    (response, status) => {
      console.log(response);
      console.log(status);
    }
  )
  console.log(global_userLat);
  console.log(global_destLat)

  var userRoute = new google.maps.LatLng(global_userLat, global_userLong);
  var mapOptions = {
    zoom: 12,
    center: userRoute,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  directionsRenderer.setMap(origMap);

 
}

//directions function
//overlay on the mapgit pu

function calcRoute() {
  var start = { lat: global_userLat, lng: global_userLong };
  var end =  { lat: global_destLat, lng: global_destLong };
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  })
}