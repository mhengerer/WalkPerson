<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4&callback=initMap"></script>

var apiKey = "AIzaSyDjEs-V1HGJ2sUwaWta6FhTRjTmAyoNxd4";

x = navigator.geolocation;
x.getCurrentPosition();

var userLat = position.coords.latitiude; //keep - finds user lat
var userLong = position.coords.longitude; //keep - finds user long
var userLocation = [userLat, userLong]; //use for origin in route duration - merges lat and long into usable data for user origin



 document.getElementById("submitButton").addEventListener("click", routeDurationCalc); //event listener for when button is pressed to find user 

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

            } else {
                
            }

    })

}

var mapsetting = {

    center: myLatLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    
};


/*

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
 

//link the request to the original method (root)
directionService.route(request,(result, status)=>{
    if (status=== google.maps.directionStatus.Ok){
        // display the route and get distance and time
        const output = document.QuerySelector('#output');
        output.innerHTML = "< div class = 'alert-info '> From:"+document.getElementById('Start').value +".<br /> End:"+ document.getElementById('End').value + '<br / > Walking Distance:' + result.routes[0].legs[0].distance.text +".<br /> Duration:" + result.routes[0].legs[0].duration.text +".</div>";

        directionsDisplay.setDirections(result);
     } else{
        directionsDisplay.setDirections({routes:[]});

    }
}

*/

