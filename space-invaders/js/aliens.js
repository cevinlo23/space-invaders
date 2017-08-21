function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 25;
  this.flaggedForDelete = false;

  this.xdir = 1;
  //this.ydir = 0;

  this.show = function() {
    noStroke();
    fill(255, 0, 200);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  this.explode = function() {
    this.radius = 0;
    this.flaggedForDelete = true;
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.radius;
  }
}
