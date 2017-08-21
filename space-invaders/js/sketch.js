var ship;
var aliens = [];
var rocketsArray = [];
var heightArray = [35, 95, 155];
var score = 0;

function setup() {
  var playButton = createButton("pause").parent('buttons');
  var resetButton = createButton("reset").parent('buttons');
  var highScoreButton = createButton("highscores").parent('buttons');
  var fastButton = createButton("2x Speed").parent('buttons');
  canvas = createCanvas(600, 600);
  // canvas.position(((1680 / 2) - 300), 175);
  canvas.class('canvas');
  canvas.parent('container');

  // Displays ship and aliens
  ship = new Ship();
  for (var h = 0; h < heightArray.length; h++) {
    for (var i = 0; i < 7; i++) {
      aliens[i] = new Alien(i * 80 + 60, heightArray[h]);
      //console.log(heightArray[h]);
    }
  }
}


function draw() {
  background(51);
  ship.show();
  ship.move();

  // Displays and fires any rockets in the rocket array
  // If alien is hit, call explode function
  for (var i = 0; i < rocketsArray.length; i++) {
    rocketsArray[i].show();
    rocketsArray[i].shoot();
    for (var j = 0; j < aliens.length; j++) {
      if (rocketsArray[i].hits(aliens[j])) {
        aliens[j].explode();
        rocketsArray[i].boom();
        //console.log('BOOM');
      }
    }
  }

  // Checks to see if aliens have hit the edge, if so then move them down one row
  var hitEdge = false; //initially assume that none of the aliens have hit the right edge of the screen
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0) {
      //console.log(aliens[i].x);
      hitEdge = true;
    }
  }
  if (hitEdge) {
    for (var i = 0; i < aliens.length; i++) {
      aliens[i].shiftDown();
    }
  }

  for (var i = rocketsArray.length - 1; i >= 0; i--) {
    if (rocketsArray[i].flaggedForDelete) {
      rocketsArray.splice(i, 1)
    }
  }

  for (var i = aliens.length - 1; i >= 0; i--) {
    if (aliens[i].flaggedForDelete) {
      aliens.splice(i, 1)
    }
  }
}


// keyBinding for controls
function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var rocket = new Rocket(ship.x, height);
    rocketsArray.push(rocket);
  }
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
