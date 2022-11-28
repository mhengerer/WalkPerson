window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:playlist:37i9dQZF1E8PZ9iWPGSv8Y'
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  