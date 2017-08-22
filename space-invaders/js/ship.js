function Ship() {
  this.x = width / 2;
  this.xdir = 0;

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height - 22, 60, 20);
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
