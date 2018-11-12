//https://codepen.io/rzahniser/post/maze1
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
//https://natureofcode.com/book/chapter-1-vectors/
// https://evanw.github.io/lightgl.js/docs/vector.html

function Vector(x,y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(other) {
  return new Vector(this.x+other.x, this.y+other.y);
}

Vector.prototype.subtract = function(other) {
  return new Vector(this.x-other.x, this.y-other.y);
}

let a = new Vector(5,3);
let b = new Vector(2,5);
let c = a.add(b);

let LEFT = 0;
let UP = 1;
let RIGHT =2;
let DOWN = 3;

let DIRECTION = [
  new Vector(1,0), //LEFT
  new Vector(0,1), //UP
  new Vector(-1,0), //RIGHT
  new Vector(0,-1), //DOWN
];
