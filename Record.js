var controllerOptions = {};
rawXMin = 99;
rawYMin = 99;
rawXMax = 1;
rawYMax = 1;

i = 0;
x = 0;
y = 0;
z = 0;
function HandleFrame(frame){
	if(frame.hands.length == 1){
		hand = frame.hands[0];
		HandleHand(hand);
	}
	else {
		circle(width/2, height/2, 50);
	}
}
function HandleHand(hand){
	
	let fingers = hand['fingers'];
	for (i in fingers){
		let finger = fingers[i];
		HandleFinger(finger)
	}
}function HandleFinger(finger){
	
	let bones = finger['bones'];
	for(i in bones){
		let bone = bones[i];
		strokeWeight(5 - i);
		stroke(180 - (i*40));
		HandleBone(bone)
		
	}

	//console.log(finger);
	
	
	//console.log(index);
	tip = finger['tipPosition'];
	//console.log(tip);
	x = tip[0];
	y = tip[1];
	z = tip[2];
	
	// rawXMin scales to canvas 0
	// rawXMax scales to canvas width
	// rawYMin scales to canvas 0
	// rawYMax scales to canvas height
	
	let rawXRange = rawXMax - rawXMin; // total range the finger has to move 
	let rawYRange = rawYMax - rawYMin;
	
	let xShift = x - rawXMin; // how far x is away from the min of x
	let yShift = y - rawYMin;
	
	let xRatio = xShift/rawXRange;
	let yRatio = yShift/rawYRange;
	//console.log(xRatio, yRatio);
	
	let canvasX = xRatio * width;
	let canvasY = yRatio * height;
	
	//circle(canvasX, canvasY, 50);

	
	if(rawXMin > x){
		rawXMin = x;
	}
	if(rawYMin < y){
		rawYMin = y;
	}
	if(rawXMax < x){
		rawXMax = x;
	}
	if(rawYMax > y){
		rawYMax = y;
	}
	//console.log(rawXMin, rawYMin, rawXMax, rawYMax)
	
}
function HandleBone(bone){
	//console.log(bone);
	
	let boneStartX = bone['prevJoint'][0];
	let boneStartY = bone['prevJoint'][1];
	start =  TransformCoordinates(boneStartX,boneStartY);
	let boneEndX = bone['nextJoint'][0];
	let boneEndY = bone['nextJoint'][1];
	
	end = TransformCoordinates(boneEndX,boneEndY);
	//circle(boneStartX, boneStartY, 5);
	//circle(boneEndX, boneEndY, 5);
	
	line(start[0], start[1], end[0], end[1]);
	//console.log(start,end)
	/*
	let basis = bone['basis'];
	
	let tip = basis[0];
	x = tip[0];
	y = tip[1];
	z = tip[2];
	//console.log(bone);
	//console.log(tip);
	*/
	
	

	
	

	
	/*if(rawXMin > x){
		rawXMin = x;
	}
	if(rawYMin < y){
		rawYMin = y;
	}
	if(rawXMax < x){
		rawXMax = x;
	}
	if(rawYMax > y){
		rawYMax = y;
	}*/
	
}	
function TransformCoordinates(x,y){
	let rawXRange = rawXMax - rawXMin; // total range the finger has to move 
	let rawYRange = rawYMax - rawYMin;
	
	let xShift = x - rawXMin; // how far x is away from the min of x
	let yShift = y - rawYMin;
	
	let xRatio = xShift/rawXRange;
	let yRatio = yShift/rawYRange;
	//console.log(xRatio, yRatio);
	
	let canvasX = xRatio * width;
	let canvasY = yRatio * height;
	return [canvasX,canvasY]
}



Leap.loop(controllerOptions, function(frame) {
	
	clear();
	HandleFrame(frame);
	//p = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//g = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//console.log(i)
	
	
	
		//console.log(fingers);
		
	
	
	
});
