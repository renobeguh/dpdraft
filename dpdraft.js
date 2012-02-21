// initialize express
var express = require('express');
var app = express.createServer();
app.configure(function() {
	app.use('/public', express.static(__dirname + '/public/'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/', function(req, res) {
	res.redirect('/public/index.html');
});
app.listen(80);
console.log('http://localhost:80/');

//initialize dnode
var players = {};
var dnode = require('dnode');
var commands = require('./commands').commands;
var algo = require('./algorithms');
var server = dnode(function(player, conn) {
	//conn.on('ready', function() {
	//});
	conn.on('end', function () {
		if(player.name && player.name in players) {
			var disconnectText = player.name + ' disconnected';
			console.log(conn.id+': '+disconnectText);
			delete players[player.name]
			for(p in players) {
				players[p].log(disconnectText);
			}
		}
	});
	this.login = function(name,cb) {
		if(name in players) {
			cb(name+' is taken, enter new name');
			return;
		}
		player.name = name;
		var connectionText = player.name+' connected';
		console.log(conn.id+': '+connectionText);
		for(p in players) {
			players[p].log(connectionText);
		}
		//player.GUID = algo.GUID();
		players[player.name] = player;
		cb();
	};
	this.say = function (text, cb) {
		if(text.length > 1 && text.indexOf('/') == 0) {
			//command
			var c = algo.parseCommand(text);
			if(c.command in commands)
			{
				commands[c.command](function(result,error){
					if(error){ player.raiseError(error);}
					else { player.log(result);}
				},c.args,players);
			} else {
				player.raiseError('command '+c.command+' not recognized');
			}
		} else {
			//chat
			for(p in players) {
				players[p].hear(player.name,text);
			}
		}
	};
});
server.listen(app);
// You can pass options through to socket.io with the io parameter:
// dnode(...).listen(webserver, { io : { flashPolicyServer : false } });