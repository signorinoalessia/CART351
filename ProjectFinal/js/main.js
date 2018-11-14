/* VARIABLES */
let canvasWidth = 1200;
let canvasHeight = 800;

let mazeModel;

let grid;
//let cellSize = 50; //pixels
let cellSize = 100;
let gridSize = 5; //rows,columns
let activeCell= 0; //x
let cellQty = 25; //quantity

/* RETURN A RANDOM VALUE */
let random = function(min,max){
  let rand = min + Math.random()*(max+1-min);
  rand = rand^0;
  return rand;
}

/* TWO-DIM ARRAY FOR GRID */
function makeGrid (numRows,numCols,cellSize,cellSize){
  let matrix = [];
let count =0;
  for (let y=0;y<numCols;y++){

    //let columns = [];
    for (let x=0;x<numRows;x++){
      matrix[count]=new Cell((x*cellSize)-canvasWidth/4,(y*cellSize)-canvasHeight/4,cellSize,random(0,1),random(0,1),random(0,1),random(0,1));
    count++;
    }
    //matrix[x]=columns;
  }
  return matrix;
}

/* CELL OBJECT */
function Cell(x,y,w,l,r,t,b){
  this.x = x;
  this.y = y;
  this.w = w;
  this.leftWall=l;
  this.rightWall=r;
  this.topWall=t;
  this.bottomWall=b;
  this.cellColor = color(0,0,255);
  this.currentCell = false;

  this.display =function(){
    //console.log(this.cellColor);
    fill(this.cellColor);
    rect(this.x,this.y,this.w,this.w);
  }
}

/*
-active = inside x,y
-is leftwall of myself, free? y/n, go leftWall
-up is ***minus 5*** using within row
-vb which cell am in (active)
-check left, walls of my left wall, update active
*/

document.addEventListener('keydown', (event) => {

/* LEFT KEY */
  if (event.keyCode == 37) {
    console.log("left");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid.activeCell.rightWall = false ....
    activeCell--;
    grid[activeCell].cellColor = color(255,0,0);
    grid[activeCell].currentCell = true;
  }

/* UP KEY */
  if (event.keyCode == 38) {
    console.log("up");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid.activeCell.rightWall = false ....
    activeCell-=5;
    grid[activeCell].cellColor = color(255,0,0);
    grid[activeCell].currentCell = true;
  }

  /* RIGHT KEY */
  if (event.keyCode == 39) {
      console.log("right");
      grid[activeCell].cellColor = color(0,0,255);
      grid[activeCell].currentCell = false;
      //if grid.activeCell.rightWall = false ....
      activeCell++;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    //for (let x=0;x<cellQty;x++){
      //check nearby cell, if no wall, advance
      //if (this.rightWall === false) {
      //  console.log(activeCell);
        //activeCell++;
        //rect(this.x,this.y,50,50);
        //fill(255,0,0);
    //  }
    //}
  }

/* DOWN KEY */
  if (event.keyCode == 40) {
    console.log("down");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid.activeCell.rightWall = false ....
    activeCell+=5;
    grid[activeCell].cellColor = color(255,0,0);
    grid[activeCell].currentCell = true;
  }

}); //end of eventListener **

/* LOAD THE MODEL FIRST */
function preload() {
  mazeModel = loadModel('assets/maze5.obj',true,successFunc,failureFunc);
}

/* CHECK FOR LOADING MODEL PRESENCE */
function successFunc(){
  console.log("success");
}
function failureFunc(){
  console.log("failure");
}

/* A:: SETUP FUNCT */
function setup(){
  maze = document.getElementById("maze");
  let canvas = createCanvas(canvasWidth,canvasHeight,WEBGL);

  // let context = canvas.getContext('2d');
  // let transX = canvas.width * 0.5;
  // let transY = canvas.height * 0.5;
  // context.translate(transX, transY);

  grid = makeGrid(gridSize,gridSize,cellSize,cellSize);
  //canvas.parent('maze');
  grid[0].cellColor = color(255,0,0);
  grid[0].currentCell = true;
  console.log(grid[0].cellColor);
}

/* B:: DRAW FUNCT */
function draw() {
  background(200);
 let count =0;
  for (let x=0;x<gridSize;x++){
    //let rowOfCells = grid[x];
    for (let y=0;y<gridSize;y++){
      grid[count].display();
      count++;
    }
  }

 /* DRAW MODEL*/
  translate(-40,51);
  rotate(Math.PI/2);
  scale(2.8);
  model(mazeModel);
}
