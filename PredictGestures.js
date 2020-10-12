let trainingCompleted = false;
var controllerOptions = {};
let predictedClassLabels = nj.zeros([150,1]);
let testinteger = 0;
let n= 0;
//let numSamples = nj.zeros([150,1]);
const knnClassifier = ml5.KNNClassifier();
let m = 0;
let d = 8;
let c = 0;


let numFeatures = nj.zeros(150, 4);

//console.log(irisData.pick(4));

var numSamples = 100;
var framesOfData = nj.zeros([5,4,6]);
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
	
Leap.loop(controllerOptions, function(frame){
	//console.log("Draw");
	//console.log(train0.shape[3]);
	Leap.loop( controllerOptions, function(frame){clear();
		if(trainingCompleted == false){
			Train();
			trainingCompleted = true;
		}
		currentNumHands = frame.hands.length;
		HandleFrame(frame);
		} );
		previousNumHands = currentNumHands;
			

		



function Train(){
	for(i = 0; i < 2; i++){
		//console.log( train0.pick(null,null,null,i).toString());
		//console.log(testinteger);
		
		features = train8.pick(null,null,null,i);
		features1 = train0.pick(null,null,null,i);
		//console.log(testinteger);
		
		features = features.reshape(1,120);
		knnClassifier.addExample(features.tolist(), 8);
		features1 = features1.reshape(1,120);
		
		//console.log(testinteger);
		
		//console.log(features.toString());
		knnClassifier.addExample(features1.tolist(), 0);
		
		
		
		
		testinteger += 1;
		console.log(testinteger);
		
	}
	
	
	
}
function Test(){
	for(i = 0; i < 2; i++){
		
		//features = test.pick(null,null,null,i);
		featurest = framesOfData.reshape(1,120);
		
		predictedSign = knnClassifier.classify(featurest.tolist(),GotResults);
		
	}
}
function GotResults(err, result){
	if(result){
		console.log(parseInt(result.label));
		c = parseInt(result.label);
		n += 1;
		m = (((n - 1)* m + (parseInt(result.label) == d))/ n); 
		//console.log(err);
		consle.log(n,m,c);
	}
	else{
		console.log('no REsult');
	}		
		//console.log(predictedClassLabels.toString());
	
	
}
// upon adding leap loop code, html when run slowed considerably.
// upon checking average, html refused to print average, and after a short while
// black screened the broswer window, and then said too many errors had been reported.
//wondering if something went wrong with leap console
function HandleFrame(frame){
	
	if(frame.hands.length > 0){
		hand = frame.hands[0];
		var interactionBox = frame.interactionBox;
		HandleHand(hand, interactionBox);
		Test();
		//console.log(framesOfData.toString());
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
		//strokeWeight(5 - i);
		/*if(currentNumHands == 1){
			stroke(0,255 - (i*40),0);
		}
		else{
			stroke(255 - (i*40),0,0);
		}*/
		strokeWeight(5 - i);
		stroke(180 - (i*40));
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
	framesOfData.set(fingerIndex, boneIndex, 0, boneStartX);
	framesOfData.set(fingerIndex, boneIndex, 1, boneStartY);
	framesOfData.set(fingerIndex, boneIndex, 2, boneStartZ);
	framesOfData.set(fingerIndex, boneIndex, 3, boneEndX);
	framesOfData.set(fingerIndex, boneIndex, 4, boneEndY);
	framesOfData.set(fingerIndex, boneIndex, 5, boneEndZ);
	
	line(normalizedPrevJoint[0] * window.innerWidth, (1 - normalizedPrevJoint[1])* window.innerHeight, normalizedNextJoint[0]*window.innerWidth, (1 - normalizedNextJoint[1])*window.innerHeight);
}


});



