//Todo: create object type directionServices & call directionService.route()
// initiate a request to the Directions service, passing it a DirectionsRequest object
//literal containing the input terms and a callback method to execute upon receipt of the response.

//The DirectionsRequest object literal contains the following fields:

//part of script file for destination API-lines 8-22-Patrick
// {
//     origin: LatLng | String | google.maps.Place,
//     destination: LatLng | String | google.maps.Place,
//     travelMode: TravelMode,
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     waypoints[]: DirectionsWaypoint,
//     optimizeWaypoints: Boolean,
//     provideRouteAlternatives: Boolean,
//     avoidFerries: Boolean,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//     region: String
//   }

// I NEED TO SEE HOW TO UTILIZE THE ABOVE CODE IN THE MAP INFORMATION

// SET COORIDNATES FOR UNC-CHARLOTTE, ALREADY SET IN API ADDRESS BUT DOING THIS AS A DEFAULT.
var lat,lng = {
lat: 35.3071,
lng: -80.7352
};
var mapsetting ={
    center: myLatLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
 // map should already be linked through HTML

 // insert direction service object use root method to get result 
 var directionService = new google.maps.maps.directionService();
 // direction render object used to display the root 
 var directionsRenderer = new google.maps.DirectionsRenderer();
 // call the directions to the map 
 directionsDisplay.setMap(Map);
 // create a function for route calculation
 function calcRoute(){
    var request = {
        unitSystem:google.maps.unitSystem.IMPERIAL,
        travel: google.maps.TravelMode.walking,
        origin: document.getElementbyID('start').value,
        destination:document.getElementbyID('end').value
    }
 }  
//link the request to the original method (root)


//get distance and time

// display the route 

// remove route from map

// center map at UNCC 
 