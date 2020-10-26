let trainingCompleted = false;
var controllerOptions = {};
//let predictedClassLabels = nj.zeros([150,1]);
let testinteger = 0;
let n= 0;
//let numSamples = nj.zeros([150,1]);
const knnClassifier = ml5.KNNClassifier();
let m = 0;
let d = 3;
let c = 0;
var programstate = 0;

//let numFeatures = nj.zeros(150, 4);


var numSamples = 99;
var framesOfData = nj.zeros([5,4,6]);
var currentSample = 0;
id="displayArea";
 width="200";
 height="100";
 style="background:#dddddd;";

//console.log(document.getElementById("displayArea")); //this returns null something went wrong






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

Leap.loop( controllerOptions, function(frame){
	 clear();
 DetermineState(frame);
if (programstate==0) {
	HandleState0(frame);
 }
 else if (programstate==1) {
	HandleState1(frame);
 }
	
	
	currentNumHands = frame.hands.length;
	
	previousNumHands = currentNumHands;
} );
	
function DetermineState(frame){
	if(frame.hands.length > 0){
		if(hand is off center){
			programstate = 1;
			//the users hand is off center
		}
		programstate = 2;// the users hand is present and centered
	}
	else if (frame.hands.length <=0){
		programstate = 0;//the program is waiting to see the users hand
	}
}	
	
function HandIsUncentered(){
	if(HandIsTooFarToTheLeft() && HandIsTooFarToTheRight()){
		return true;
	}
}

function HandIsTooFarToTheLeft(){
	xValues = framesOfData.slice([],[],[0,6,3]);
	currentMean = xValues.mean();
	if(currentMean < .25){
		return true;
	}
	
}

function HandIsTooFarToTheRight(){
	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();
	if(currentMean < .25){
		return true;
	}
}

function HandleState0(frame) {
	TrainKNNIfNotDoneYet()
	DrawImageToHelpUserPutTheirHandOverTheDevice()
}

function HandleState1(frame){
	HandleFrame(frame);
	//Test();
	if ( HandIsTooFarToTheLeft() ) {
           DrawArrowRight() 
	}
	if(HandIsTooFarToTheRight){
		DrawArrowLeft()
	}
}

function HandleState2(frame){
		HandleFrame(frame);
		//Test();
}

function DrawArrowLeft(){
	image(tooright, 0,0);
}
function DrawArrowRight(){
	image (tooleft, 0,0);
}
 
function TrainKNNIfNotDoneYet(){
	if(trainingCompleted == false){
		Train();
		trainingCompleted = true;
	}
}
function DrawImageToHelpUserPutTheirHandOverTheDevice(){
	image(img, 0, 0,);
}

function Train(){
	for(i = 0; i < 2; i++){
		/*features1 = train1.pick(null,null,null,i);
		features1Wolley = train1Wolley.pick(null,null,null,i);
		features1Riofrio = train1Riofrio.pick(null,null,null,i);
		//features1Hunt = train1Hunt.pick(null,null,null,i);
		features1M = train1McCallion.pick(null,null,null,i);
		features1Rice = train1Rice.pick(null,null,null,i);
		features1M3 = train1McCallion3.pick(null,null,null,i);
		features1M4 = train1McCallion4.pick(null,null,null,i);
		features1M5 = train1McCallion5.pick(null,null,null,i);
		features1M6 = train1McCallion6.pick(null,null,null,i);
		features1Ms = train1McCallions.pick(null,null,null,i);
		features1Mc = train1McLaughlin.pick(null,null,null,i);
		features1D = train1Davis.pick(null,null,null,i);
		features1J = train1Jimmo.pick(null,null,null,i);
		features1L = train1Li.pick(null,null,null,i);
		features2 = train2.pick(null,null,null,i);
		features2R = train2Rielly.pick(null,null,null,i);
		features3 = train3.pick(null,null,null,i);
		features3M = train3McCallion.pick(null,null,null,i);
		
		features4 = train4.pick(null,null,null,i);
		features4M = train4McCallion.pick(null,null,null,i);
		//features4OBrien = train4OBrien.pick(null,null,null, i);
		features5 = train5.pick(null,null,null,i);
		//features5M = train5McCallion.pick(null,null,null,i);
		features6 = train6.pick(null,null,null,i);
		
		features7 = train7.pick(null,null,null,i);
		features8 = train8.pick(null,null,null,i);
		features8M2 = train8McCallion2.pick(null,null,null,i);
		features8M3 = train8McCallion3.pick(null,null,null,i);
		features9 = train9.pick(null,null,null,i);
		features9M = train9McCallion.pick(null,null,null,i);
		features9B = train9Bongard.pick(null,null,null,i);
		
		features0 = train0.pick(null,null,null,i);
		features0B = train0Bongard.pick(null,null,null,i);
		features1 = features1.reshape(1,120);
		features1Wolley = features1Wolley.reshape(1,120);
		features1Riofrio = features1Riofrio.reshape(1,120);
		//features1Hunt = features1Hunt.reshape(1,120);
		features1Rice = features1Rice.reshape(1,120);
		features1M = features1M.reshape(1,120);
		features1M3 = features1M3.reshape(1,120);
		features1M4 = features1M4.reshape(1,120);
		features1M5 = features1M5.reshape(1,120);
		features1M6 = features1M6.reshape(1,120);
		features1Ms = features1Ms.reshape(1,120);
		features1Mc = features1Mc.reshape(1,120);
		features1D = features1D.reshape(1,120);
		features1J = features1J.reshape(1,120);
		features1L = features1L.reshape(1,120);
		features2 = features2.reshape(1,120);
		features2R = features2R.reshape(1,120);
		features3 = features3.reshape(1,120);
		features3M = features3M.reshape(1,120);
		features4 = features4.reshape(1,120);
		features4M = features4M.reshape(1,120);
		//features4OBrien = features4OBrien.reshape(1,120);
		features5 = features5.reshape(1,120);
		//features5M = features5M.reshape(1,120);
		features6 = features6.reshape(1,120);
		features7 = features7.reshape(1,120);
		features8 = features8.reshape(1,120);
		features8M2 = features8M2.reshape(1,120);
		features8M3 = features8M3.reshape(1,120);
		features9 = features9.reshape(1,120);
		features9M = features9M.reshape(1,120);
		features9B = features9B.reshape(1,120);
		features0 = features0.reshape(1,120);
		features0B = features0B.reshape(1,120);

		knnClassifier.addExample(features1.tolist(), 1);
		knnClassifier.addExample(features1Wolley.tolist(), 1);
		knnClassifier.addExample(features1Riofrio.tolist(), 1);
		//knnClassifier.addExample(features1Hunt.tolist(), 1);
		knnClassifier.addExample(features1Rice.tolist(), 1);
		knnClassifier.addExample(features1M.tolist(), 1);
		knnClassifier.addExample(features1M3.tolist(), 1);
		knnClassifier.addExample(features1M4.tolist(), 1);
		knnClassifier.addExample(features1M5.tolist(), 1);
		knnClassifier.addExample(features1M6.tolist(), 1);
		knnClassifier.addExample(features1Ms.tolist(), 1);
		knnClassifier.addExample(features1Mc.tolist(), 1);
		knnClassifier.addExample(features1D.tolist(), 1);
		knnClassifier.addExample(features1J.tolist(), 1);
		knnClassifier.addExample(features1L.tolist(), 1);
		knnClassifier.addExample(features2.tolist(), 2);
		knnClassifier.addExample(features2R.tolist(), 2);
		knnClassifier.addExample(features3.tolist(), 3);
		knnClassifier.addExample(features3M.tolist(), 3);
		knnClassifier.addExample(features4.tolist(), 4);
		knnClassifier.addExample(features4M.tolist(), 4);
		//knnClassifier.addExample(features4OBrien.tolist(), 4);
		knnClassifier.addExample(features5.tolist(), 5);
		//knnClassifier.addExample(features5M.tolist(), 5);
		knnClassifier.addExample(features6.tolist(), 6);
		knnClassifier.addExample(features7.tolist(), 7);
		knnClassifier.addExample(features8.tolist(), 8);
		knnClassifier.addExample(features8M2.tolist(), 8);
		knnClassifier.addExample(features8M3.tolist(), 8);
		knnClassifier.addExample(features9.tolist(), 9);
		knnClassifier.addExample(features9M.tolist(), 9);
		knnClassifier.addExample(features9B.tolist(), 9);
		knnClassifier.addExample(features0.tolist(), 0);
		knnClassifier.addExample(features0B.tolist(), 0);
		*/
		testinteger += 1;
		//console.log(testinteger);
	}
}
function Test(){
	
		/*
	CleanData();
	CleanDataZ();
	features = framesOfData.reshape(1,120);

	predictedSign = knnClassifier.classify(features.tolist(),GotResults);
		
	*/
}
function CleanData(){
	xValues = framesOfData.slice([],[],[0,6,3]);
	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();
	currentMean = xValues.mean();

	horizontalShift = 0.5 - currentMean;

	verticalShift = 0.5 - currentYMean;
	for(i = 0; i < 5; i++){
		
		for(j = 0; j < 4; j++){
		
			currentColumn = j;
			currentRow= i;
			currentX = framesOfData.get(currentRow,currentColumn,0);
			shiftedX = currentX + horizontalShift;
			framesOfData.set(currentRow,currentColumn,0, shiftedX);
			currentX = framesOfData.get(currentRow,currentColumn,3);
			shiftedX = currentX + horizontalShift;
			framesOfData.set(currentRow,currentColumn,3, shiftedX);
			
			
			currentY = framesOfData.get(currentRow,currentColumn,1);
			shiftedY = currentY + verticalShift;
			framesOfData.set(currentRow,currentColumn,1, shiftedY);
			currentY = framesOfData.get(currentRow,currentColumn,4);
			shiftedY = currentY + verticalShift;
			framesOfData.set(currentRow,currentColumn,4, shiftedY);
		}
	}
	xValues = framesOfData.slice([],[],[0,6,3]);
	

	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();

	
	
}
function CleanDataZ(){

	zValues = framesOfData.slice([],[],[2,6,3]);
	currentZMean = zValues.mean();
	zShift = 0.5 - currentZMean;
	for(i = 0; i < 5; i++){
	
		for(j = 0; j < 4; j++){
			
			currentColumn = j;
			currentRow= i;
			
			
			currentZ = framesOfData.get(currentRow,currentColumn,2);
			shiftedZ = currentZ + zShift;
			framesOfData.set(currentRow,currentColumn,2, shiftedZ);
			currentZ = framesOfData.get(currentRow,currentColumn,5);
			shiftedZ = currentZ + zShift;
			framesOfData.set(currentRow,currentColumn,5, shiftedZ);
		}
	}
	zValues = framesOfData.slice([],[],[2,6,3]);
	currentZMean = zValues.mean();
	
	
}
//having trouble iterating over rows and columns
//do i use slice?
//pick was removed from num js wiki, is it no longer viable?
function GotResults(err, result){
	if(result){
		
		c = parseInt(result.label);
		n += 1;
		m = (((n - 1)* m + (parseInt(result.label) == d))/ n); 
		//console.log(err);
		console.log(c);
		//console.log(parseInt(result.label));
	}
	else{
		//console.log('no REsult');
	}		
		//console.log(predictedClassLabels.toString());
	
	
}

function HandleFrame(frame){
	
	if(frame.hands.length > 0){
		hand = frame.hands[0];
		var interactionBox = frame.interactionBox;
		HandleHand(hand, interactionBox);
		
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
	
	line(normalizedPrevJoint[0] * window.innerWidth/2, (1 - normalizedPrevJoint[1])* window.innerHeight/2, normalizedNextJoint[0]*window.innerWidth/2, (1 - normalizedNextJoint[1])*window.innerHeight/2);
}






