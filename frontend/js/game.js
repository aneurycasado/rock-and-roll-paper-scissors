var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var socket = io.connect(window.location.hostname + ":3000");
socket.on('connect', function(data) { });
socket.on('error', function() { console.error(arguments) });
socket.on('message', function() { console.log(arguments) });

var players = {};
socket.emit("songsAdded",players);
socket.on("update_clients", function(data){
	
	user = data[user.name];
	players = data;
});

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var URI = window.location.pathname.split( '/' );

user = {
	name: URI[URI.length-1],
	speed: 250,
};


// Update game objects
var update = function (modifier) {

	var amount;
	var direction;
	var moved = false;
	if (38 in keysDown) { // Player holding up
		amount = user.speed * modifier;
		direction = "up";
		moved = true;
	}
	if (40 in keysDown) { // Player holding down
		amount = user.speed * modifier;
		direction = "down";
		moved = true;
	}
	if (37 in keysDown) { // Player holding left
		amount = user.speed * modifier;
		direction = "left";
		moved = true;
	}
	if (39 in keysDown) { // Player holding right
		direction = "right";
		amount = user.speed * modifier;
		moved = true;
	}

	if(moved){

		socket.emit("move_input", {amount: amount, direction: direction, name: user.name})
	}


};

// Draw everything
var render = function () {
	
    ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.font="30px Arial";
	ctx.fillStyle = "rgb(200, 255, 255)";
	ctx.fillText(players[user.name].genre, 20, 20);

	for(var name in players){
		
		if(!players[name].genre) ctx.fillStyle = "rgb(255, 255, 255)";
		else if(players[name].genre == "rock") ctx.fillStyle = "rgb(100, 255, 255)";
		else if(players[name].genre == "country") ctx.fillStyle = "rgb(255, 100, 255)";
		else if(players[name].genre == "top40") ctx.fillStyle = "rgb(255, 255, 100)";

		ctx.fillRect(players[name].x, players[name].y, players[player.name].width, players[player.name].height);
		
		ctx.font="8px Arial";
		ctx.fillText(players[name].name, players[name].x -9, players[name].y - 8);
	}

};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	
	if(players[user.name]){
		update(delta / 1000);
		render();
	
	}

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();
