// document.on('keydown', function(key){
//
// })

addEventListener('keydown', function(key){
  if(key.keyCode === 49){
    var rand = Math.floor(Math.random()*5);
    console.log(rand);
    console.log($('#currentSong'));
    $("#currentSong").attr("src","/audio/rock/"+rand+".mp3");
  }
});
