/* VARIABLES */
let canvasWidth = 1200;
let canvasHeight = 800;

let mazeModel;

let grid;
let cellSize = 100; // pixels (before 50)
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
      //matrix[count]=new Cell((x*cellSize)-canvasWidth/4,(y*cellSize)-canvasHeight/4,cellSize,cellProperties[i].l,cellProperties[i].r,cellProperties[i].t,cellProperties[i].b);
      count++;
    }
  }
  return matrix;
}

/*
// define l,r,t,b arguments:
let cellProperties [] = [
  //FIRST ROW:
  {l:1,0,1,1}, //0
  {0,1,1,0}, //1
  {1,0,1,0}, //2
  {0,0,1,1}, //3
  {0,1,1,0}, //4
  //SECOND ROW:
  {1,1,1,0}, //5
  {1,0,0,1}, //6
  {0,1,0,1}, //7
  {1,0,1,0}, //8
  {0,1,0,1}, //9
  //THIRD ROW:
  {1,1,0,0}, //10
  {1,0,1,0}, //11
  {0,1,1,0}, //12
  {1,0,0,1}, //13
  {0,1,1,0}, //14
  //FOURTH ROW:
  {1,0,0,0}, //15
  {0,1,0,1}, //16
  {1,0,0,1}, //17
  {0,0,1,1}, //18
  {0,1,0,1}, //19
  //FIFTH ROW:
  {1,0,0,1}, //20
  {0,0,1,1}, //21
  {0,0,1,1}, //22
  {0,0,1,1}, //23
  {0,1,1,1}, //24
];
*/

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
    fill(this.cellColor);
    rect(this.x,this.y,this.w,this.w);
  }
}

/* Nota bene: User is active, if leftwall of myself is free Y/N (0/1), proceed ahead
  Up/Down in/decrements of 5 cells because we're using same counter, update active */

/* WALKING WITH KEYBOARD */
document.addEventListener('keydown', (event) => {

/* LEFT KEY */
  if (event.keyCode == 37) {
    console.log("left");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].leftWall = false ....
      activeCell--;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    }

/* UP KEY */
  if (event.keyCode == 38) {
    console.log("up");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].topWall = false ....
    activeCell-=5;
    grid[activeCell].cellColor = color(255,0,0);
    grid[activeCell].currentCell = true;
  }

  /* RIGHT KEY */
  if (event.keyCode == 39) {
      console.log("right");
      grid[activeCell].cellColor = color(0,0,255);
      grid[activeCell].currentCell = false;
      //if grid[activeCell].rightWall = false ....
      console.log("INSIDE KEYCODE, RIGHT WALL IS: "+grid[activeCell].rightWall);
      if (grid[activeCell].rightWall == 0) {
        activeCell++;
        grid[activeCell].cellColor = color(255,0,0);
        grid[activeCell].currentCell = true;
      }
      else {
        activeCell==activeCell;
      }
    }

/* DOWN KEY */
  if (event.keyCode == 40) {
    console.log("down");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].bottomWall = false ....
    activeCell+=5;
    grid[activeCell].cellColor = color(255,0,0);
    grid[activeCell].currentCell = true;
  }

}); //end of eventListener **

/* === LOAD THE MODEL FIRST === */
function preload() {
  mazeModel = loadModel('assets/maze5.obj',true,successFunc,failureFunc);
}

/* CHECK FOR LOADING MODEL PRESENCE */
function successFunc(){
  //console.log("success");
}
function failureFunc(){
  //console.log("failure");
}

/* === A:: SETUP FUNCT === */
function setup(){
  maze = document.getElementById("maze");
  let canvas = createCanvas(canvasWidth,canvasHeight,WEBGL);
  grid = makeGrid(gridSize,gridSize,cellSize,cellSize);
  //canvas.parent('maze');
  grid[0].cellColor = color(255,0,0);
  grid[0].currentCell = true;
  //console.log(grid[0].cellColor);
  console.log("MY RIGHT WALL IS: "+grid[activeCell].rightWall);
  //console.log("GRID[0]:: "+grid[i].r);
} // end of SETUP

/* === B:: DRAW FUNCT === */
function draw() {
  background(200);
 let count =0;
  for (let x=0;x<gridSize;x++){
    for (let y=0;y<gridSize;y++){
      grid[count].display();
      count++;
    }
  }

 /* DRAW MODEL*/
  translate(-48.2,52.9);
  rotate(Math.PI/2);
  scale(2.48);
  model(mazeModel);

} //end of DRAW
