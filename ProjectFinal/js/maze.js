//Reference for maze: https://codepen.io/rzahniser/post/maze1
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
//https://natureofcode.com/book/chapter-1-vectors/
// https://evanw.github.io/lightgl.js/docs/vector.html

/*VECTOR CLASS */
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

/* WALLS AND CELLS */
function Wall(start,direction){
  this.start = start;
  this.direction = direction;
}

function Cell(x,y){
  this.walls = [
    new Wall(new Vector(x+1,y),UP),
    new Wall(new Vector(x+1,y+1),RIGHT),
    new Wall(new Vector(x,y+1),DOWN),
    new Wall(new Vector(x,y),LEFT),
  ];
}

/* RENDER WALLS AND CELLS */
Wall.prototype.draw = function(g) {
  let end = this.start.plus(DIRECTION[this,direction]);
  g.beginPath();
  g.moveTo(this.start.x,this.start.y);
  g.lineTo(end.x,end.y);
  g.stroke();
}

Cell.prototype.draw = function(g) {
  for(let i=0;i<this.walls.length;i++) {
    this.walls[i].draw(g);
  }
}

/* GENERATE GRID OF CELLS */
function generateMaze(width,height) {
  let cells = new Array(width);
  for (let x=0;x<width;x++) {
    cells[x] = new Array(height);
    for (let y=0;y<height;y++) {
      cells[x][y] = new Cell(x,y);
    }
  }
  return cells;
}

/* Make the make 10 by 10 */
let cells = generateMaze(10,10);
