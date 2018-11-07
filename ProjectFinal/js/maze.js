//Reference: https://p5js.org/reference/
// Reference: https://github.com/processing/p5.js/wiki/Positioning-your-canvas

// let scene = document.getElementById("scene");
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;

function setup() {
  let myCanvas = createCanvas(800,600,WEBGL);
  // camera's field of view and depth
  let fov = 60/180*PI;
  let cameraZ = CANVAS_HEIGHT/2.0/tan(fov/2.0);
  // perspective(frustum [fovy], [aspect], [near plane], [far plane])
  perspective(60/180*PI, CANVAS_WIDTH/CANVAS_HEIGHT, cameraZ*0.1, cameraZ*10)

  // let x = (windowWidth - width) / 2;
  // let y = (windowHeight - height) / 2;
  // myCanvas.position(x,y);
  // myCanvas.parent('mazeContainer');
  // background(255,0,200);
}

function draw() {
  background(100);
  // Orbit control allows the camera to orbit around a target.
  orbitControl();
  // nested for loop for x and y coords (GRID OF BOXES)
  for (let i=-1;i<2;i++) {
    for (let j=-2;j<3;j++) {
      push();
      translate(i*160,0,j*160);
      box(40);
      pop();
    }
  }
  // will draw more boxes once "player" goes beyond a certain point (between near/far)
}
