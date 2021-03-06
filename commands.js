//TODO: use event emitters for all player broadcasting
//TODO: change all for in loops to forEach Ex.:
	// Object.keys(myobject).forEach(function(key){
	  // myobject[key];
	// });
var algo = require('./algorithms');
var Draft = require('./draft');

module.exports = {
	sweet		: function(cb) {
		cb('sweet exectued *sp');
	}
	,draft		: function(cb,args,players) {
		if(args.length > 0) {
			cb('draft '+args[0]+' created for '+Object.keys(players).length+' players');
			var playerArray = [];
			for (var p in players) {
				playerArray.push(players[p]);
			}
			var draft1 = new Draft(args[0], playerArray, 3, 14);
			for(p in playerArray){
				playerArray[p].receivePacks(draft1.playerArray[p].packs);
			}
		} else {
			cb('','draft command requires a name argument');
		}
	}
	,pen15		: function(cb,args,players) {
		for(var p in players){
			if(player[p].client)
				players[p].client.log('<marquee behavior=scroll direction=right>8====D '+args.join(' ')+'</marquee>');
		}
	}
	,dong		: function(cb,args,players) {
		for(var p in players) {
			if(player[p].client)
				players[p].client.log('<pre>      ___<br>     //  7<br>    (_,_/\\<br>     \\    \\<br>      \\    \\<br>      _\\    \\__<br>     (   \\     )<br>      \\___\\___/</pre>');
		}
	}
	,tron		: function(cb,args,players) {
		for(var p in players) {
			if(player[p].client)
				players[p].client.tron();
		}
	}
	,list		: function(cb,args,players) {
		if(args.length > 0) {
			switch(args[0]){
				case 'players':
					var playerList = [];
					for(var p in players) playerList.push(players[p].name);
					cb(playerList.join(', '));
					break;
				default:
					cb('','list argument '+args[0]+' not recognized');
			}
		} else {
			cb('','list requires object name argument');
		}
	}
	,kick		: function(cb,args,players) {
		//TODO: fix kick
		if(args.length > 1 
			&& args[0] 
			&& args[0] in players 
			&& algo.SHA1(args[1]) == '1f7d9766cbcb5f42e41784c98cb05c14401b4b19'){
			players[args[0]].logout();
			delete players[args[0]];
			cb('gtfo '+args[0]+' you just got kicked');
		} else {
			cb('','kick requires playername and password');
		}
	}
};
