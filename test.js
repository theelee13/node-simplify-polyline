//The test graph resembles a somewhat fluid 'P' shape. Graph yourself to see.
var simple = require("./simplify-polyline-001.js");
var array = [
	{x:-3.5,y:0},
	{x:-3,y:2},
	{x:-1.5,y:4},
	{x:1,y:5},
	{x:2.5,y:4},
	{x:5,y:3},
	{x:3,y:2},
	{x:1,y:3}
]

var answer = simple.simplify(array,1);
for(var i =0;i<answer.length;i++){
	console.log(answer[i]);
}
