var prediction1 = ""
var prediction2 = ""
Webcam.set({
    width: 350,
    height: 285,
    image_format: 'png',
    png_quality: 100
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");


function clickImage() {
    Webcam.snap(function(imgsrc) {
        document.getElementById("result").innerHTML = '<img id="image"src="' + imgsrc + '">'
    });
}
console.log(ml5.version);
var emotionmodel = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model has loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    speak_data_2 = "And the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    var photograph = document.getElementById("image");
    emotionmodel.classify(photograph, getresult);
}

function getresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (prediction1 == "happy") {
            document.getElementById("Prediction_1").innerHTML = "&#128522;";
        }

        if (prediction1 == "sad") {
            document.getElementById("Prediction_1").innerHTML = "&#128532;";
        }

        if (prediction1 == "angry") {
            document.getElementById("Prediction_1").innerHTML = "&#128545;";
        }

        if (prediction2 == "happy") {
            document.getElementById("Prediction_2").innerHTML = "&#128512;";
        }

        if (prediction2 == "sad") {
            document.getElementById("Prediction_2").innerHTML = "&#128546;";
        }

        if (prediction2 == "angry") {
            document.getElementById("Prediction_2").innerHTML = "&#128548;";
        }
    }
}