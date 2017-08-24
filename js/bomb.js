function Bomb(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.flaggedForDelete = false;
  this.velocity = 3;


  this.show = function() {
    //noStroke();
    fill(229, 6, 6);
    //line(this.x, this.y, this.x, this.y + 3);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
  }

  this.dropBomb = function() {
    this.y += this.velocity;
  }

  this.hits = function(ship) {
    // if (this.x + 30 > ship.x && this.x - 30 < ship.x) {
    //   var distance = dist(this.x, this.y, ship.x, ship.y);
    //   if (distance < this.radius + 10) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }

    if (this.x >= (ship.x - 30) && this.x <= (ship.x + 30) && this.y >= (ship.y - 10) && this.y <= (ship.y + 10)) {
      return true;
    } else {
      return false;
    }

    // hit = collideLineRect(this.x, this.y, this.x, this.y + 3, ship.x, ship.y, 60, 20);
    // console.log(hit);
    // return hit;
  }

  this.boom = function() {
    this.flaggedForDelete = true;
  }
}
