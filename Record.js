var controllerOptions = {};
var oneFrameOfData = nj.zeros([5,4,6]);
<canvas id="displayArea" width="200" height="100" style="background:#dddddd;"></canvas>
	var canvasElement = document.getElementById("displayArea");
			var displayArea = canvasElement.getContext("2d");

			var controller = new Leap.Controller();
			controller.on("frame", function(frame){
				if(frame.pointables.length > 0)
				{
					window.innerWidth = window.innerWidth; //clear
					
					//Get a pointable and normalize the tip position
					var pointable = frame.pointables[0];
					var interactionBox = frame.interactionBox;
					var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
					
					// Convert the normalized coordinates to span the canvas
					var canvasX = window.innerWidth * normalizedPosition[0];
					var canvasY = window.innerHeight * (1 - normalizedPosition[1]);
					//we can ignore z for a 2D context
					
					displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
				}
			});
			controller.connect();


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
		var interactionBox = frame.interactionBox;
		HandleHand(hand, interactionBox);
	}
	else {
		//circle(width/2, height/2, 50);
	}
}
function HandleHand(hand,interactionBox){
	
	let fingers = hand['fingers'];
	for (i in fingers){
		let fingerIndex = i;
		let finger = fingers[i];
		HandleFinger(finger, fingerIndex, interactionBox)
	}
}

function HandleFinger(finger, fingerIndex, interactionBox){
	
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
		
		HandleBone(bone, fingerIndex, boneIndex, interactionBox)
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
function HandleBone(bone, fingerIndex, boneIndex, interactionBox){
	//console.log(bone);
	
	let boneStartX = bone['prevJoint'][0];
	let boneStartY = bone['prevJoint'][1];
	let boneStartZ = bone['prevJoint'][2];
	start =  TransformCoordinates(boneStartX,boneStartY,boneStartZ);
	let boneEndX = bone['nextJoint'][0];
	let boneEndY = bone['nextJoint'][1];
	let boneEndZ = bone['nextJoint'][2];
	normalizedPrevJoint = interactionBox.normalizePoint(bone['prevJoint'], true);
	normalizedNextJoint = interactionBox.normalizePoint(bone['nextJoint'], true);
	console.log(normalizedNextJoint, normalizedPrevJoint);
	end = TransformCoordinates(boneEndX,boneEndY,boneEndZ);
	//circle(boneStartX, boneStartY, 5);
	//circle(boneEndX, boneEndY, 5);
	temp = boneEndX + boneStartX + boneEndY + boneStartY + boneEndZ + boneStartZ;
	oneFrameOfData.set(fingerIndex, boneIndex, 0, boneStartX);
	oneFrameOfData.set(fingerIndex, boneIndex, 1, boneStartY);
	oneFrameOfData.set(fingerIndex, boneIndex, 2, boneStartZ);
	oneFrameOfData.set(fingerIndex, boneIndex, 3, boneEndX);
	oneFrameOfData.set(fingerIndex, boneIndex, 4, boneEndY);
	oneFrameOfData.set(fingerIndex, boneIndex, 5, boneEndZ);
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
	console.log('***');
	console.log(oneFrameOfData.toString());
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
	
	
	//p = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//g = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//console.log(i)
	
	
	
		//console.log(fingers);
		
	
	
	
});
