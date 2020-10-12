nj.config.printThreshold = 1000;
var controllerOptions = {};
var numSamples = 100;
var framesOfData = nj.zeros([5,4,6, numSamples]);
var currentSample = 0;
id="displayArea";
 width="200";
 height="100";
 style="background:#dddddd;";

console.log(document.getElementById("displayArea")); //this returns null something went wrong






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
	}
}
function HandleBone(bone, fingerIndex, boneIndex, interactionBox){
	normalizedPrevJoint = interactionBox.normalizePoint(bone['prevJoint'], true);
	normalizedNextJoint = interactionBox.normalizePoint(bone['nextJoint'], true)
	let boneStartX = normalizedPrevJoint[0];
	let boneStartY = normalizedPrevJoint[1];
	let boneStartZ = normalizedPrevJoint[2];
	let boneEndX = normalizedNextJoint[0];
	let boneEndY = normalizedNextJoint[1];
	let boneEndZ = normalizedNextJoint[2];
	framesOfData.set(fingerIndex, boneIndex, 0, currentSample, boneStartX);
	framesOfData.set(fingerIndex, boneIndex, 1, currentSample, boneStartY);
	framesOfData.set(fingerIndex, boneIndex, 2, currentSample, boneStartZ);
	framesOfData.set(fingerIndex, boneIndex, 3, currentSample, boneEndX);
	framesOfData.set(fingerIndex, boneIndex, 4, currentSample, boneEndY);
	framesOfData.set(fingerIndex, boneIndex, 5, currentSample, boneEndZ);
	line(normalizedPrevJoint[0] * window.innerWidth, (1 - normalizedPrevJoint[1])* window.innerHeight, normalizedNextJoint[0]*window.innerWidth, (1 - normalizedNextJoint[1])*window.innerHeight);
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
		
		//console.log('***');
		console.log(framesOfData.toString());
		//console.log( framesOfData.pick(null,null,null,1).toString() );
		
	}	
}

Leap.loop(controllerOptions, function(frame) {
	
	clear();
	currentNumHands = frame.hands.length;
	HandleFrame(frame);
	RecordData();
	previousNumHands = currentNumHands;

	

});
