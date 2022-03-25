var object_locations = {
    "World_Government":{x:825,y:340,color:'red'}, 
    "Zou":{x:166,y:320,color:'blue'}, 
    "Marijyoa":{x:825,y:300,color:'orange'}, 
    "Wholecake_Island":{x:190,y:320,color:'green'}, 
    "Wano":{x:250,y:310,color:'magenta'}, 
    "Dressrosa":{x:90,y:310,color:'white'}, 
    "Laughtale":{x:350,y:310,color:'red'},
    "Zoro":{x:200,y:300,color:'pink'},
    "Fish_island":{x:777,y:300, color:'black'},
    "Shanks":{x:300,y:200,color:'white'},
    "One_Piece":{x:350,y:310,color:'red'},
    "Fuyujima":{x:520,y:310,color:'grey'},
    "Skypiea":{x:620,y:340,color:'blue'},
    "Enies_Lobby":{x:730,y:320,color:'green'},
    "Alabasta":{x:560,y:320,color:'red'},
    "Florian_Triangle":{x:740,y:310,color:'white'}
};

/*
var object_locations = [
{name:"World_Government", value:{x:825,y:340,color:'red'}}, 
{name:"Zou", value:{x:166,y:320,color:'blue'}}, 
{name:"Marijyoa", value:{x:825,y:300,color:'orange'}}, 
{name:"Wholecake_Island", value:{x:190,y:320,color:'green'}}, 
{name:"Wano", value:{x:250,y:310,color:'magenta'}}, 
{name:"Dressrosa", value:{x:90,y:310,color:'white'}}, 
{name:"Laughtale", value:{x:350,y:310,color:'red'}},
{name:"Zoro", value:{x:200,y:300,color:'pink'}},
{name:"Fish_island", value:{x:777,y:300, color:'black'}},
{name:"Shanks", value:{x:300,y:200,color:'white'}},
{name:"One_Piece", value:{x:350,y:310,color:'red'}},
{name:"Fuyujima", value:{x:520,y:310,color:'grey'}},
{name:"Skypiea", value:{x:620,y:340,color:'blue'}},
{name:"Enies_Lobby", value:{x:730,y:320,color:'green'}},
{name:"Alabasta", value:{x:560,y:320,color:'red'}},
{name:"Florian_Triangle", value:{x:740,y:310,color:'white'}}
];
*/
// var = x[i];
// var = y[i];
/*function coordination(){
	for(i=0; i<z.length; i++){
		if (i=0){
		
		}
	}
}*/
// window.onload = search(){ 
// const element = document.getElementById("map");

// 	for(i=0; i<z.length; i++){
		
// 	}

// }

let theCanvas = null;
let opacity = 0.0;
let alphaFinal = 0.0;
let alphaWeight = 0.02;//from -0.2 to o.2 
let circleInfo = null;
let animationId = null;

let onePieceIcon = new Image();
let iconSize = {width:30, height:30};

window.onload = function() {
    theCanvas = document.getElementById('jsCanvas');
    if (theCanvas == null) {
        alert('canvas is not supported.');
    }

    onePieceIcon.src = "one-piece-icon.png";

    onChangeLocation();
    // test1("Fish_island");
}

function drawCircleWithAnimation() {
    var context = theCanvas.getContext('2d');
    //context.globalCompsiteOperation = 'destination-over';

    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    context.save();
    context.beginPath();
    context.arc(circleInfo.x, circleInfo.y, 15, 0, 2*Math.PI, false);//void ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    context.globalAlpha = opacity;
    context.fillStyle = circleInfo.color;
    context.strokeStyle = 'white';
    context.fill();
    context.stroke();
    context.restore();

    context.drawImage(onePieceIcon, circleInfo.x-iconSize.width*0.5, circleInfo.y-iconSize.height*0.5, iconSize.width, iconSize.height);

    //0.0 to fully disappear and 1.0 to fully appear on the map
    opacity += alphaFinal;
    if (opacity >= 1.0) {
        opacity = 1.0;
        alphaFinal = -alphaWeight;
    }
    if (opacity <= 0.0) {
        opacity = 0.0;
        alphaFinal = alphaWeight;
    }

    animationId = window.requestAnimationFrame(drawCircleWithAnimation);
}

function drawCircle(x, y, color) {
    circleInfo = {x:x,y:y,color:color};  //get the x, y and color info from the array
    opacity = 0.0; 
    alphaFinal = alphaWeight;

    if (animationId != null) {
        window.cancelAnimationFrame(animationId);
    }
    animationId = window.requestAnimationFrame(drawCircleWithAnimation); 
}

function getLocationPos(location) {
    for(const [key, value] of Object.entries(object_locations)) {
        if (key == location) {
            drawCircle(value.x, value.y, value.color);
        }
    }
/*
   for(var i=0; i<object_locations.length; i++) {
       var data = object_locations[i];
       if (data.name == location) {
           var value = data.value;
           drawCircle(value.x, value.y, value.color);
        }
   }
*/
}
// function test1(location){
//     const element = document.getElementById('console');
//     for(const [key,value] of Object.entries(object_locations)){
//         if (key == location){
//             element.innerHTML += ("x:" + value.x + ",y:" + value.y + ",color:" + value.color);
//         }
//     }
// }

function onChangeLocation() {

    var locations = document.getElementById("formLocation");
    for (var i=0;i<locations.length;i++) {
        if (locations[i].checked) {
            getLocationPos(locations[i].value);
        }
    }

}
