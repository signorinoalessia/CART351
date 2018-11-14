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
      //matrix[count]=new Cell((x*cellSize)-canvasWidth/4,(y*cellSize)-canvasHeight/4,cellSize,random(0,1),random(0,1),random(0,1),random(0,1));
      matrix[count]=new Cell((x*cellSize)-canvasWidth/4,(y*cellSize)-canvasHeight/4,cellSize,cellProperties[count].l,cellProperties[count].r,cellProperties[count].t,cellProperties[count].b);
      count++;
    }
  }
  return matrix;
}

/*ASSOCIATIVE ARRAY of OBJECTS (which are in {}) --> define l,r,t,b properties: */

let cellProperties = [
  //FIRST ROW:
  {l:1,r:0,t:1,b:1}, //0
  {l:0,r:1,t:1,b:0}, //1
  {l:1,r:0,t:1,b:0}, //2
  {l:0,r:0,t:1,b:1}, //3
  {l:0,r:1,t:1,b:0}, //4
  //SECOND ROW:
  {l:1,r:1,t:1,b:0}, //5
  {l:1,r:0,t:0,b:1}, //6
  {l:0,r:1,t:0,b:1}, //7
  {l:1,r:0,t:1,b:0}, //8
  {l:0,r:1,t:0,b:1}, //9
  //THIRD ROW:
  {l:1,r:1,t:0,b:0}, //10
  {l:1,r:0,t:1,b:0}, //11
  {l:0,r:1,t:1,b:0}, //12
  {l:1,r:0,t:0,b:1}, //13
  {l:0,r:1,t:1,b:0}, //14
  //FOURTH ROW:
  {l:1,r:0,t:0,b:0}, //15
  {l:0,r:1,t:0,b:1}, //16
  {l:1,r:0,t:0,b:1}, //17
  {l:0,r:0,t:1,b:1}, //18
  {l:0,r:1,t:0,b:1}, //19
  //FIFTH ROW:
  {l:1,r:0,t:0,b:1}, //20
  {l:0,r:0,t:1,b:1}, //21
  {l:0,r:0,t:1,b:1}, //22
  {l:0,r:0,t:1,b:1}, //23
  {l:0,r:1,t:1,b:1}, //24
];


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
  console.log(grid[activeCell]);
/* LEFT KEY */
  if (event.keyCode == 37) {
    console.log("left");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].leftWall = false ....
    console.log("LEFT WALL IS: "+grid[activeCell].leftWall);
    if (grid[activeCell].leftWall == 0) {
      activeCell--;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    } else {
      activeCell=activeCell;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    }
  }

/* UP KEY */
  if (event.keyCode == 38) {
    console.log("up");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].topWall = false ....
    console.log("TOP WALL IS: "+grid[activeCell].topWall);
    if (grid[activeCell].topWall == 0) {
      activeCell-=5;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    } else {
      activeCell=activeCell;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    }
  }

  /* RIGHT KEY */
  if (event.keyCode == 39) {
      console.log("right");
      grid[activeCell].cellColor = color(0,0,255);
      grid[activeCell].currentCell = false;
      //if grid[activeCell].rightWall = false ....
      console.log("RIGHT WALL IS: "+grid[activeCell].rightWall);
      if (grid[activeCell].rightWall == 0) {
        activeCell++;
        grid[activeCell].cellColor = color(255,0,0);
        grid[activeCell].currentCell = true;
      } else {
        activeCell=activeCell;
        grid[activeCell].cellColor = color(255,0,0);
        grid[activeCell].currentCell = true;
      }
    }

/* DOWN KEY */
  if (event.keyCode == 40) {
    console.log("down");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    //if grid[activeCell].bottomWall = false ....
    console.log("BOTTOM WALL IS: "+grid[activeCell].bottomWall);
    if (grid[activeCell].bottomWall == 0) {
      activeCell+=5;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    } else {
      activeCell=activeCell;
      grid[activeCell].cellColor = color(255,0,0);
      grid[activeCell].currentCell = true;
    }
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
  // console.log("MY RIGHT WALL IS: "+grid[activeCell].rightWall);
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
