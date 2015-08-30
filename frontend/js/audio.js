// document.on('keydown', function(key){
//
// })
addEventListener('keydown', function(key){
	if(lastChange + 5000 < Date.now()){
		var rand = Math.floor(Math.random()*5+1)
		var audio = document.getElementById('audio');
		var source = document.getElementById('currentSong');
		if(key.keyCode === 49){
					lastChange = Date.now();

		socket.emit("genreChange", {name: user.name, genre: "rock"});
		source.src= "/audio/rock/"+rand+".mp3"
		audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
		audio.play();
		}else if(key.keyCode === 50){
					lastChange = Date.now();

		socket.emit("genreChange", {name: user.name, genre: "country"});
		source.src= "/audio/country/"+rand+".mp3"
		audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
		audio.play();
		}else if(key.keyCode === 51){
					lastChange = Date.now();

		socket.emit("genreChange", {name: user.name, genre: "top40"})
		source.src= "/audio/top40/"+rand+".mp3"
		audio.load(); //call this to just preload the audio without playingaudio.play(); //ca
		audio.play();
		}
	}
});
