window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: ''
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  
  var spotifyUri = localStorage.getItem('spotify_uri') ? '':
  localStorage.getItem('spotify_uri'); 

  function getURI() {
    if(playlistId){
        return playlistId; 
    } else {
        setTimeout(getURI, 4000); 
    }
}