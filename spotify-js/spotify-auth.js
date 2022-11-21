function spotifyAuth() {
    var client_id = '5ecfa1d90ccc4d07be652c727956201c';
    var redirect_uri = 'http://127.0.0.1:5500/';

    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    window.location.replace(url);
}

function getAccessTokenFromUrl() {
    var queryString = window.location.search; 
    var urlObj = new URL(queryString); 
    console.log(urlObj.hash);
}
