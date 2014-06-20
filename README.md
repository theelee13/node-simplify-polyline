node-simplify-polyline
======================

A Nodejs module for simplifying the geometry of a polyline made up of multiple--possibly redundant--points.

Usage
===
````
var simple = require('simplify-polyline');
newArray = simple.simplify(documentArray,epsilon);
````
Parameters:

documentArray:
  an array of objects containing *at least* an 'x' key and a 'y' key, representing a coordinate. This array should be in order of the line it constructs.

epsilon:
   epsilon: a value, representing a distance, which all points are compared to in the algorithm. The larger the epsilon, the fewer points accepted. A sufficiently large epsilon will only return two points, the first and last.

Concept
===
The module works on the Ramer-Douglas-Peucker algorithm, which attempts to eliminate unnecessary points from a polyline. A description of the algorithm may be found here: 

http://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

Function Breakdown
===
The core function, 'simplify,' takes two arguments: a list of points (form: {x:1,y:2}) and a value of epsilon which is the distance from the line which a point may not be less than. It is composed of parts A and B as follows.

Part A of the algorithm sifts through the array and finds the point that is the farthest away from the line created between pointList[firstValue] and pointList[lastValue], marking its value (for comparison) and its index in the array (so we may act on it in part B).

Part B is only called if we have an exception to the epsilon rule. Otherwise, all points are within epsilon meaning they are unnecessary and we don't need them. In that case we simply return the first and last values (we need these, otherwise we can have an array that is the empty set). Part B, if called, recursively calls the RDP method on the half of the array leading to the index and the half after, finding if there are any notable exceptions in them and returns a concatenation of the results.
