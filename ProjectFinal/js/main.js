let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;
let mazeModel;
let cellSize =50;
let grid;
let active;

function makeGrid (numRows,numCols,total){
  let matrix = [];


  for (let x=0;x<numRows;x++){
    let columns = [];
    for (let y=0;y<numCols;y++){
      columns[y]=new Cell(x*cellSize,y*cellSize,cellSize,//rdm 0,);

    }
    matrix[x]=columns;
  }
  return matrix;
}

function Cell(x,y,w,l,r,t,b){
  this.x = x;
  this.y = y;
  this.w = w;
  this.leftWall=l;

  this.display =function(){
    fill(255,0,0);
    rect(this.x,this.y,this.w,this.w);
  }
}

/*===WALKING AROUND WITH KEYBOARD===
$(document).keydown(function(myKey) {
  active = $(td.active).removeClass('active');
  let currentCell = active.index(); //x
  let currentRow = active.closest('tr').index(); //y

// vb which cell am in (active)
// check left, walls of my left wall, update active
  if (e.keyCode == 37) { //left
     currentCell--;
  }
  if (e.keyCode == 38) { //up
      currentRow--;
  }
  if (e.keyCode == 39) { //right
      currentCell++;
  }
  if (e.keyCode == 40) {  //down
      currentRow++;
  }
  active = $('tr').eq(currentRow).find('td').eq(currentCell).addClass('active');

});*/

// inside x,y
// is leftwall of myself, free? y/n, go leftWall
//up is minus 5 using within row

function preload() {
  //mazeModel = loadModel('assets/hexMaze.obj',true,successFunc,failureFunc);
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
  grid = makeGrid(5,5,50,50);
  //canvas.parent('maze');
}

function draw() {
  background(200);

  for (let x=0;x<5;x++){
    let rowOfCells = grid[x];
    for (let y=0;y<5;y++){
      rowOfCells[y].display();
    }

  }

  //model(mazeModel);
}
