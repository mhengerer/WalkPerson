window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:playlist:37i9dQZF1DX0XUsuxWHRQd'
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  //variables

  var userChoice;

  //element selectors


  //const


  //if statement
  /*if(userChoice==='pop'){

  }else if(userChoice==='rock'){
    
  }else{
    'hip-hop'

  }*/


  //when user selects choice


  //playlist should be given to them with songs to match coice

