function Ship() {
  this.x = width / 2;
  this.y = height - 22;
  this.xdir = 0;
  //this.lives = 5;

  this.show = function() {
    fill(138, 31, 244);
    rectMode(CENTER);
    rect(this.x, this.y, 60, 20);
  }

  this.move = function() {
    if (this.x >= 0) {
      this.x = ((this.x + (this.xdir * 3)) % 600);
    } else {
      this.x = 600;
    }
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }
}
