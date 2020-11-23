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
var DigitToShow = 0;
var allottedTime = 10;
var nineexists = 0;
//let numFeatures = nj.zeros(150, 4);
var timeSinceLastDigitChange = new Date();


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
 console.log('ps' + programstate);
if (programstate==0) {
	HandleState0(frame);
 }
 else if (programstate==1) {
	 //console.log(programstate);
	//HandleState1(frame);
	HandleFrame(frame);
 }
 else if (programstate == 2){
	 HandleState2(frame); 
	 
 }
 
	
	
	currentNumHands = frame.hands.length;
	
	previousNumHands = currentNumHands;
} );
	
function SignIn(){
    //console.log('sign in called');
	var list = document.getElementById(`users`);
	
	
	username = document.getElementById(`username`).value;
	if(IsNewUser(username,list) == true) {
		
		CreateNewUser(username,list);
		CreateSignInItem(username,list);
	}
	else{
		ID = String(username) + "_signins";
		listItem = document.getElementById( ID );
		listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
	}
	console.log(list.innerHTML);
	console.log(username);
	//console.log(list);
	return false;
}

function IsNewUser(username,list){
	usernameFound = false;
	var users = list.children;
	for(i = 0; i < users.length; i++){
		if(username == users[i].innerHTML){
			usernameFound = true;
			
		}
		console.log(users[i],users[i].innerHTML);
	}
	return usernameFound == false;
	
}

function CreateNewUser(username,list){
		var item = document.createElement(`li`);
		item.innerHTML = String(username);
		item.id = String(username) + "_name";
		list.appendChild(item);
		
}

function CreateSignInItem(username,list){
		var signins = document.createElement(`li`);
		signins.innerHTML = 1;
		signins.id = String(username) + '_signins';
		list.appendChild(signins);
}

function DetermineState(frame){
	//console.log(frame.hands.length);
	if(frame.hands.length > 0){
		if(HandIsUncentered()){
			programstate = 1;
			//the users hand is off center
		}
		else{
			programstate = 2;// the users hand is present and centered
		}
		
	}
	else if (frame.hands.length ==0){
		programstate = 0;//the program is waiting to see the users hand
	}
}	
	
function HandIsUncentered(){
	if(HandIsTooFarToTheLeft() || HandIsTooFarToTheRight()){
		console.log('left right');
		return true;
	}
	else if(HandIsTooFarBack() || HandIsTooFarForward()){
		console.log('back and forth');
		return true;
	}
	else if(HandIsTooHigh() || HandIsTooLow()){
		console.log(' heigth');
		return true;
	}
	return false;
}

function HandIsTooFarToTheLeft(){
	xValues = framesOfData.slice([],[],[0,6,3]);
	currentXMean = xValues.mean();
	
	

	if(currentXMean < .25){
		return true;
	}
	return false;
	
}

function HandIsTooFarToTheRight(){
	
	// 0.5.... 0.7..... 0.5
	xValues = framesOfData.slice([],[],[0,6,3]);
	currentXMean = xValues.mean();
	
	//shifted = currentXMean - 0.5;
	
	//console.log('rightie test');
	//console.log(xValues.toString());
	//console.log('rightie '+ currentXMean);

	//if(shifted < 0.05) {
	if(currentXMean > .95){
		return true;
	}
	return false;
}

function HandIsTooFarForward(){
	zValues = framesOfData.slice([],[],[2,6,3]);
	currentZMean = zValues.mean();

	
	

	if(currentZMean < .25){
		return true;
	}
	return false;

}

function HandIsTooFarBack(){
	zValues = framesOfData.slice([],[],[2,6,3]);
	currentZMean = zValues.mean();
	
	
	

	if(currentZMean > .95){
		return true;
	}
	return false;
}

function HandIsTooHigh(){
	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();
	
	
	//console.log(currentYMean);
	if(currentYMean <.25){
		return true;
	}
	return false;
}

function HandIsTooLow(){
	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();
	
	
	if(currentYMean > .95){
		return true;
	}
	return false;
}


function HandleState0(frame) {
	TrainKNNIfNotDoneYet()
	DrawImageToHelpUserPutTheirHandOverTheDevice()
}

function HandleState1(frame){
	HandleFrame(frame);
	//Test();
	if ( HandIsTooFarToTheLeft() ) {
		//console.log('right arrow');
           DrawArrowRight();
	}
		else if(HandIsTooFarToTheRight()){
			DrawArrowLeft();
		}
	
	if(HandIsTooFarForward()){
		//console.log('too far forard');
		DrawArrowBack();
	}
		else if(HandIsTooFarBack()){
			//console.log('the money is mine youll never getit');
			DrawArrowForth();
		}
	if(HandIsTooHigh()){
		DrawArrowDown();
	}
		else if(HandIsTooLow()){
			DrawArrowUp();
		}
}

function HandleState2(frame){
		HandleFrame(frame);
		DrawLowerRightPanel();
		DetermineWhetherToSwitchDigits();
		Test();
}
 //pair 10 equations with 10 digits
function DrawLowerRightPanel(){
	if(DigitToShow == 0){
		zeropic.resize(400, 0);
		zeropica.resize(400, 0);
		
		tint(255,255 -511*m);
		image(zeropic, window.innerWidth/2, window.innerHeight/2);
		tint(255,0 + 255*m);
		image(zeropica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 1){
		onepic.resize(400, 0);
		tint(255,255 -511*m);
		image(onepic, window.innerWidth/2, window.innerHeight/2);
		onepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(onepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 2){
		twopic.resize(400, 0);
		tint(255,255 -511*m);
		image(twopic, window.innerWidth/2, window.innerHeight/2);
		twopica.resize(400, 0);
		tint(255,0 + 255*m);
		image(twopica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 3){
		threepic.resize(400, 0);
		tint(255,255 -511*m);
		image(threepic, window.innerWidth/2, window.innerHeight/2);
		threepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(threepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 4){
		fourpic.resize(400, 0);
		tint(255,255 -511*m);
		image(fourpic, window.innerWidth/2, window.innerHeight/2);
		fourpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(fourpica, window.innerWidth/2, window.innerHeight/2);
		
	}
	else if(DigitToShow == 5){
		fivepic.resize(400, 0);
		tint(255,255 -511*m);
		image(fivepic, window.innerWidth/2, window.innerHeight/2);
		fivepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(fivepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 6){
		sixpic.resize(400, 0);
		tint(255,255 -511*m);
		image(sixpic, window.innerWidth/2, window.innerHeight/2);
		sixpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(sixpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 7){
		sevenpic.resize(400, 0);
		tint(255,255 -511*m);
		image(sevenpic, window.innerWidth/2, window.innerHeight/2);
		sevenpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(sevenpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 8){
		eightpic.resize(400, 0);
		tint(255,255 -511*m);
		image(eightpic, window.innerWidth/2, window.innerHeight/2);
		eightpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(eightpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if (DigitToShow == 9){
		nineexists = 1;
		ninepic.resize(400, 0);
		tint(255,255 -511*m);
		image(ninepic, window.innerWidth/2, window.innerHeight/2);
		ninepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(ninepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if (DigitToShow == 10){
		//blah blah
		zeroeq.resize(400, 0);
		tint(255,255 -511*m);
		image(zeroeq, window.innerWidth/2, window.innerHeight/2);
		zeropica.resize(400, 0);
		tint(255,0 + 255*m);
		image(zeropica, window.innerWidth/2, window.innerHeight/2);
		
	}
	else if (DigitToShow == 11){
		//blah blah
		oneeq.resize(400, 0);
		tint(255,255 -511*m);
		image(oneeq, window.innerWidth/2, window.innerHeight/2);
		onepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(onepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 12){
		//balch
		twoeq.resize(400, 0);
		tint(255,255 -511*m);
		image(twoeq, window.innerWidth/2, window.innerHeight/2);
		twopica.resize(400, 0);
		tint(255,0 + 255*m);
		image(twopica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 13){
		//math is stupid
		threeeq.resize(400, 0);
		tint(255,255 -511*m);
		image(threeeq, window.innerWidth/2, window.innerHeight/2);
		threepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(threepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 14){
		//fuckin preach
		foureq.resize(400, 0);
		tint(255,255 -511*m);
		image(foureq, window.innerWidth/2, window.innerHeight/2);
		fourpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(fourpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 15){
		//multiplcation doesnt make sense
		fiveeq.resize(400, 0);
		tint(255,255 -511*m);
		image(fiveeq, window.innerWidth/2, window.innerHeight/2);
		fivepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(fivepica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 16){
		//testify to that my brother from here to zero stillneed spics
		sixeq.resize(400, 0);
		tint(255,255 -511*m);
		image(sixeq, window.innerWidth/2, window.innerHeight/2);
		sixpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(sixpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 17){
		//did you just assume my gender
		seveneq.resize(400, 0);
		tint(255,255 -511*m);
		image(seveneq, window.innerWidth/2, window.innerHeight/2);
		sevenpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(sevenpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 18){
		//goddamit frank we were having a moment
		eighteq.resize(400, 0);
		tint(255,255 -511*m);
		image(eighteq, window.innerWidth/2, window.innerHeight/2);
		eightpica.resize(400, 0);
		tint(255,0 + 255*m);
		image(eightpica, window.innerWidth/2, window.innerHeight/2);
	}
	else if(DigitToShow == 19){
		//and now its gone, like my wife you piece of shit
		nineeq.resize(400, 0);
		tint(255,255 -511*m);
		image(nineeq, window.innerWidth/2, window.innerHeight/2);
		ninepica.resize(400, 0);
		tint(255,0 + 255*m);
		image(ninepica, window.innerWidth/2, window.innerHeight/2);
	}
	
}
function DetermineWhetherToSwitchDigits(){
	if(TimeToSwitchDigits()){
		SwitchDigits();
	}
	
}

function TimeToSwitchDigits(){
	currentTime = new Date();
	inMiliseconds = currentTime - timeSinceLastDigitChange;
	inSeconds = inMiliseconds / 1000;
	
	if( m >= .68){
		allottedTime = allottedTime - 1;
		if(allottedTime <= 4){
			allottedTime = 5;
			n = 0;
			//console.log(allottedTime);
		}
		timeSinceLastDigitChange = currentTime;
		m = 0;
		return true;
		
	}
	
	//console.log(inSeconds);
	//if(inSeconds > 5){
		
	//}
	
	if(inSeconds >= allottedTime){
		allottedTime+= 1;
		timeSinceLastDigitChange = currentTime;
		n = 0;
		m = 0;
		//console.log(allottedTime);
		return true;
	}
	else{
		return false;
	}
}
//set 10 second base, time increases or decreases based on how long it took person to sign digit, aka if they signed it within allotted time or if they failed success is reaching 68% accuracy
// variable that determines timer, access the average
// if digit 9 has been shown, add a random component to digit to show.
// will randomly select a basic equation. equation will be paired with the number pictures
//digit to show is an int, so the digit to show for the equation will be 10+ the answer
function SwitchDigits(){
	if(DigitToShow == 0){
		DigitToShow = 1;
	}
	else if(DigitToShow == 1){
		DigitToShow = 2;
	}
	else if(DigitToShow == 2){
		DigitToShow = 3;
	}
	else if(DigitToShow == 3){
		DigitToShow = 4;
	}
	else if(DigitToShow == 4){
		DigitToShow = 5;
	}
	else if(DigitToShow == 5){
		DigitToShow = 6;
	}
	else if(DigitToShow == 6){
		DigitToShow = 7;
	}
	else if(DigitToShow == 7){
		DigitToShow = 8;
	}
	else if(DigitToShow == 8){
		DigitToShow = 9;
	}
	else if(nineexists == 1){
		rand = Math.random()*10;
		rand = Math.floor(rand);
		DigitToShow = rand+10;
	}
	else{
		DigitToShow = 0;
	}
}

function DrawArrowLeft(){
	tooright.resize(600, 0);
	image(tooright, 1000,0);
}
//comment out all of the function back to just placing the warning message
//comment out everything that has to do with state two, making it easier to debug
//user should be given an appropriate amount of time to sign the diigit
//amount of time to sign shortens when they sign correctly and lengthens when they sign incorrectly
//videos only need to show the mechanism working, not necessarily all numbers.
//set 10 second base, time increases or decreases based on how long it took person to sign digit, aka if they signed it within allotted time or if they failed success is reaching 68% accuracy
// variable that determines timer, access the average
function DrawArrowRight(){
	tooleft.resize(600, 0);
	image (tooleft, 1000,0);
}

function DrawArrowBack(){
	tooforward.resize(600, 0);
	image (tooforward, 1000,0);
}

function DrawArrowForth(){
	toobackward.resize(600, 0);
	image (toobackward, 1000,0);
}

function DrawArrowUp(){
	toohigh.resize(600, 0);
	image (toohigh, 1000,0);
}

function DrawArrowDown(){
	toolow.resize(600, 0);
	image (toolow, 1000,0);
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
		features1 = train1.pick(null,null,null,i);
		features1Wolley = train1Wolley.pick(null,null,null,i);
		features1Riofrio = train1Riofrio.pick(null,null,null,i);
		//features1Hunt = train1Hunt.pick(null,null,null,i);
		features1M = train1McCallion.pick(null,null,null,i);
		features1Rice = train1Rice.pick(null,null,null,i);
		features1M3 = train1McCallion3.pick(null,null,null,i);
		features1M4 = train1McCallion4.pick(null,null,null,i);
		features1M5 = train1McCallion5.pick(null,null,null,i);
		features1M6 = train1McCallion6.pick(null,null,null,i);
		features1M7 = train1McCallion7.pick(null,null,null,i);
		features1Ms = train1McCallions.pick(null,null,null,i);
		features1Mc = train1McLaughlin.pick(null,null,null,i);
		features1D = train1Davis.pick(null,null,null,i);
		features1J = train1Jimmo.pick(null,null,null,i);
		features1L = train1Li.pick(null,null,null,i);
		features2 = train2.pick(null,null,null,i);
		features2M = train2McCallion.pick(null,null,null,i);
		features2M2 = train2McCallion2.pick(null,null,null,i);
		features2R = train2Rielly.pick(null,null,null,i);
		features3 = train3.pick(null,null,null,i);
		features3M = train3McCallion.pick(null,null,null,i);
		features3M2 = train3McCallion2.pick(null,null,null,i);
		
		features4 = train4.pick(null,null,null,i);
		features4M = train4McCallion.pick(null,null,null,i);
		features4M2 = train4McCallion2.pick(null,null,null,i);
		//features4OBrien = train4OBrien.pick(null,null,null, i);
		features5 = train5.pick(null,null,null,i);
		//features5M = train5McCallion.pick(null,null,null,i);
		features6 = train6.pick(null,null,null,i);
		
		features7 = train7.pick(null,null,null,i);
		features8 = train8.pick(null,null,null,i);
		features8M2 = train8McCallion2.pick(null,null,null,i);
		features8M3 = train8McCallion3.pick(null,null,null,i);
		features8M4 = train8McCallion4.pick(null,null,null,i);
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
		features1M7 = features1M7.reshape(1,120);
		features1Ms = features1Ms.reshape(1,120);
		features1Mc = features1Mc.reshape(1,120);
		features1D = features1D.reshape(1,120);
		features1J = features1J.reshape(1,120);
		features1L = features1L.reshape(1,120);
		features2 = features2.reshape(1,120);
		features2M = features2M.reshape(1,120);
		features2M2 = features2M2.reshape(1,120);
		features2R = features2R.reshape(1,120);
		features3 = features3.reshape(1,120);
		features3M = features3M.reshape(1,120);
		features3M2 = features3M2.reshape(1,120);
		features4 = features4.reshape(1,120);
		features4M = features4M.reshape(1,120);
		features4M2 = features4M2.reshape(1,120);
		//features4OBrien = features4OBrien.reshape(1,120);
		features5 = features5.reshape(1,120);
		//features5M = features5M.reshape(1,120);
		features6 = features6.reshape(1,120);
		features7 = features7.reshape(1,120);
		features8 = features8.reshape(1,120);
		features8M2 = features8M2.reshape(1,120);
		features8M3 = features8M3.reshape(1,120);
		features8M4 = features8M4.reshape(1,120);
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
		knnClassifier.addExample(features1M7.tolist(), 1);
		knnClassifier.addExample(features1Ms.tolist(), 1);
		knnClassifier.addExample(features1Mc.tolist(), 1);
		knnClassifier.addExample(features1D.tolist(), 1);
		knnClassifier.addExample(features1J.tolist(), 1);
		knnClassifier.addExample(features1L.tolist(), 1);
		knnClassifier.addExample(features2.tolist(), 2);
		knnClassifier.addExample(features2M.tolist(), 2);
		knnClassifier.addExample(features2M2.tolist(), 2);
		knnClassifier.addExample(features2R.tolist(), 2);
		knnClassifier.addExample(features3.tolist(), 3);
		knnClassifier.addExample(features3M.tolist(), 3);
		knnClassifier.addExample(features3M2.tolist(), 3);
		knnClassifier.addExample(features4.tolist(), 4);
		knnClassifier.addExample(features4M.tolist(), 4);
		knnClassifier.addExample(features4M2.tolist(), 4);
		//knnClassifier.addExample(features4OBrien.tolist(), 4);
		knnClassifier.addExample(features5.tolist(), 5);
		//knnClassifier.addExample(features5M.tolist(), 5);
		knnClassifier.addExample(features6.tolist(), 6);
		knnClassifier.addExample(features7.tolist(), 7);
		knnClassifier.addExample(features8.tolist(), 8);
		knnClassifier.addExample(features8M2.tolist(), 8);
		knnClassifier.addExample(features8M3.tolist(), 8);
		knnClassifier.addExample(features8M4.tolist(), 8);
		knnClassifier.addExample(features9.tolist(), 9);
		knnClassifier.addExample(features9M.tolist(), 9);
		knnClassifier.addExample(features9B.tolist(), 9);
		knnClassifier.addExample(features0.tolist(), 0);
		knnClassifier.addExample(features0B.tolist(), 0);
		
		testinteger += 1;
		//console.log(testinteger);
	}
}
function Test(){
	
		
	CleanData();
	CleanDataZ();
	features = framesOfData.reshape(1,120);

	predictedSign = knnClassifier.classify(features.tolist(),GotResults);
		
	
}
function CleanData(){
	xValues = framesOfData.slice([],[],[0,6,3]);
	yValues = framesOfData.slice([],[],[1,6,3]);
	currentYMean = yValues.mean();
	currentXMean = xValues.mean();

	horizontalShift = 0.5 - currentXMean;

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

	//xValues = framesOfData.slice([],[],[0,6,3]);
	//yValues = framesOfData.slice([],[],[1,6,3]);
	//currentYMean = yValues.mean();

	
	
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
	//zValues = framesOfData.slice([],[],[2,6,3]);
	//currentZMean = zValues.mean();
}

function GotResults(err, result){
	if(result){
		if(DigitToShow >=10){
			x = DigitToShow - 10;
		}
		else{
			x = DigitToShow;
		}
		c = parseInt(result.label);
		n += 1;
		m = (((n - 1)* m + (parseInt(result.label) == x))/ n); 
		//console.log(err);
		console.log(c,m);
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
		stroke(255-m*255,255*m,0/*(i*40)*/);
		//green = m
		//red = 1 - m
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






