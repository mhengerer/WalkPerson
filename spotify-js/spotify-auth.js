//Global variables to store user IDs
var authToken = 'BQAh2hhXV-SjzZ58sebizDcNhOJ5-WBghU4aL9LrWnRTgdX-yAyfy4WPDllnytvXeX5LQn7epGaf1Jt3mAGif-rqnXbMf6LdeUiiJDiPnjUmyO7sD7PyaLhOaUnfUZn19mpMLTrCSF-83N9XFwLAKiEowbyBHHlvzymXE0ude4M2vtNCs93g9JVN7ggvTd1cKRWczWuhIU2jwsNc9op1sp7Ki4SJyl_WVvPkEHA9VVueJ_UQvaVibpmmjcM'; 
var username;
var name = '';
var feedback = null; 

//Creates Spotify authentication link, redirects there, and sends the user back
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


// Use as a model for creating a playlist
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
          } else {
            //alert('Error: ' + response.statusText);
          }
        })
        .catch(function (error) {
          alert('Unable to connect to GitHub');
    });
}

function setUsername(dataId) {
    username = dataId;
    console.log(username);
}