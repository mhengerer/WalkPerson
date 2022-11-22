//Global variables to store user IDs
var authToken = 'BQBqhhECrB6x0qAA0LgQiwOtTj_KHB36aHQzIht0UDshbbX0ADzlXmQIstIovNvmRJmZ4PZ---u9rANCXYIWjqugbaaYF0IAylE0BUXAaXKy9XigmixkWgHWJI7iskQ7IhyJWRJAjNMjlFNs81PZQ7U0kyZG64kYztwe_6KqDnDHtjM_zrurlibwvvTBcz3sQ_KYNKqPLWLACR6EWectjoOlHpIcbVvkNqR0jltb6cuHPe1poZAUAkmIHqQ'; 
var username;
var feedback = null; 
var tracks = [];
var genres = getGenreList(); 
var trackRecomm = getRecommendations();

// Creates Spotify authentication link, redirects there, and sends the user back
function spotifyAuth() {
    //Application ID for Spotify
    var client_id = '5ecfa1d90ccc4d07be652c727956201c';
    //Site to redirect back to
    var redirect_uri = 'http://127.0.0.1:5500/';

    //Permissions
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    //Builds authentication URL
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    console.log(url);
    window.location.replace(url);
}

// Gets full hash info from URL and splits out the access token
function getAccessTokenFromUrl() {
    var hash = window.location.hash.substring(1);
    var hash1 = hash.split('=')[1];
    var hash2 = hash1.split('&')[0];
    console.log(hash2);
}

// Creates a blank playlist under the authorized user account 
function createPlaylist() {
	console.log('createPlaylist', username);
    // POST URL
	var url = 'https://api.spotify.com/v1/users/' + username +
		'/playlists';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            'name':'WalkPerson Playlist',
            'description':'Test',
            'public':false 
        }),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) => response.json())
    .then((data) => console.log(data));
}

// Gets username after OAuth token is generated
// Whole user profile is returned from API call  
function getUsername() {
	console.log('getUsername');
	var url = 'https://api.spotify.com/v1/me';
	fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              setUsername(data.id);
            });
          }
    });
}

// Helper function to set username to global variable for use in other functions
function setUsername(dataId) {
    username = dataId;
    console.log(username);
}

// Add tracks to a generated playlist 
// TODO: Logic on syncing # of tracks added with walk length 
// TODO: Make this work
function addTracks(username, playlist, tracks) {
    console.log('getUsername');
    var url = 'https://api.spotify.com/v1/users/' + username +
    '/playlists/' + playlist + '/tracks';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(tracks),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) => response.json())
    .then((data) => console.log(data));
}

//Returns a list of genre tags from Spotify 
function getGenreList() {
    console.log('getGenreList'); 
    var url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'; 
	fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
              return (data);
            });
          }
    });
}

//Returns a list of recommendations based on the search parameters in the URL
// TODO: Break URL down into pieces to easily change variables 
// TODO: Link to addTracks() to fill playlist with recommended tracks 
function getRecommendations(genre) {
    var url = 'https://api.spotify.com/v1/recommendations?'; 
    //Search parameters for getting recommendations from Spotify
    var limit = 20; // # of songs to recommend 
    var market = 'US'; // Country to select songs from
    var seed_artists = '4NHQUGzhtTLFvgF5SZesLK'; // Artist seed 
    var seed_genres = encodeURI('metal, pop, dubstep'); //Genre seed 
    var seed_tracks = '0c6xIDDpzE81m2q797ordA'; //Tracks seed
    var min_duration_ms = 120000; // Minimum song duration (in ms)
    var max_duration_ms = 240000; // Maximum song duration (in ms)
    var min_energy = 0.6; // "Energy" level of the song, between 0 and 1
    var min_popularity = 70; // Popularity level of the song, between 0 and 100 

    // TODO: Make this thing actually work, currently using a hard-coded URL below
    // url += 'limit=' + limit; 
    // url += '&market=' + market; 
    // url += '&seed_artists=' + seed_artists; 
    // url += '&seed_genres=' + seed_genres; 
    // url += '&seed_tracks=' + seed_tracks; 
    // url += '&min_duration_ms=' + min_duration_ms; 
    // url += 'max_duration_ms=' + max_duration_ms; 
    // url += '&min_energy=' + min_energy; 
    // url += '&min_popularity=' + min_popularity;

    url = 'https://api.spotify.com/v1/recommendations?limit=20&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=metal%2C%20pop%2C%20dubstep&seed_tracks=0c6xIDDpzE81m2q797ordA&min_duration_ms=120000&max_duration_ms=240000&min_energy=0.6&min_popularity=70';

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
            });
          }
    })
}