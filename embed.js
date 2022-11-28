window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:playlist:0c6xIDDpzE81m2q797ordA'
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  var spotifyUri = localStorage.getItem('spotify_uri') ? '0c6xIDDpzE81m2q797ordA':
  localStorage.getItem('spotify_uri'); 
  

  //variables

  var userChoice;

  //element selectors

  valEl1=document.getElementById('#1')
  valEl2=document.getElementById('#2')
  valEl3=document.getElementById('#3')



  //const


  //functions


  //if statement
  /*if(userChoice==='pop'){

  }else if(userChoice==='rock'){
    
  }else{
    'hip-hop'

  }*/


  //when user selects choice


  //playlist should be given to them with songs to match coice


  //variable(s)

  //element(s)

  //function(s)

  
  
  
  
  // here is a comment.
  
  
  
  
  


  

