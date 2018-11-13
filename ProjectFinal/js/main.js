/* LINKING TO MAIN PROGRAM */


/*CANVAS VARIABLES */
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;
let mazeModel;

function preload() {
  mazeModel = loadModel('assets/hexMaze.obj',true,successFunc,failureFunc);
}

function successFunc(){
  console.log("success")
}
function failureFunc(){
  console.log("failure")
}

function setup(){
  maze = document.getElementById("maze");
  let canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT,WEBGL);
  //canvas.parent('maze');
}

function draw() {
  background(200);
  model(mazeModel);
}
