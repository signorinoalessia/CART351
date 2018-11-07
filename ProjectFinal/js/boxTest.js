function setup() {
  let canvas = createCanvas(100, 100, WEBGL);
  canvas.parent('boxTestContainer');
}

function draw() {
  background(200);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(50);
}
