
//Global variables to store user IDs
var authToken = getAccessTokenFromUrl();
console.log(authToken);
var authTokenActive; // Boolean that resets once 3600 seconds are over
var feedback = null;
var tracks; // 
console.log("Tracks var: " + tracks);
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
    if(!window.location.hash) {
        spotifyAuth();
    }
    var hash = window.location.hash.substring(1);
    var hash1 = hash.split('=')[1];
    var hash2 = hash1.split('&')[0];
    return hash2;
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
            'name': 'WalkPerson Playlist',
            'description': 'Test',
            'public': false
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

function setTracks(dataTracks) {
    tracks = dataTracks;
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

// Returns a list of recommendations based on the search parameters in the URL
// TODO: Link to addTracks() to fill playlist with recommended tracks
function getRecommendations(genre) {
    var url = 'https://api.spotify.com/v1/recommendations?';
    //Search parameters for getting recommendations from Spotify
    const LIMIT = 20; // # of songs to recommend
    const MARKET = 'US'; // Country to select songs from
    const SEED_ARTISTS = '4NHQUGzhtTLFvgF5SZesLK'; // Artist seed
    const SEED_GENRES = encodeURIComponent('metal, pop, dubstep'); //Genre seed
    const SEED_TRACKS = '0c6xIDDpzE81m2q797ordA'; //Tracks seed
    const MIN_DURATION_MS = 120000; // Minimum song duration (in ms)
    const MAX_DURATION_MS = 240000; // Maximum song duration (in ms)
    const MIN_ENERGY = 0.6; // "Energy" level of the song, between 0 and 1
    const MIN_POPULARITY = 70; // Popularity level of the song, between 0 and 100 

    url += 'limit=' + LIMIT;
    url += '&market=' + MARKET;
    url += '&seed_artists=' + SEED_ARTISTS;
    url += '&seed_genres=' + SEED_GENRES;
    url += '&seed_tracks=' + SEED_TRACKS;
    url += '&min_duration_ms=' + MIN_DURATION_MS;
    url += '&max_duration_ms=' + MAX_DURATION_MS;
    url += '&min_energy=' + MIN_ENERGY;
    url += '&min_popularity=' + MIN_POPULARITY;

    // url = 'https://api.spotify.com/v1/recommendations?limit=20&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=metal%2C%20pop%2C%20dubstep&seed_tracks=0c6xIDDpzE81m2q797ordA&min_duration_ms=120000&max_duration_ms=240000&min_energy=0.6&min_popularity=70';
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                tracks = data;
            });
        }
    })
    console.log("Updated tracks: " + JSON.stringify(tracks));
}

//Runs Spotify log-in if there is no hash in the URL
getAccessTokenFromUrl();