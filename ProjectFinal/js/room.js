// https://gamedevelopment.tutsplus.com/tutorials/create-a-procedurally-generated-dungeon-cave-system--gamedev-10099

// in p5:
// translate(i*160,0,j*160);


/*ROOM OBJECT */
function Room (x,y,rWidth,rHeight,rDepth) {
// function Room () {
  /* grid coords and dimensions */
  this.x = x;
  this.y = y;
  this.rWidth = rWidth;
  this.rHeight = rHeight;
  this.rDepth = rDepth;
  // this.isColliding = false;

  this.display = function(){
    // box(this.x,this.y,this.rWidth,this.rHeight,this.rDepth);
    push();
    translate(this.x,this.y);
    box(this.rWidth,this.rHeight,this.rDepth);
    pop();
  }

  // -push- saves original origin point
  // this.display = function(){
  //   push();
  //   box(this.x,this.y,this.rWidth,this.rHeight,this.rDepth);
  //   translate(50,0);
  //   pop();
  // }


}
