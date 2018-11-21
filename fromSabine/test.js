let room;
//let moveZ =100;
//let moveX;
let x,y,z,lx,ly,lz;
let forwardBackwardSpeed=2;
let keys = [false,false,false,false];

// angle and speed of left/right rotation for the camera direction
let leftRightRotSpeed =.5;
let leftRightAngle=0.0;
let rooms = [];
let maxRooms = 5;
let grid = [];


function setup() {
  // for(let x=0; x<10; x++){
  //   for(let y=0; y<10;y++){
  //     grid.push(new Cell(x*20,y*20,20));
  //
  //   }
  // }
  // put setup code here
  createCanvas(windowWidth,windowHeight,WEBGL);
  // actual vector representing the camera's direction
 lx=0.0;
 ly =0.0;
 lz=-1.0;

//position of the camera
x=0.0;
y =0.0;
z=-100.0;



  moveX = width/2;
  background(0);
  rooms.push (new Room(0,0,-1000,500,500,color(255,0,0)));
  rooms.push (new Room(500,0,-1000,500,500,color(0,0,255)));
  rooms.push (new Room(-500,0,-1000,500,500,color(0,255,0)));
}

function draw() {
  //translate(width/2)
background(0);

//x,y,z,centerx,centery,centerz,upX,up,y.upZ
//camera( moveX,height/2, moveZ, width/2, height/2, 0, 0, 1, 0);
camera(x, y, z, //The first three values indicate the camera position
   x+lx, y+ly, z+lz, //The second set of values defines the point we’re looking at (any point in our line of sight)
   0.0, 1.0, 0.0); // The third set of values is the vector telling us which way is pointing up

//translate(-width/2,-height/2);
for(let i=0; i<rooms.length;i++){
  rooms[i].display();
}

/*push();
  rotateX(-PI/6);
for(let i=0; i<grid.length;i++){
//  console.log(i);
  grid[i].display();
}
pop();*/




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
//left
if (keys[2]==true)
  {
      console.log("testR");
    leftRightAngle -= leftRightRotSpeed;
    lx = sin(radians(leftRightAngle));
    lz = -cos(radians(leftRightAngle));
  //  y -= ly * forwardBackwardSpeed;
  //  x -= lx * forwardBackwardSpeed;
  }
  //right
  if (keys[3]==true)
  {
      console.log("testL");
    leftRightAngle += leftRightRotSpeed;
    lx = sin(radians(leftRightAngle));
    lz = -cos(radians(leftRightAngle));
  }

}

function keyPressed(){
  if(key =="f"){
    keys[0] = true;

  }
  if(key =="b"){
   keys[1] = true;
 }

 if(key =="r"){
   keys[2] = true;

 }
 if(key =="l"){
  keys[3] = true;
}
}

function keyReleased(){
  if(key =="f"){
    keys[0] = false;

  }

  if(key =="b"){
    keys[1] = false;

  }
  if(key =="r"){
    keys[2] = false;

  }
  if(key =="l"){
   keys[3] = false;
 }
  /*if(key =="l"){
  console.log("testL");
  moveX -=10;
}*/
}

function Cell(x,y,w){
  this.x =x;
  this.y = 0;
  this.z = y;
  this.w=w;
  this.display = function(){
    fill(255,0,0);
    push();
    translate(this.x,this.y,this.z);

    //rect(this.x,this.y,this.w,this.w);
    box(this.w)
    pop();
  }
}

function Room(x,y,z,w,h,c){
  this.x =x;
  this.y = y;
  this.z = z;
  this.w=w;
  this.h=h;
  this.color = c;
  //this.d = d;

  this.display = function(){
    push();
    translate(this.x,this.y,this.z);
    fill(this.color);
    box(this.w,this.h);
    pop();
  }

}
