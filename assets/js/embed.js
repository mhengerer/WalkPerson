var embedSizeEl = document.getElementById('style');

var mediaQuery = window.matchMedia('(min-width: 768px)')

function getPlaylistFromStorage() {
  var spotifyUri = localStorage.getItem('spotify_uri'); 

  var slash = spotifyUri
  var slash1 = spotifyUri.split(':')[2];
  console.log(slash1);
  makeURL(slash1);

  function getURI() {
    if(playlistId){
        return playlistId; 
    } else {
        setTimeout(getURI, 4000); 
    }
}}

function makeURL(slash1) {
  var spotURL = "https://open.spotify.com/embed/playlist/" + slash1
  console.log(spotURL);
  putURLinHTML(spotURL);
}

function putURLinHTML(spotURL) {
  embedSizeEl.src = spotURL
};

getPlaylistFromStorage();



function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    embedSizeEl.style["width"] = "768px";
  }
  else {
    embedSizeEl.style["width"] = "375px"
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)