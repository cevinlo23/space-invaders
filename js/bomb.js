function Bomb(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.flaggedForDelete = false;
  this.velocity = 3;


  this.show = function() {
    fill(229, 6, 6);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
  }

  this.dropBomb = function() {
    this.y += this.velocity;
  }

  this.hits = function(ship) {
    if (this.x >= (ship.x - 30) && this.x <= (ship.x + 30) && this.y >= (ship.y - 10) && this.y <= (ship.y + 10)) {
      return true;
    } else {
      return false;
    }
  }

  this.boom = function() {
    this.flaggedForDelete = true;
  }
}
