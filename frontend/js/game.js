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

socket.on("update_clients", function(data){
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
    ctx.fillStyle = "rgb(100, 180, 100)";

	ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(255, 255, 255)";

	for(var name in players){
		ctx.fillRect(players[name].x, players[name].y, 32, 32);
		ctx.fillText(players[name].name, players[name].x -9, players[name].y - 8);
	}

};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

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
