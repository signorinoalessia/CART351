//Reference: https://p5js.org/reference/
// Reference: https://github.com/processing/p5.js/wiki/Positioning-your-canvas
// Reference: https://www.youtube.com/watch?v=BW3D9WwalQE&index=5&list=PLRqwX-V7Uu6bPhi8sS1hHJ77n3zRO9FR_

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

function preload() {

}

/*** SETUP ***/
function setup(){
  let canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT,WEBGL);

  canvas.parent('walkthroughContainer');

  let x = Math.floor((Math.random()*canvas.width));
  let y = Math.floor((Math.random()*canvas.height));
  let z = Math.floor((Math.random()*canvas.height));
  let rWidth = 50;
  let rHeight = 50;
  let rDepth = Math.floor((Math.random()*canvas.width/10)+10);

  // room1 = new Room(x,y,rWidth,rHeight,rDepth);
  //dims divided by 2 to set origin point to top let corner instead of center (WebGL)
  room1 = new Room(width/2,height/2,0,50,50,50);
  room2 = new Room((width/2)+50,height/2,0,50,50,50);
  room3 = new Room(width/2,(height/2)+10,0,50,50,50);

  /* GENERATE ROOMS */
  // generate rooms with these parameters (push into array)
  // for(let i=0; i<NUM_ROOMS; i++){
    // roomList.push(new Room(x,y,rWidth,rHeight,rDepth));
    // CustomShape(x,y,w,h,r,g,b,a,speedX,speedY,eid)
    //roomList.push(new Room(i*60+100,canvas.height/2,50,50,50);
    //roomList.push(new Room((i%5)+1,canvas.height/2,50,50,50));
    // roomList.push(new Room(i+1),0,10,10,10);
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
    // let dx = mouseX = width/2;
    // let dy - mouseY -height/2;

  translate(-width/2,-height/2);
  ambientLight(255);
  // directionalLight(255,255,0,1,0,0); //rgb,xyz
  background(175);

  ambientMaterial(250,150,0);
  // translate(0,0,mouseX);

  //let camX = map(mouseX,0,width,-200,0);

  //camera(0,mouseY,(height/2) / tan(PI/6),0,0,0,0,0,1);
  //camera(camX,0,(height/2)/tan(PI/6),0,0,0,1,0,0);
  camera(mouseX, height/2, (height/2) / tan(PI/6), width/2, height/2, 0, 0, 1, 0);
  //camera(mouseX, height/2, (height/2) / tan(PI/6), mouseX, height/2, 0, 0, 1, 0);

   // translate(width/2, height/2, -100);

  room1.display();
  room2.display();
  room3.display();
  //roomList.display();



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
