

/* CANVAS VARIABLES */
let canvasWidth = 1200;
let canvasHeight = 800;

/* MAZE */
let mazeModel;
let grid;
let cellSize = 100; // pixels
let gridSize = 5; //rows,columns

let cellQty = 25; //quantity

/* CAMERA DIRECTION */
let x,y,z,lx,ly,lz;
let forwardBackwardSpeed = 2;
let keys = [false,false,false,false];
let leftRightRotSpeed = 1.2;
let leftRightAngle = 0.0;
let testLeftRightAngle = 0.0;
let range = 35;
let amTurned = false;

let px = 0.0;

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

  //mapped to a single array (each cell has own array)
  this.walls = [];
  this.walls.push(this.topWall);
  this.walls.push(this.rightWall);
  this.walls.push(this.bottomWall);
  this.walls.push(this.leftWall);

  this.display =function(){
    fill(this.cellColor);
    rect(this.x,this.y,this.w,this.w);
  }
}


/* ============ WALKING WITH KEYBOARD ============ */

/* N.B: User is active, if leftwall of myself is free Y/N (0/1), proceed ahead
  Up/Down in/decrements of 5 cells because we're using same counter, update active */

document.addEventListener('keydown', (event) => {
/* LEFT KEY */
  if (event.keyCode == 37) {
    //grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    keys[3] = true;
  }
/* UP KEY */
  if (event.keyCode == 38) {
    //grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    keys[0] = true;
  }
  /* RIGHT KEY */
  if (event.keyCode == 39) {
      //grid[activeCell].cellColor = color(0,0,255);
      grid[activeCell].currentCell = false;
      keys[2] = true;
  }
/* DOWN KEY */
  if (event.keyCode == 40) {
    //grid[activeCell].cellColor = color(0,0,255);
    grid[activeCell].currentCell = false;
    keys[1] = true;
  }
}); //end of eventListener

document.addEventListener('keyup', (event) => {
/* LEFT KEY */
  if (event.keyCode == 37) {
    keys[3] = false;
  }
  if (event.keyCode == 38) {
    keys[0] = false;
  }
  if (event.keyCode == 39) {
    keys[2] = false;
  }
  if (event.keyCode == 40) {
    keys[1] = false;
  }
});

/* ============ LOAD THE MODEL FIRST ============= */
function preload() {
  mazeModel = loadModel('assets/maze5b.obj',true,successFunc,failureFunc);
  girlModel = loadModel('assets/girl.obj',true,successFunc,failureFunc);
}
console.log(mazeModel);
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
  z=-100.0;
  lx=0.0;
  ly=0.0;
  lz=-1.0;

  moveX = width/2;
  background(0);

  grid = makeGrid(gridSize,gridSize,cellSize,cellSize);
  grid[0].cellColor = color(255,0,0);
  grid[0].currentCell = true;
  frameRate(30);

  img = loadImage("assets/mat3.png");
  imgGray = loadImage("assets/mat4.png");
  //console.log(grid[0].cellColor);
  //console.log("GRID[0]:: "+grid[i].r);
  console.log(grid[activeCell]);

} // end of SETUP

/* ============== B:: DRAW FUNCT =============== */
function draw() {
  background(0);
 let count =0;

  for (let x=0;x<gridSize;x++){
    for (let y=0;y<gridSize;y++){
      //grid[count].display(); // NOT DISPLAYED BECAUSE ORIENTATION IS DIFF **
      count++;
    }
  }

 /* DRAW MODEL */
  //directionalLight(255);

  push();
  translate(-48.2,52.9);
  rotate(Math.PI/2);
  rotate(Math.PI/2);
  rotateX(Math.PI/2);
  scale(2.48);
  //ambientMaterial(0,40,100);
  //stroke(180,50,20,0.5);
  //normalMaterial();
  texture(img);
  //fill(0,40,100);
  //stroke(180,50,20,0.5);
  model(mazeModel);
  pop();

  push();
  translate(50,52.9,0);
  rotate(Math.PI/2);
  rotateX(Math.PI/2);
  rotateY(-Math.PI/2);
  scale(0.6);
  //normalMaterial();
  texture(imgGray);
  model(girlModel);
  pop();



  /* ========= CAMERA ========*/

  /* camera(x,y,z, ----> the camera position
  centerX,centerY,centerZ, ----> the point to look at
  upX,upY,upZ); ----> the 'up' vector for the camera

  IDEAL CAMERA POSITION:
  camera(0,55,210,
    0,60,0,
    0,1,0); */

  camera(x, y, z,
  x+lx, y+ly, z+lz,
  0.0, 1.0, 0.0);


    /* ========= KEYBOARD CONTROLS ======== */

  let currentGridCellWalls = grid[activeCell].walls;
  console.log(activeCell+ "ACTIVECELL");
  //forward
  if(keys[0] == true){

    if(abs(px - x)>100){
      activeCell += 1;
      px = x;
    }
    console.log("keysF");

    console.log("z: "+z);
    console.log("x: "+x);
     //console.log("MY TOP WALL IS: "+grid[activeCell].topWall);
     // if (grid[activeCell].topWall == 0) {

    if (amTurned == true) {
    // ** if im turning which wall do I care about? **
      console.log("INSIDE FWD turned:: "+amTurned);
      // t,r,b,l
      // *** if previous turn was right, check currentGridCellWalls clockwise
      // if grid[activeCell].right {
       //gridActiveCellWalls[i] += 1;
       // currentGridCellWalls[i] += 1;
       //console.log(currentGridCellWalls[i]);
      // }

      //*** if previous turn was left, currentGridCellWalls[i] anticlockwise
    //  gridActiveCellWalls[i] -= 1

      // each cell is 100px
      // activeCell+=1; // NO, DEPENDS ON OTHER ARRAY INSTEAD
       x += lx * forwardBackwardSpeed;
       z += lz * forwardBackwardSpeed;
     } else {
       activeCell=activeCell;
     }
  }
  //backward
  if(keys[1] == true){
    console.log("keysB");

     console.log("BOTTOM WALL IS: "+grid[activeCell].bottomWall);
     // if (grid[activeCell].bottomWall == 0) {
     //   activeCell-=5;

     if(abs(px - x)>100){
       activeCell -= 1;
       px = x;
     }

     if (amTurned == true) {
       x -= lx * forwardBackwardSpeed;
       z -= lz * forwardBackwardSpeed;
     } else {
       activeCell=activeCell;
     }
  }

  //right
  if (keys[2]==true){
      leftRightAngle += leftRightRotSpeed;

      lx = sin(radians(leftRightAngle));
      lz = -cos(radians(leftRightAngle));

      console.log("keysR");
      //console.log("RIGHT WALL IS: "+grid[activeCell].rightWall);
      console.log("currentGridCellWalls: "+currentGridCellWalls);
      console.log(leftRightAngle);

    if ((leftRightAngle > testLeftRightAngle + range)){
        console.log("testANGLE: "+testLeftRightAngle);
        amTurned = true;
        console.log("Am I TURNED??? "+amTurned);
       testLeftRightAngle=leftRightAngle;
       //lastDirection = 2;
    }



    // if ((leftRightAngle > 32.0)&&(leftRightAngle < 45.0)) {
    //   console.log("COME THRUUUU RIGHT "+grid[activeCell].rightWall);
    //   amTurned = true;
    //   console.log("AM I TURNED?::: "+amTurned);
    // }


      //
      // if (grid[activeCell].rightWall == 0) {
      //   //activeCell++;
      //  } else {
      // //   activeCell=activeCell;
      // }

    } //end right

    //left
    if (keys[3]==true){
      console.log("keysL");
      console.log("LEFT WALL IS: "+grid[activeCell].leftWall);
      console.log(leftRightAngle);
      leftRightAngle -= leftRightRotSpeed;
      lx = sin(radians(leftRightAngle));
      lz = -cos(radians(leftRightAngle));

      if ((leftRightAngle < -32.0)&&(leftRightAngle > -45.0)) {
        console.log("COME THRUUUU LEFT "+grid[activeCell].leftWall);
        amTurned = true;
      }


      // if (grid[activeCell].leftWall == 0) {
      //   //activeCell--;
      //
      // } else {
      //   // activeCell=activeCell;
      // }
      //
    }

} //end of DRAW

// window.setTimeout(updateActiveCell, 60000);
//
// function updateActiveCell() {
//
// }

// $(document).ready(function() {
//
// )};




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
