nj.config.printThreshold = 1000;
var controllerOptions = {};
var numSamples = 2;
var framesOfData = nj.zeros([5,4,6, numSamples]);
var framesOfDatatemp = nj.zeros([5,4,6, numSamples]);
var currentSample = 0;
id="displayArea";
 width="200";
 height="100";
 style="background:#dddddd;";

console.log(document.getElementById("displayArea")); //this returns null something went wrong



var controller = new Leap.Controller();
controller.on("frame", function(frame){
    if(frame.pointables.length > 0)
    {
        //canvasElement.width = window.innerWidth; //clear
        
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
		
			
		RecordData()
		
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
	normalizedPrevJoint = interactionBox.normalizePoint(bone['prevJoint'], true);
	normalizedNextJoint = interactionBox.normalizePoint(bone['nextJoint'], true)
	let boneStartX = normalizedPrevJoint[0];
	//console.log(bone['prevJoint']);
	let boneStartY = normalizedPrevJoint[1];
	let boneStartZ = normalizedPrevJoint[2];
	
	let boneEndX = normalizedNextJoint[0];
	let boneEndY = normalizedNextJoint[1];
	let boneEndZ = normalizedNextJoint[2];
	//console.log( framesOfData.pick(null,null,null,1).toString() );
	
	//console.log(boneStartX);
	//console.log(normalizedNextJoint, normalizedPrevJoint);
	//console.log(bone['prevJoint'])
	temp = boneEndX + boneStartX + boneEndY + boneStartY + boneEndZ + boneStartZ;
	framesOfData.set(fingerIndex, boneIndex, 0, currentSample, boneStartX);
	framesOfData.set(fingerIndex, boneIndex, 1, currentSample, boneStartY);
	framesOfData.set(fingerIndex, boneIndex, 2, currentSample, boneStartZ);
	framesOfData.set(fingerIndex, boneIndex, 3, currentSample, boneEndX);
	framesOfData.set(fingerIndex, boneIndex, 4, currentSample, boneEndY);
	framesOfData.set(fingerIndex, boneIndex, 5, currentSample, boneEndZ);
	line(normalizedPrevJoint[0] * window.innerWidth, (1 - normalizedPrevJoint[1])* window.innerHeight, normalizedNextJoint[0]*window.innerWidth, (1 - normalizedNextJoint[1])*window.innerHeight);
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
	if(currentNumHands == 2){
		currentSample = currentSample + 1;
		if(currentSample == numSamples){
			currentSample = 0;
		}
	} 
	if(previousNumHands == 2 && currentNumHands == 1){
		background(0);
		
		console.log('***');
		for(i = 0; i <= 99; i++){
			if(framesOfDatatemp){
				framesOfData = framesOfData.concatenate(framesOfData,framesOfDatatemp);
			}
			framesOfDatatemp = framesOfData;
		}
	}	console.log(framesOfData);
}
//my second 3d tensor has a lot of zeros, i don't know how to make a loop that records 100 frames of data.
	
	
	

/*function TransformCoordinates(x,y){
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
}*/



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
