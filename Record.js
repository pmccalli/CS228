var controllerOptions = {};
var oneFrameOfData = nj.zeros([5,4,6]);
rawXMin = 99;
rawYMin = 99;
rawXMax = 1;
rawYMax = 1;
previousNumHands = 0;
currentNumHands = 0;
i = 0;
x = 0;
y = 0;
z = 0;
function HandleFrame(frame){
	console.log(frame.hands);
	if(frame.hands.length > 0){
		hand = frame.hands[0];
		HandleHand(hand);
	}
	else {
		//circle(width/2, height/2, 50);
	}
}
function HandleHand(hand){
	
	let fingers = hand['fingers'];
	for (i in fingers){
		let fingerIndex = i;
		let finger = fingers[i];
		HandleFinger(finger, fingerIndex)
	}
}

function HandleFinger(finger, fingerIndex){
	
	let bones = finger['bones'];
	for(i in bones){
		let boneIndex = i;
		let bone = bones[i];
		strokeWeight(5 - i);
		if(currentNumHands == 1){
			stroke(0,255 - (i*40),0);
		}
		else{
			stroke(255 - (i*40),0,0);
		}
		
		HandleBone(bone, fingerIndex, boneIndex)
		if(previousNumHands == 2 && currentNumHands == 1){
			
			RecordData()
		}
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
function HandleBone(bone, fingerIndex, boneIndex){
	//console.log(bone);
	
	let boneStartX = bone['prevJoint'][0];
	let boneStartY = bone['prevJoint'][1];
	let boneStartZ = bone['prevJoint'][2];
	start =  TransformCoordinates(boneStartX,boneStartY,boneStartZ);
	let boneEndX = bone['nextJoint'][0];
	let boneEndY = bone['nextJoint'][1];
	let boneEndZ = bone['nextJoint'][2];
	
	end = TransformCoordinates(boneEndX,boneEndY,boneEndZ);
	//circle(boneStartX, boneStartY, 5);
	//circle(boneEndX, boneEndY, 5);
	temp = boneEndX + boneStartX + boneEndY + boneStartY + boneEndZ + boneStartZ;
	oneFrameOfData.set(fingerIndex, boneIndex, boneStartX, temp);
	oneFrameOfData.set(fingerIndex, boneIndex, boneStartY, temp);
	oneFrameOfData.set(fingerIndex, boneIndex, boneStartZ, temp);
	oneFrameOfData.set(fingerIndex, boneIndex, boneEndX, temp);
	oneFrameOfData.set(fingerIndex, boneIndex, boneEndY, temp);
	oneFrameOfData.set(fingerIndex, boneIndex, boneEndZ, temp);
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
function RecordData(){
	background(0);
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
	currentNumHands = frame.hands.length;
	HandleFrame(frame);
	previousNumHands = currentNumHands;
	
	console.log(oneFrameOfData.toString());
	//p = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//g = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//console.log(i)
	
	
	
		//console.log(fingers);
		
	
	
	
});
