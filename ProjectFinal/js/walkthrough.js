//Reference: https://p5js.org/reference/
// Reference: https://github.com/processing/p5.js/wiki/Positioning-your-canvas

/* LINKING TO MAIN PROGRAM */
canvas = document.getElementById("walkthroughContainer");
//context = canvas.getContext("2d")

/*CANVAS VARIABLES */
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;

/*ROOM VARIABLES */
let roomList = [];
const NUM_ROOMS = 8;

let room1;

/*** SETUP ***/
function setup(){
  let canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT,WEBGL);

  canvas.parent('walkthroughContainer');

  let x = Math.floor((Math.random()*canvas.width));
  let y = Math.floor((Math.random()*canvas.height));
  let rWidth = 50;
  let rHeight = 50;
  let rDepth = Math.floor((Math.random()*canvas.width/10)+10);

  // room1 = new Room(x,y,rWidth,rHeight,rDepth);
  room1 = new Room(width/2,height/2,50,50,50);

  /* GENERATE ROOMS */
  // generate rooms with these parameters (push into array)
  // for(let i=0; i<NUM_ROOMS; i++){
  //   roomList.push(new Room(x,y,rWidth,rHeight,rDepth));
  // }

  /* CANVAS POSITION */
  // let cX = (windowWidth - width) / 2;
  // let cY = (windowHeight - height) / 2;
  // canvas.position(cX,xY);

  /* CAMERA*/
  // // camera's field of view and depth
  // let fov = 60/180*PI;
  // let cameraZ = CANVAS_HEIGHT/2.0/tan(fov/2.0);
  // // perspective(frustum [fovy], [aspect], [near plane], [far plane])
  // perspective(60/180*PI, CANVAS_WIDTH/CANVAS_HEIGHT, cameraZ*0.1, cameraZ*10)

}

/*** RENDER ***/
function draw(){
  translate(-width/2,-height/2);
  background(255,0,200);
  room1.display();

  // for (let i=0;i<NUM_ROOMS;i++){
  //   roomList[i].display();
  // }

  // Orbit control allows the camera to orbit around a target.
  // orbitControl();

}

/* EVENT LISTENER */
// canvas.addEventListener("mousemove", function(event){
//   // if moving beyond threshold distance
//     // "walk"
// });
