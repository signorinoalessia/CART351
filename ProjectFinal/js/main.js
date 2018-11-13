let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;
let mazeModel;


Array.matrix= function(numRows,numCols,total){
  let rows = [];
  for (let i=0;i<numRows;i++){
    let columns = [];
    for (let j=0;j<numCols;j++){
      columns[j]=total;
    }
    rows[i]=columns;
  }
  return rows;
}


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
