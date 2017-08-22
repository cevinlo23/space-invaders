var ship;
var alienRows = 5;
var alienColumns = 11;
var aliens = [];
var rocketsArray = [];
var score = 0;
var friendlyAlienArray = [];

function setup() {
  var playButton = createButton("pause").parent('buttons');
  var resetButton = createButton("reset").parent('buttons');
  var fastButton = createButton("2x Speed").parent('buttons');
  var highScoreButton = createButton("highscores").parent('buttons');
  var scoresDiv = createElement('aside', 'View Your Score:');

  scoresDiv.class('aside scores');
  scoresDiv.parent('container');
  canvas = createCanvas(600, 600);
  // canvas.position(((1680 / 2) - 300), 175);
  canvas.class('canvas');
  canvas.parent('container');
  var highscoresDiv = createElement('aside', 'Highscores:');
  highscoresDiv.class('aside highscore-list');
  highscoresDiv.parent('container');

  // Displays ship and aliens
  ship = new Ship();
  for (var row = 0; row < alienRows; row++) {
    for (var column = 0; column < alienColumns; column++) {
      if (row % 2 === 0) {
        aliens.push(new Alien((width / 2) + ((alienColumns / 2 - column) * 550 / alienColumns), (0 + row * 30)));
      } else {
        aliens.push(new Alien(((width / 2) + ((alienColumns / 2 - column) * 550 / alienColumns) + 25), (0 + row * 30)));
      }
    }
  }
  for (var i = 0; i < 9; i++) {
    var random = Math.floor((Math.random() * 55));
    aliens[random].friendlyAlien();
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
        //console.log(aliens);
        score += aliens[j].points;
        console.log(score);
      }
    }
  }

  // Checks to see if aliens have hit the edge, if so then move them down one row
  var hitEdge = false; //initially assume that none of the aliens have hit the right edge of the screen
  var hitBottom = false; //initially no aliens touching the bottom
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0) {
      hitEdge = true;
    }
    if (aliens[i].y >= height - 25) {
      hitBottom = true; // Hit the bottom, Game Over!!
    }
  }

  if (aliens.length === 0) {
    hitBottom = true;
  }

  if (hitBottom) {
    console.log(aliens.length);
    var friendlySurvivorCount = 0;
    for (var i = 0; i < aliens.length; i++) {
      if (aliens[i].friendly === true) {
        friendlySurvivorCount += 1;
      }
    }
    var enemiesLeftCount = aliens.length - friendlySurvivorCount;
    endGame(friendlySurvivorCount, enemiesLeftCount);
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

function endGame(friendlySurvivorCount, enemiesLeftCount) {
  noLoop();
  var bonus = (friendlySurvivorCount * 150) - (50 * enemiesLeftCount);
  var finalScore = score + bonus;
  console.log('Survivor Count: ', friendlySurvivorCount);
  console.log('Enemies Left: ', enemiesLeftCount);
  console.log('score: ', score, 'bonus: ', bonus, 'final score: ', finalScore);
  alert(`Game Over!
     Points Scored = ${score}pts
     *Bonus*       = (Friendly Survivors x 150pts) - (Enemies Left x 50pts)
     Final Score   = ${finalScore}pts
    `);
}

// keyBinding for controls
function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var rocket = new Rocket(ship.x, height - 22);
    rocketsArray.push(rocket);
  }
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
