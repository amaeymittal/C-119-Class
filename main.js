var canvas

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis;
}

function clear_canvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}
function draw(){
    strokeWeight(7)

    stroke(0)
    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function gotResult(error,results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("label").innerHTML = "label:"+results[0].label;
        document.getElementById("accuracy").innerHTML = "accuracy:"+Math.round(results[0].confidence*100)+"%";
        var utterThis = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterThis);
    }
}