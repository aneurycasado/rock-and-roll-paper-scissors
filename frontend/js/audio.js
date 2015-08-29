// document.on('keydown', function(key){
//
// })

addEventListener('keydown', function(key){
  var rand = Math.floor(Math.random()*5+1)
  var audio = document.getElementById('audio');
  var source = document.getElementById('currentSong');
  if(key.keyCode === 49){
    $("#genre").html("rock");
    source.src= "/audio/rock/"+rand+".mp3"
    audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
    audio.play();
  }else if(key.keyCode === 50){
    $("#genre").html("country");
    source.src= "/audio/country/"+rand+".mp3"
    audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
    audio.play();
  }else if(key.keyCode === 51){
    $("#genre").html("top40");
    source.src= "/audio/top40/"+rand+".mp3"
    audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
    audio.play();
  }

});
