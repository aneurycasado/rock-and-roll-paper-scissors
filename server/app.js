var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // Create an express app!
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server, { log: false });
function Player(x, y, speed, name){
    this.name = name;
    this.speed = speed; // movement in pixels per second
    this.x = 32 + (Math.random() * (800));
    this.y = 32 + (Math.random() * (500));
}
var players = {};
io.sockets.on("connection",function(socket){


});
module.exports = app; // Export it so it can be require('')'d
// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../frontend');
// The path of our index.html file. ([ROOT]/index.html)
var indexHtmlPath = path.join(__dirname, '../index.html');

// http://nodejs.org/docs/latest/api/globals.html#globals_dirname
// for more information about __dirname

// http://nodejs.org/api/path.html#path_path_join_path1_path2
// for more information about path.join

// When our server gets a request and the url matches
// something in our public folder, serve up that file
// e.g. angular.js, style.css
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(publicPath));

// If we're hitting our home page, serve up our index.html file!
app.get('/:name', function (req, res) {
    var name = req.params.name;
    var newPlayer = new Player(0,0,200,name);
    players[name] = newPlayer;
    console.log(players);
    res.sendFile(indexHtmlPath);
});

app.use(function (req, res, next) {
	console.log('made it')
	next();
});
