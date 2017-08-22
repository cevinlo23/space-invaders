var ship;
var alienRows = 5;
var alienColumns = 11;
var aliens = [];
var rocketsArray = [];
var score = 0;
var pauseCount = 0;
var gameHasStarted = false;


function setup() {
  var playButton = createButton("pause/play").parent('buttons');
  playButton.mousePressed(pause);
  var resetButton = createButton("reset").parent('buttons');
  resetButton.mousePressed(welcomePage);
  var fastButton = createButton("2x Speed").parent('buttons');
  fastButton.mousePressed(fastForward);
  var highScoreButton = createButton("highscores").parent('buttons');
  highScoreButton.mousePressed(endGame);

  // var scoresDiv = createElement('aside', 'View Your Score:');
  // scoresDiv.class('aside scores');
  // scoresDiv.parent('container');
  // scoresDiv.hide();

  canvas = createCanvas(600, 600);
  canvas.position(((1680 / 2) - 300), 111.18);
  canvas.class('canvas');
  canvas.parent('container');

  // var highscoresDiv = createElement('aside', 'Highscores:');
  // highscoresDiv.class('aside highscore-list');
  // highscoresDiv.parent('container');
  // highscoresDiv.hide();

  var scoreString = createP(`Score: ${score}`).class('score');
  scoreString.parent('score');
  scoreString.hide();

  //clear();

  welcomePage();
  resetSketch();
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
        updateScore(score);
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

  // if (aliens.length === 0) {
  //   hitBottom = true;
  // }

  var enemyCount = 0;
  for (var i = 0; i < aliens.length; i++) {
    if (aliens[i].friendly === false) {
      enemyCount += 1;
    }
  }
  if (enemyCount === 0) {
    hitBottom = true;
  }

  if (hitBottom) {
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
      rocketsArray.splice(i, 1);
    } else if (rocketsArray[i].y <= 0) {
      rocketsArray.splice(i, 1);
    }
  }

  for (var i = aliens.length - 1; i >= 0; i--) {
    if (aliens[i].flaggedForDelete) {
      aliens.splice(i, 1)
    }
  }
}

function welcomePage() {
  noLoop();
  gameHasStarted = false;
  $('.score').hide();
  welcomeDiv = createElement('div');
  welcomeDiv.class('welcome').size(600, 600);

  var p0 = createP('Welcome to Space-Invaders!').class('firstP').parent(welcomeDiv);
  var break0 = createElement('br').parent(welcomeDiv);
  var p1 = createP(`  Manuver your Ship and Destroy the Descending Invaders.
       Shoot the Red Invaders but Avoid Shooting the Friendly Green Aliens  `).parent(welcomeDiv);
  var break1 = createElement('br').parent(welcomeDiv);
  var p2 = createP(` <-  ->     Move`).parent(welcomeDiv);
  var p3 = createP('SPACEBAR    Shoot').parent(welcomeDiv);
  var break2 = createElement('br').parent(welcomeDiv);
  var break3 = createElement('br').parent(welcomeDiv);
  var p4 = createP("  Press ENTER to Play  ").class('blink').parent(welcomeDiv);
  welcomeDiv.position(540, 111.18);
  welcomeDiv.style('background-color', 'black').style('color', 'white');
}


function endGame(friendlySurvivorCount, enemiesLeftCount) {
  noLoop();
  var enemiesDestroyed = 55 - enemiesLeftCount;
  var bonus = (friendlySurvivorCount * 150) - (50 * enemiesLeftCount);
  var finalScore = score + bonus;
  console.log('Survivor Count: ', friendlySurvivorCount);
  console.log('Enemies Left: ', enemiesLeftCount);
  console.log('score: ', score, 'bonus: ', bonus, 'final score: ', finalScore);
  //$('.scores').show();
  //$('.highscore-list').show();


  //showHighscoreList();

  //Create View Score Div
  var bonusPoints = createP('****************** BONUS POINTS ******************').parent('score');
  var survivorPoints = createP(` -- Number of Survivors Saved: ${friendlySurvivorCount}`).parent('score');
  var enemyPoints = createP(` -- Number of Enemies Destroyed: ${enemiesDestroyed}`).parent('score');
  var p = createP(`**************************************************`).parent('score');
  var finalPoints = createP(`Final Score: ${finalScore}`).class('final').parent('score');

  //Create View Score Div
}


function pause() {
  if (pauseCount % 2 === 0) {
    noLoop();
    pauseCount += 1;
  } else {
    loop();
    pauseCount += 1;
  }
}


function resetSketch() {

  aliens = [];
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

function updateScore(score) {
  $('.score').html(`Score: ${score}`);
}

function fastForward() {
  frameRate(30);
  console.log(frameRate());
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
  if (keyCode === ENTER) {
    if (gameHasStarted === false) {
      $('div.welcome').hide();
      gameHasStarted = true;
      $('.score').show();
      resetSketch();
      loop();
    } else {
      console.log("Game has Already Started!");
    }
  }
}

function mousePressed() {}
