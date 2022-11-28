window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:playlist:'
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

