// var a = 2;

// var str ='test(2) abc (3)';
// str = str.replace(/\([0-9]\)/g,'');
// str = str.replace(/\s+$/,'');
// console.log(str);
// console.log(str.length);
//var algo = require('./algorithms.js');

/*Start CardPicker unit Test*/

var Draft = require('./draft.js').Draft;


 var players = [{name:'jim'},{name:'tom'},{name:'bob'}];
 var draft = new Draft('drafttest', players, 3, 14);

// // check out one player
// //console.log(draft.players[0]
for(p in draft.players[1].packs){
	var pack = draft.players[1].packs[p];
	console.log('pack '+p);
	for(c in pack) {
	//	console.log(pack[c]); //print card
	}
}
console.log(draft.players[2].packs[2]);

/*end CardPicker unit test*/
