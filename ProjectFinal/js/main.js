/* CANVAS VARIABLES */
let canvasWidth = 1200;
let canvasHeight = 800;

/* MAZE */
let mazeModel;
let grid;
let cellSize = 100; // pixels (before 50)
let gridSize = 5; //rows,columns
let activeCell= 0; //x
let cellQty = 25; //quantity

/* CAMERA DIRECTION */
let x,y,z,lx,ly,lz;
let forwardBackwardSpeed = 2;
let keys = [false,false,false,false];
let leftRightRotSpeed = 0.5;
let leftRightAngle = 0.0;

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



/* ============ WALKING WITH KEYBOARD ============ */

/* Nota bene: User is active, if leftwall of myself is free Y/N (0/1), proceed ahead
  Up/Down in/decrements of 5 cells because we're using same counter, update active */

document.addEventListener('keydown', (event) => {
  console.log(grid[activeCell]);
/* LEFT KEY */
  if (event.keyCode == 37) {
    console.log("left");
    grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    keys[3] = true;
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
    keys[0] = true;
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
      keys[2] = false;
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
    keys[1] = true;
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

// document.addEventListener('keyup', (event) => {
//   keys[0] = false;
//   keys[1] = false;
//   keys[2] = false;
//   keys[3] = false;
// }

/* =============== WEATHER DATA =================== */
// ref class example week 5

/*
  let myKey = "0bef928982350078b0d564afdd383f25"; //get from e-mail

  // HTML built-in geo-loc
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usePosition);
  } else {
      console.log( "Geolocation is not supported by this browser.");
  }

  // Use position from latitude and longitude
  function usePosition(position) {
    console.log("Latitude: " + position.coords.latitude +
    " + Longitude: " + position.coords.longitude);

    //ONCE position is valid
    $("#ResWeather").empty();
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139

    let urlLoc = "api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+ position.coords.longitude;
    let urlToSend = "https:"+urlLoc +"&APPID="+myKey;
    // url and callback
    $.getJSON(urlToSend,function(results){displayResults(results,results.name);})

       //fail
       .fail(function() {
         console.log( "error" );
       });
       // getJSON
   }//function usePosition

   // display as wall hues
   function displayResults(results,position){
     console.log(results);

     let weatherMat = results.weather[0].main; //PART OF THE JSON OBJECT;
     console.log(weatherMat);
   }
   */

/*
https://openweathermap.org/weather-conditions
"clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain", "rain", "thunderstorm", "snow", "mist"
thunderstorm = 200-232
drizzle = 300-321
rain = 500-531
snow = 600-622
mist = 701-781
clear = 800
clouds = 801-804

*/

/* ============ LOAD THE MODEL FIRST ============= */
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

/* ============== A:: SETUP FUNCT =============== */
function setup(){

  maze = document.getElementById("maze");
  let canvas = createCanvas(canvasWidth,canvasHeight,WEBGL);

// camera pos and direction
  x=0.0;
  y=0.0;
  z=100.0;
  lx=0.0;
  ly=0.0;
  lz=-1.0;

  moveX = width/2;
  background(0);

  grid = makeGrid(gridSize,gridSize,cellSize,cellSize);
  grid[0].cellColor = color(255,0,0);
  grid[0].currentCell = true;

  //img = loadImage("assets/mat2.png");
  frameRate(30);

  //console.log(grid[0].cellColor);
  //console.log("MY RIGHT WALL IS: "+grid[activeCell].rightWall);
  //console.log("GRID[0]:: "+grid[i].r);

} // end of SETUP

/* ============== B:: DRAW FUNCT =============== */
function draw() {
  background(200);
 let count =0;

  for (let x=0;x<gridSize;x++){
    for (let y=0;y<gridSize;y++){
      //grid[count].display(); // NOT DISPLAYED BECAUSE ORIENTATION IS DIFF **
      count++;
    }
  }

 /* DRAW MODEL */

  push();
  translate(-48.2,52.9);
  rotate(Math.PI/2);
  rotate(Math.PI/2);
  rotateX(Math.PI/2);
  scale(2.48);

  //set material from weather API here ****
  // map all possible main. parameters, ex:snow to value ranges
  // strokeWeight(1);
  // stroke(20, 0, 120, 0.1);
  //ambientMaterial(0,50,180);

  stroke(0,50,230);
  normalMaterial();
  model(mazeModel);
  pop();

  /* ========= CAMERA ========*/

  //  https://medium.com/@behreajj/cameras-in-processing-2d-and-3d-dc45fd03662c

  //camera(x,y,z, ----> the camera position
  //centerX,centerY,centerZ, ----> the point to look at
  //upX,upY,upZ); ----> the 'up' vector for the camera

  //IDEAL CAMERA POSITION: *****
  // camera(0,55,210,
  //   0,60,0,
  //   0,1,0);

  camera(x, y, z,
  x+lx, y+ly, z+lz,
  0.0, 1.0, 0.0);

  //forward
  if(keys[0] == true){
    console.log("testF");
     x += lx * forwardBackwardSpeed;
     z += lz * forwardBackwardSpeed;
  }

  //backward
  if(keys[1] == true){
    console.log("testB");
     x -= lx * forwardBackwardSpeed;
     z -= lz * forwardBackwardSpeed;
  }
  //right
  if (keys[2]==true){
      console.log("testR");
      leftRightAngle -= leftRightRotSpeed;
      lx = sin(radians(leftRightAngle));
      lz = -cos(radians(leftRightAngle));
    //  y -= ly * forwardBackwardSpeed;
    //  x -= lx * forwardBackwardSpeed;
    }
    //left
    if (keys[3]==true){
      console.log("testL");
      leftRightAngle += leftRightRotSpeed;
      lx = sin(radians(leftRightAngle));
      lz = -cos(radians(leftRightAngle));
    }

  /*let camX = 0;
  let camY = 0;
  let camRot = 0;
  let camRotIncr = 0.5;
  let camMoveSpeed = 30;*/

// document.addEventListener('keydown', (event) => {
//     /* LEFT KEY */
//     if (event.keyCode == 37) {
//       keys[3] = true;
//       //camRot -= camRotIncr;
//     }
//
//   /* UP KEY */
//     if (event.keyCode == 38) {
//       keys[0] = true;
//       // camX = camX + cos(camRot) * camMoveSpeed;
//       // camY = camY + sin(camRot) * camMoveSpeed;
//     }
//
//     /* RIGHT KEY */
//     if (event.keyCode == 39) {
//       keys[2] = true;
//       //camRot += camRotIncr;
//     }
//
//     /* DOWN KEY */
//     if (event.keyCode == 40) {
//       keys[1] = true;
      // camX = camX - cos(camRot) * camMoveSpeed;
      // camY = camY - sin(camRot) * camMoveSpeed;
  //   }
  // }

    // camera(camX,55,camY,
    // 0,camRot,0,
    // 0,camMoveSpeed,0);

  // push();
  // pop();


} //end of DRAW
