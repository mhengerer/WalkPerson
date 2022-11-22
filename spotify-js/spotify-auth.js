//Global variables to store user IDs
var authToken = ''; 
var username = '';
var name = '';

//Creates Spotify authentication link, redirects there, and sends the user back
function spotifyAuth() {
    //Application ID for Spotify
    var client_id = '5ecfa1d90ccc4d07be652c727956201c';
    //Site to redirect back to
    var redirect_uri = 'http://127.0.0.1:5500/';

    //Permissions
    var scope = 'user-read-private user-read-email';

    //Builds authentication URL
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    console.log(url);
    // window.location.replace(url);
}

// Gets full hash info from URL and splits out the access token
function getAccessTokenFromUrl() {
    var hash = window.location.hash.substring(1);
    var hash1 = hash.split('=')[1];
    var hash2 = hash1.split('&')[0];
    console.log(hash2);
}

// Use as a model for creating a playlist
// Figure out what callback parameter
function createPlaylist(username, name, callback) {
	console.log('createPlaylist', username, name);
    // POST URL
	var url = 'https://api.spotify.com/v1/users/' + username +
		'/playlists';
	$.ajax(url, {
		method: 'POST',
		data: JSON.stringify({
			'name': name,
			'public': false
		}),
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token,
			'Content-Type': 'application/json'
		},
		success: function(r) {
			console.log('create playlist response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}

