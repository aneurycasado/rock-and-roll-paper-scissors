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

	var text = ("Listening to: ") + (user.genre ? user.genre : "nothing");

	ctx.font="30px Arial";
	ctx.fillText((user.x / 40) , 100, 100);

	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillText(text, 40, 40);

	for(var name in players){

		if(players[name].dead) continue;

		ctx.shadowColor = "white"; // string
			//Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
		ctx.shadowOffsetX = 0; // integer
			//Horizontal distance of the shadow, in relation to the text.
		ctx.shadowOffsetY = 0; // integer
			//Vertical distance of the shadow, in relation to the text.
		ctx.shadowBlur = 80; // integer
			//Blurring effect to the shadow, the larger the value, the greater the blur.

		if(!players[name].genre) ctx.fillStyle = "rgb(255, 255, 255)";
		else if(players[name].genre == "rock") ctx.fillStyle = "rgb(100, 255, 255)";
		else if(players[name].genre == "country") ctx.fillStyle = "rgb(255, 100, 255)";
		else if(players[name].genre == "top40") ctx.fillStyle = "rgb(255, 255, 100)";

		ctx.fillRect(players[name].x, players[name].y, players[name].width, players[name].height);

		ctx.font="8px Arial";
		ctx.fillText(players[name].name, players[name].x -9, players[name].y - 8);

	}

	ctx.shadowColor = "none";// string
	ctx.shadowBlur = 0; // integer

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
