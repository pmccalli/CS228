let trainingCompleted = false;
let predictedClassLabels = nj.zeros([150,1]);
let testinteger = 0;
let numSamples = nj.zeros([150,1]);
const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 0;

let numFeatures = nj.zeros(150, 4);

//console.log(irisData.pick(4));


function draw(){
	//console.log("Draw");
	//console.log(train0.shape[3]);
	
	
		if(trainingCompleted == false){
			Train();
			trainingCompleted = true;
		}
		Test();
		
		
}
function Train(){
	for(i = 0; i < 2; i++){
		//console.log( train0.pick(null,null,null,i).toString());
		//console.log(testinteger);
		
		features = train0.pick(null,null,null,i);
		//console.log(testinteger);
		
		features = features.reshape(1,120);
		//console.log(testinteger);
		
		//console.log(features.toString());
		knnClassifier.addExample(features.tolist(), 0);
		testinteger += 1;
		console.log(testinteger);
		
	}
	
	
	
}
function Test(){
	for(i = 0; i < 2; i++){
		//console.log( test.pick(null,null,null,i).toString());
		features = test.pick(null,null,null,i);
		featurest = features.reshape(1,120);
		//console.log(featurest.toString());
		console.log(featurest.tolist());
		predictedSign = knnClassifier.classify(featurest.tolist(),GotResults());
		console.log(predictedSign.toString())
	}
}
function GotResults(err, result){
	
		console.log(typeof(result));
		console.log(parseInt(result.label));
		//console.log(result);
		predictedClassLabels.set(testingSampleIndex, 0, parseInt(result.label));
		//console.log(testingSampleIndex);
		testingSampleIndex += 1;
		if(testingSampleIndex >= 150){
			testingSampleIndex = 1;
		}
		console.log(testingSampleIndex);
		//console.log(testingSampleIndex, parseInt(result.label));
	
	
}






