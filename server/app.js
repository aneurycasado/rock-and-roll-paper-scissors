var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // Create an express app!
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server, { log: false });
io.set('log level', 0); // reduce logging

function Player(x, y, speed, name){
    this.name = name;
    this.speed = speed; // movement in pixels per second
    this.x = 32 + (Math.random() * (800));
    this.y = 32 + (Math.random() * (500));
    this.width = 32;
    this.height = 32;
}

function collison(smaller, bigger, padding){
    if( (smaller.x >= bigger.x + padding.x && smaller.x <= bigger.x + bigger.width - padding.x) || (smaller.x + smaller.width >= bigger.x + padding.x && smaller.x + smaller.width <= bigger.x + bigger.width - padding.x) ){
      if( (smaller.y >= bigger.y + padding.y && smaller.y <= bigger.y + bigger.height - padding.y) || (smaller.y + smaller.height >= bigger.y + padding.y && smaller.y + smaller.height <= bigger.y + bigger.height - padding.y) ){
          return true;
          console.log("hit");
      }
  }
}

var players = {};
function copyPlayer(one,two){
  for(var key in two){
    one[key] = two[key];
  }
}
//var elephant = {};
io.sockets.on("connection",function(socket){
  io.sockets.emit("update_clients",players);
  socket.on("move_input", function(data){
    var illegal = false;
    var thisPlayer = players[data.name];
    var dummyPlayer = {};
    copyPlayer(dummyPlayer, thisPlayer);
    if(data.direction == "up") dummyPlayer.y -= data.amount;
    if(data.direction == "down") dummyPlayer.y += data.amount;
    if(data.direction == "left") dummyPlayer.x -= data.amount;
    if(data.direction == "right") dummyPlayer.x += data.amount;
    for(var name in players){
      var player = players[name];
      if(name !== dummyPlayer.name){
        if(collison(dummyPlayer,player,{x:0,y:0})){
          illegal = true;
        }
      }
    }
    if(!illegal){
      players[data.name] = dummyPlayer;
      console.log("works");
    }
  });

});
module.exports = app; // Export it so it can be require('')'d
// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../frontend');
// The path of our index.html file. ([ROOT]/index.html)
var indexHtmlPath = path.join(__dirname, '../index.html');
var loginPagePath = path.join(__dirname, '../login.html');

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

app.get('/', function (req, res) {
    console.log('hi there');
    res.sendFile(loginPagePath);
});

// If we're hitting our home page, serve up our index.html file!
app.get('/:name', function (req, res) {
    if(players[name] === undefined){
      var name = req.params.name;
      var newPlayer = new Player(0,0,200,name);
      players[name] = newPlayer;
    }
    res.sendFile(indexHtmlPath);
});

app.use(function (req, res, next) {
	next();
});

var update = function(){

  io.sockets.emit("update_clients", players);

};

setInterval(update, 40);
