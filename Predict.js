let trainingCompleted = false;
let predictedClassLabels = nj.zeros([150,1]);

let numSamples = nj.zeros([150,1]);
const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 1;
var irisData = nj.array([[	5.1	,	3.5	,	1.4	,	0.2	,	0	],
[	4.9	,	3	,	1.4	,	0.2	,	0	],
[	4.7	,	3.2	,	1.3	,	0.2	,	0	],
[	4.6	,	3.1	,	1.5	,	0.2	,	0	],
[	5	,	3.6	,	1.4	,	0.2	,	0	],
[	5.4	,	3.9	,	1.7	,	0.4	,	0	],
[	4.6	,	3.4	,	1.4	,	0.3	,	0	],
[	5	,	3.4	,	1.5	,	0.2	,	0	],
[	4.4	,	2.9	,	1.4	,	0.2	,	0	],
[	4.9	,	3.1	,	1.5	,	0.1	,	0	],
[	5.4	,	3.7	,	1.5	,	0.2	,	0	],
[	4.8	,	3.4	,	1.6	,	0.2	,	0	],
[	4.8	,	3	,	1.4	,	0.1	,	0	],
[	4.3	,	3	,	1.1	,	0.1	,	0	],
[	5.8	,	4	,	1.2	,	0.2	,	0	],
[	5.7	,	4.4	,	1.5	,	0.4	,	0	],
[	5.4	,	3.9	,	1.3	,	0.4	,	0	],
[	5.1	,	3.5	,	1.4	,	0.3	,	0	],
[	5.7	,	3.8	,	1.7	,	0.3	,	0	],
[	5.1	,	3.8	,	1.5	,	0.3	,	0	],
[	5.4	,	3.4	,	1.7	,	0.2	,	0	],
[	5.1	,	3.7	,	1.5	,	0.4	,	0	],
[	4.6	,	3.6	,	1	,	0.2	,	0	],
[	5.1	,	3.3	,	1.7	,	0.5	,	0	],
[	4.8	,	3.4	,	1.9	,	0.2	,	0	],
[	5	,	3	,	1.6	,	0.2	,	0	],
[	5	,	3.4	,	1.6	,	0.4	,	0	],
[	5.2	,	3.5	,	1.5	,	0.2	,	0	],
[	5.2	,	3.4	,	1.4	,	0.2	,	0	],
[	4.7	,	3.2	,	1.6	,	0.2	,	0	],
[	4.8	,	3.1	,	1.6	,	0.2	,	0	],
[	5.4	,	3.4	,	1.5	,	0.4	,	0	],
[	5.2	,	4.1	,	1.5	,	0.1	,	0	],
[	5.5	,	4.2	,	1.4	,	0.2	,	0	],
[	4.9	,	3.1	,	1.5	,	0.2	,	0	],
[	5	,	3.2	,	1.2	,	0.2	,	0	],
[	5.5	,	3.5	,	1.3	,	0.2	,	0	],
[	4.9	,	3.6	,	1.4	,	0.1	,	0	],
[	4.4	,	3	,	1.3	,	0.2	,	0	],
[	5.1	,	3.4	,	1.5	,	0.2	,	0	],
[	5	,	3.5	,	1.3	,	0.3	,	0	],
[	4.5	,	2.3	,	1.3	,	0.3	,	0	],
[	4.4	,	3.2	,	1.3	,	0.2	,	0	],
[	5	,	3.5	,	1.6	,	0.6	,	0	],
[	5.1	,	3.8	,	1.9	,	0.4	,	0	],
[	4.8	,	3	,	1.4	,	0.3	,	0	],
[	5.1	,	3.8	,	1.6	,	0.2	,	0	],
[	4.6	,	3.2	,	1.4	,	0.2	,	0	],
[	5.3	,	3.7	,	1.5	,	0.2	,	0	],
[	5	,	3.3	,	1.4	,	0.2	,	0	],
[	7	,	3.2	,	4.7	,	1.4	,	1	],
[	6.4	,	3.2	,	4.5	,	1.5	,	1	],
[	6.9	,	3.1	,	4.9	,	1.5	,	1	],
[	5.5	,	2.3	,	4	,	1.3	,	1	],
[	6.5	,	2.8	,	4.6	,	1.5	,	1	],
[	5.7	,	2.8	,	4.5	,	1.3	,	1	],
[	6.3	,	3.3	,	4.7	,	1.6	,	1	],
[	4.9	,	2.4	,	3.3	,	1	,	1	],
[	6.6	,	2.9	,	4.6	,	1.3	,	1	],
[	5.2	,	2.7	,	3.9	,	1.4	,	1	],
[	5	,	2	,	3.5	,	1	,	1	],
[	5.9	,	3	,	4.2	,	1.5	,	1	],
[	6	,	2.2	,	4	,	1	,	1	],
[	6.1	,	2.9	,	4.7	,	1.4	,	1	],
[	5.6	,	2.9	,	3.6	,	1.3	,	1	],
[	6.7	,	3.1	,	4.4	,	1.4	,	1	],
[	5.6	,	3	,	4.5	,	1.5	,	1	],
[	5.8	,	2.7	,	4.1	,	1	,	1	],
[	6.2	,	2.2	,	4.5	,	1.5	,	1	],
[	5.6	,	2.5	,	3.9	,	1.1	,	1	],
[	5.9	,	3.2	,	4.8	,	1.8	,	1	],
[	6.1	,	2.8	,	4	,	1.3	,	1	],
[	6.3	,	2.5	,	4.9	,	1.5	,	1	],
[	6.1	,	2.8	,	4.7	,	1.2	,	1	],
[	6.4	,	2.9	,	4.3	,	1.3	,	1	],
[	6.6	,	3	,	4.4	,	1.4	,	1	],
[	6.8	,	2.8	,	4.8	,	1.4	,	1	],
[	6.7	,	3	,	5	,	1.7	,	1	],
[	6	,	2.9	,	4.5	,	1.5	,	1	],
[	5.7	,	2.6	,	3.5	,	1	,	1	],
[	5.5	,	2.4	,	3.8	,	1.1	,	1	],
[	5.5	,	2.4	,	3.7	,	1	,	1	],
[	5.8	,	2.7	,	3.9	,	1.2	,	1	],
[	6	,	2.7	,	5.1	,	1.6	,	1	],
[	5.4	,	3	,	4.5	,	1.5	,	1	],
[	6	,	3.4	,	4.5	,	1.6	,	1	],
[	6.7	,	3.1	,	4.7	,	1.5	,	1	],
[	6.3	,	2.3	,	4.4	,	1.3	,	1	],
[	5.6	,	3	,	4.1	,	1.3	,	1	],
[	5.5	,	2.5	,	4	,	1.3	,	1	],
[	5.5	,	2.6	,	4.4	,	1.2	,	1	],
[	6.1	,	3	,	4.6	,	1.4	,	1	],
[	5.8	,	2.6	,	4	,	1.2	,	1	],
[	5	,	2.3	,	3.3	,	1	,	1	],
[	5.6	,	2.7	,	4.2	,	1.3	,	1	],
[	5.7	,	3	,	4.2	,	1.2	,	1	],
[	5.7	,	2.9	,	4.2	,	1.3	,	1	],
[	6.2	,	2.9	,	4.3	,	1.3	,	1	],
[	5.1	,	2.5	,	3	,	1.1	,	1	],
[	5.7	,	2.8	,	4.1	,	1.3	,	1	],
[	6.3	,	3.3	,	6	,	2.5	,	2	],
[	5.8	,	2.7	,	5.1	,	1.9	,	2	],
[	7.1	,	3	,	5.9	,	2.1	,	2	],
[	6.3	,	2.9	,	5.6	,	1.8	,	2	],
[	6.5	,	3	,	5.8	,	2.2	,	2	],
[	7.6	,	3	,	6.6	,	2.1	,	2	],
[	4.9	,	2.5	,	4.5	,	1.7	,	2	],
[	7.3	,	2.9	,	6.3	,	1.8	,	2	],
[	6.7	,	2.5	,	5.8	,	1.8	,	2	],
[	7.2	,	3.6	,	6.1	,	2.5	,	2	],
[	6.5	,	3.2	,	5.1	,	2	,	2	],
[	6.4	,	2.7	,	5.3	,	1.9	,	2	],
[	6.8	,	3	,	5.5	,	2.1	,	2	],
[	5.7	,	2.5	,	5	,	2	,	2	],
[	5.8	,	2.8	,	5.1	,	2.4	,	2	],
[	6.4	,	3.2	,	5.3	,	2.3	,	2	],
[	6.5	,	3	,	5.5	,	1.8	,	2	],
[	7.7	,	3.8	,	6.7	,	2.2	,	2	],
[	7.7	,	2.6	,	6.9	,	2.3	,	2	],
[	6	,	2.2	,	5	,	1.5	,	2	],
[	6.9	,	3.2	,	5.7	,	2.3	,	2	],
[	5.6	,	2.8	,	4.9	,	2	,	2	],
[	7.7	,	2.8	,	6.7	,	2	,	2	],
[	6.3	,	2.7	,	4.9	,	1.8	,	2	],
[	6.7	,	3.3	,	5.7	,	2.1	,	2	],
[	7.2	,	3.2	,	6	,	1.8	,	2	],
[	6.2	,	2.8	,	4.8	,	1.8	,	2	],
[	6.1	,	3	,	4.9	,	1.8	,	2	],
[	6.4	,	2.8	,	5.6	,	2.1	,	2	],
[	7.2	,	3	,	5.8	,	1.6	,	2	],
[	7.4	,	2.8	,	6.1	,	1.9	,	2	],
[	7.9	,	3.8	,	6.4	,	2	,	2	],
[	6.4	,	2.8	,	5.6	,	2.2	,	2	],
[	6.3	,	2.8	,	5.1	,	1.5	,	2	],
[	6.1	,	2.6	,	5.6	,	1.4	,	2	],
[	7.7	,	3	,	6.1	,	2.3	,	2	],
[	6.3	,	3.4	,	5.6	,	2.4	,	2	],
[	6.4	,	3.1	,	5.5	,	1.8	,	2	],
[	6	,	3	,	4.8	,	1.8	,	2	],
[	6.9	,	3.1	,	5.4	,	2.1	,	2	],
[	6.7	,	3.1	,	5.6	,	2.4	,	2	],
[	6.9	,	3.1	,	5.1	,	2.3	,	2	],
[	5.8	,	2.7	,	5.1	,	1.9	,	2	],
[	6.8	,	3.2	,	5.9	,	2.3	,	2	],
[	6.7	,	3.3	,	5.7	,	2.5	,	2	],
[	6.7	,	3	,	5.2	,	2.3	,	2	],
[	6.3	,	2.5	,	5	,	1.9	,	2	],
[	6.5	,	3	,	5.2	,	2	,	2	],
[	6.2	,	3.4	,	5.4	,	2.3	,	2	],
[	5.9	,	3	,	5.1	,	1.8	,	2	]]);
let numFeatures = nj.zeros(150, 4);

//console.log(irisData.pick(4));


function draw(){
	//console.log("Draw");
	
	
	
		if(trainingCompleted == false){
			Train();
			trainingCompleted = true;
		}
		Test();
		DrawCircles();
		
}
function Train(){
	console.log("Train");
	
	//console.log('I am being trained, Choo Choo!');
	for(let i = 0; i <= 149; i+= 2){
		//console.log(i);
		currentFeatures = irisData.pick(i).slice([-1]);
		//console.log(currentFeatures.toString())
		currentLabel = irisData.pick(i).get(4);
		//console.log(currentLabel.toString());
		//console.log(currentFeatures.toString());
		knnClassifier.addExample(currentFeatures.tolist(), currentLabel);
		
	}
}
function Test(){
	//console.log("Test");
	
	//console.log('I am being tested, (insert pun)');
		//console.log(irisData);
		currentFeatures = irisData.pick(testingSampleIndex).slice([-1]);
		currentLabel = irisData.pick(testingSampleIndex).get(4);
		//console.log(currentFeatures.toString(), currentLabel.toString());
		//console.log(testingSampleIndex);
		//console.log(irisData);
		//console.log(iris);
		//console.log(currentFeatures.toString());
		predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);
		
		//console.log(currentFeatures, currentLabel);
	
	
}

function GotResults(err, result){
	//console.log(err);
	//console.log(result);
	if(result) {
		//console.log(result);
		//console.log(parseInt(result.label));
		//console.log(result);
		predictedClassLabels.set(testingSampleIndex, 0, parseInt(result.label));
		//console.log(testingSampleIndex);
		testingSampleIndex = testingSampleIndex + 2;
		if(testingSampleIndex >= 150){
			testingSampleIndex = 1;
		}
		console.log(predictedClassLabels);
		//console.log(testingSampleIndex, parseInt(result.label));
	}
	else {
		//console.log("RESULTS WERE NULL");
	}
}

function DrawCircles(){
	//console.log("DrawCircles");
		
		for(i = 0; i <= 149; i++){
			x = irisData.get(i, 0);
			y = irisData.get(i, 1);
			x = x * 100;
			y = y * 100;
			c = irisData.get(i, 4);
			p = predictedClassLabels.get(i,0);
			//console.log(predictedClassLabels.get(0, i));
			//console.log(predictedClassLabels.shape);
			if(c == 0){
				fill('red');
			}
			else if(c == 1){
				fill('blue');
			}
			else if(c == 2){
				fill('green');
			}
			if(i%2 == 0){
				stroke('black');
			}
			else{
				if(p == 0){
				stroke('red');
				}
				else if(p == 1){
					stroke('blue');
				}
				else if(p == 2){
					stroke('green');
				}
			}
			//console.log(i, x,y,);
			//console.log(predictedClassLabels);
			circle(x,y,10)
			
		}
		
}	

