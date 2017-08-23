function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 15;
  this.flaggedForDelete = false;
  this.xdir = 1;
  this.points = 25;
  this.friendly = false;
  this.color = '#ff00c8';
  this.bombRate = 0.02;
  this.image = '/Users/yjh296/Desktop/sandbox/unit-1-project/space-invaders/space-invaders/images/space-invaders-sprite1.jpg'


  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    // var img = loadImage(this.image);
    // image(img, this.x, this.y, 30, 30);
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

  //sets it so points will decrement if you shoot a friendly alien
  this.friendlyAlien = function() {
    this.friendly = true;
    this.points = -100;
    this.color = "#2be51d";

  }
}
