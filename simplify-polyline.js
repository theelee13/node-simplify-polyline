module.exports={
	simplify: function(list,epsilon){
		return RDP(list,epsilon);			 
	}
}
var RDP = function (pointList, epsilon){
	/*
	 *	Part A of the algorithm sifts through the array and finds the point that is the farthest away from the line created
	 *	between pointList[firstValue] and pointList[lastValue], marking its value (for comparison) and its index in the 
	 *	array (so we may act on it in part B).
	 *
	 *	Part B is only called if we have an exception to the epsilon rule. Otherwise, all points are within epsilon meaning
	 *	they are unnecessary and we don't need them. In that case we simply return the first and last values (we need these,
	 *	otherwise we can have an array that is the empty set). Part B, if called, recursively calls the RDP method on the 
	 *	half of the array leading to the index and the half after, finding if there are any notable exceptions in them and
	 *	returns a concatenation of the results.
	*/
	var listLength = pointList.length;
	if(listLength<3){
		return pointList;
	}
	var index = 0;
	var largestDistance = 0;
	var firstPoint = pointList[0];
	var lastPoint = pointList[listLength-1];
	//Begin part A
	for(var i = 1;i<listLength-1;i++){
		var thisPoint = pointList[i];
		var thisDistance = distanceFromPointToLine(thisPoint,firstPoint,lastPoint);
		if(thisDistance>largestDistance){
			largestDistance=thisDistance;
			index = i;
		}
	}
	//End part A
	if(largestDistance<epsilon){
		return [firstPoint,lastPoint]; //These are the only values that are necessary in this case.
	}
	//Begin part B
	else{
		var firstHalf = pointList.slice(0,index+1); //we need to include index's value, it's accepted and can be tested against.
		var lastHalf = pointList.slice(index,listLength);
		var newList1 = RDP(firstHalf,epsilon);
		var newList2 = RDP(lastHalf,epsilon);
		return newList1.slice(0,newList1.length-1).concat(newList2);
	}
	//End part B
}

//distance formulas normally comprise of square roots of squares. I'm breaking this down a little bit.
var distanceFromPointToLine = function (p,a,b){
	return Math.sqrt(distanceFromPointToLineSquared(p,a,b));
}

//This is the difficult part. Commenting as we go.
var distanceFromPointToLineSquared = function (p, i, j){
	var lineLength = pointDistance(i,j);//First, we need the length of the line segment.
	if(lineLength==0){	//if it's 0, the line is actually just a point.
		return pointDistance(p,a);
	}
	var t = ((p.x-i.x)*(j.x-i.x)+(p.y-i.y)*(j.y-i.y))/lineLength; 

	//t is very important. t is a number that essentially compares the individual coordinates
	//distances between the point and each point on the line.

	if(t<0){	//if t is less than 0, the point is behind i, and closest to i.
		return pointDistance(p,i);
	}	//if greater than 1, it's closest to j.
	if(t>1){
		return pointDistance(p,j);
	}
	return pointDistance(p, { x: i.x+t*(j.x-i.x),y: i.y+t*(j.y-i.y)});
	//this figure represents the point on the line that p is closest to.
}

//returns distance between two points. Easy geometry.
var pointDistance = function (i,j){
	return sqr(i.x-j.x)+sqr(i.y-j.y);
}

//just to make the code a bit cleaner.
sqr = function (x){
	return x*x;
}
