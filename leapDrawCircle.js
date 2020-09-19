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
	fingers = hand['fingers'];
	HandleFinger(fingers)
}	
function HandleFinger(fingers){
	for(i in fingers){
		index = fingers[1]
		//console.log(fingers[i]);
		
		if(i == 1){
			//console.log(index);
			tip = index['tipPosition'];
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
			console.log(xRatio, yRatio);
			
			let canvasX = xRatio * width;
			let canvasY = yRatio * height;
			
			circle(canvasX, canvasY, 50);
		}
		
		if(rawXMin > x){
			rawXMin = x;
		}
		if(rawYMin > y){
			rawYMin = y;
		}
		if(rawXMax < x){
			rawXMax = x;
		}
		if(rawYMax < y){
			rawYMax = y;
		}
		console.log(rawXMin, rawYMin, rawXMax, rawYMax)
	}
}


Leap.loop(controllerOptions, function(frame) {
	
	clear();
	HandleFrame(frame);
	//p = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//g = Math.floor(Math.random()*2) == 1 ? 1 : -1
	//console.log(i)
	
	
	
		//console.log(fingers);
		
	
	
	
});
