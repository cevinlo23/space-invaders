var ship;
var alienRows = 5;
var alienColumns = 11;
var aliens = [];
var rocketsArray = [];
var bombsArray = [];
var highscoreObjectArray = [];
var score = 0;
var pauseCount = 0;
var frameCount = 0;
var gameHasStarted = false;
var updatedHighscore = false;
var lives = 3;
//var aliensImg = [];
var explosionSound;
var shipExplodesSound;

// initializing highscore object
for (t = 1; t <= 10; t++) {
  highscoreObjectArray.push({
    name: 'name',
    score: (550 - (t * 50))
  });
}

for (var p = 1; p < highscoreObjectArray.length + 1; p++) {
  window.localStorage.setItem(`highscore-${p}`, highscoreObjectArray[p - 1].score);
}

function preload() {
  explosionSound = loadSound('sounds/Input/Input-03.mp3');
  shipExplodesSound = loadSound('sounds/Alert/Alert-03.mp3')
}

// setup function will be called once at the start of the program
function setup() {
  var playButton = createButton("Pause/Play").parent('buttons');
  playButton.mousePressed(pause);
  var resetButton = createButton("Reset").parent('buttons');
  resetButton.mousePressed(welcomePage);
  var slowButton = createButton("1/2 Speed").parent('buttons');
  slowButton.mousePressed(slowFrameRate);
  var surrenderButton = createButton("Surrender").parent('buttons');
  surrenderButton.mousePressed(function() {
    var friendlySurvivorCount = 0;
    for (var i = 0; i < aliens.length; i++) {
      if (aliens[i].friendly === true) {
        friendlySurvivorCount += 1;
      }
    }
    var enemiesLeftCount = aliens.length - friendlySurvivorCount;
    endGame(friendlySurvivorCount, enemiesLeftCount);
  });

  canvas = createCanvas(600, 600);
  canvas.position(((1680 / 2) - 300), 111.18);
  canvas.class('canvas');
  canvas.parent('container');

  var scoreString = createP(`Score: ${score}`).class('score');
  scoreString.parent('main-score');
  scoreString.hide();

  var livesString = createP(`Lives: ${lives}`).class('lives');
  livesString.parent('lives');
  livesString.hide();

  welcomePage();
  resetSketch();
}


// draw function will continously loop as long as the program is running
function draw() {
  background(51);
  ship.show();
  ship.move();

  // Displays and fires any rockets in the rocket array
  for (var i = 0; i < rocketsArray.length; i++) {
    rocketsArray[i].show();
    rocketsArray[i].shoot();
    for (var j = 0; j < aliens.length; j++) {
      if (rocketsArray[i].hits(aliens[j])) {
        aliens[j].explode(); // If alien is hit, call explode function
        rocketsArray[i].boom();
        explosionSound.play();
        score += aliens[j].points;
        updateScore(score);

        // makes score flash red if a friendly Alien is hit
        if (aliens[j].friendly === true) {
          $('#main-score').addClass('flash-red');
          setTimeout(function() {
            $('#main-score').removeClass('flash-red');
          }, 200);
        }
      }
    }
  }

  // If bombs hit ship, then decrement lives and check if game is over.
  for (var i = 0; i < bombsArray.length; i++) {
    bombsArray[i].show();
    bombsArray[i].dropBomb();
    if (bombsArray[i].hits(ship)) {
      bombsArray[i].boom();
      shipExplodesSound.play();
      lives = lives - 1;
      updateLives(lives);

      $('#lives').addClass('flash-red');
      setTimeout(function() {
        $('#lives').removeClass('flash-red');
      }, 250);

      if (lives <= 0) {
        var friendlySurvivorCount = 0;
        for (var i = 0; i < aliens.length; i++) {
          if (aliens[i].friendly === true) {
            friendlySurvivorCount += 1;
          }
        }
        var enemiesLeftCount = aliens.length - friendlySurvivorCount;
        endGame(friendlySurvivorCount, enemiesLeftCount);
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
    if (aliens[i].y >= height - 40) {
      hitBottom = true; // Hit the bottom, Game Over!!
    }
  }

  // If no enemy Aliens are left, end the game early
  var enemyCount = 0;
  for (var i = 0; i < aliens.length; i++) {
    if (aliens[i].friendly === false) {
      enemyCount += 1;
    }
  }

  if (enemyCount === 0) {
    hitBottom = true;
  }

  // if Aliens reach the bottom, then end the game.
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

  // if Aliens hit the side edge, then have them all move down.
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

  //  Find all of the front rank invaders.
  var frontRowAliens = [];
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.row = (Math.floor(i / 11)) + 1;
    alien.column = (i % 11) + 1;

    if (!frontRowAliens[alien.column] || frontRowAliens[alien.column].row < alien.row) {
      frontRowAliens[alien.column] = alien;
    }
  }

  //  Give each front rank invader a chance to drop a bomb.
  for (var i = 0; i < alienColumns; i++) {
    var alien = frontRowAliens[i];
    if (!alien) continue;
    if (alien.bombRate > Math.random()) {
      //  Fire!
      bombsArray.push(new Bomb(alien.x, alien.y + alien.radius));
    }
  }

  // Clears bombs that have hit the ship or gone off screen
  for (var i = bombsArray.length - 1; i >= 0; i--) {
    if (bombsArray[i].flaggedForDelete) {
      bombsArray.splice(i, 1);
    } else if (bombsArray[i].y >= height) {
      bombsArray.splice(i, 1);
    }
  }
}


function welcomePage() {
  noLoop();
  gameHasStarted = false;
  score = 0;
  lives = 3;
  rocketsArray = [];
  bombsArray = [];
  updateScore(score);
  updateLives(lives);
  $('#string-container').hide();
  $('#score').hide();
  $('.highscore').hide();
  welcomeDiv = createElement('div');
  welcomeDiv.class('welcome').size(600, 600);

  var p0 = createP('Welcome to Space-Invaders II').class('firstP').style('font-size', '20px').parent(welcomeDiv);
  var break0 = createElement('br').parent(welcomeDiv);
  var p1 = createP(`  Manuver your Ship and Destroy the Descending Invaders.
       Shoot the <span class='red'>Red</span> Polyspheres but Avoid Shooting the Friendly <span class='green'>Green</span> Polyspheres  `).parent(welcomeDiv);
  for (var i = 0; i < 3; i++) {
    createElement('br').parent(welcomeDiv);
  }
  var p2 = createP(`&ensp;<-  ->  &emsp;Move`).parent(welcomeDiv);
  var p3 = createP('SPACEBAR    Shoot').parent(welcomeDiv);
  for (var i = 0; i < 7; i++) {
    createElement('br').parent(welcomeDiv);
  }
  var p4 = createP("  Press ENTER to Play  ").class('blink').parent(welcomeDiv);
  welcomeDiv.position(540, 111.18);
  welcomeDiv.style('background-color', 'black').style('color', 'white');
}


function endGame(friendlySurvivorCount, enemiesLeftCount) {
  noLoop();
  updatedHighscore = false;
  var enemiesDestroyed = 55 - enemiesLeftCount - friendlySurvivorCount;
  var bonus = (friendlySurvivorCount * 150) - (25 * enemiesLeftCount);
  var finalScore = score + bonus;

  $('#score').empty();
  $('#score').show();
  showHighscoreList(finalScore);

  // Display Score and Game Statistics When Game is Over
  var bonusPoints = createP('****************** BONUS POINTS ******************').parent('score');
  var survivorPoints = createP(` -- Number of Survivors Saved: &emsp;&emsp;&emsp;${friendlySurvivorCount} x &ensp;150 = ${friendlySurvivorCount * 150}`).parent('score');
  var enemyPoints = createP(` -- Number of Enemies Left Alive: ${enemiesLeftCount} x -25 = ${enemiesLeftCount * -25}`).parent('score');
  var p = createP(`**************************************************`).parent('score');
  var finalPoints = createP(`Final Score: ${finalScore}`).class('final').parent('score');
}


function showHighscoreList(finalScore = 0) {
  highscoreDiv = createElement('div');
  highscoreDiv.class('highscore').size(600, 600);
  var title = createElement('h2', 'HIGHSCORES').class('highscore-header').parent(highscoreDiv);
  var break0 = createElement('br').parent(highscoreDiv);
  emptyDiv = createDiv(' ').class('empty').size(600, 300).parent(highscoreDiv);

  displayHighscoreList();

  var break1 = createElement('br').parent(highscoreDiv);
  var buttonDiv = createDiv('').class('btn-div').parent(highscoreDiv);

  if (finalScore > highscoreObjectArray[highscoreObjectArray.length - 1].score) {
    var addHighscoreButton = createButton('ADD YOUR HIGHSCORE').class('highscore-btn').parent(buttonDiv);
    addHighscoreButton.mousePressed(function() {
      addHighscore(finalScore)
    });
  }
  var playAgainButton = createButton('PLAY AGAIN').class('highscore-btn').parent(buttonDiv);
  playAgainButton.mousePressed(welcomePage);
  highscoreDiv.position(540, 111.18);
}


// function to create input tag to add highscore
function addHighscore(finalScore) {
  $('.form-div').empty();
  var formDiv = createDiv('Please Type Your Name').class('form-div').parent(highscoreDiv);
  var break0 = createElement('br').parent(formDiv);
  var nameInput = createInput().parent(formDiv);
  var nameButton = createButton('submit').parent(formDiv);
  nameButton.mousePressed(function() {
    updateHighscoreList(nameInput.value(), finalScore);
  })
}


// function to iterate through highscore object and updates it
function updateHighscoreList(username, finalScore) {
  if (updatedHighscore === false) {
    updatedHighscore = true;
    var i = 0;
    while (i < highscoreObjectArray.length && highscoreObjectArray[i].score > finalScore) {
      i++;
    }
    if (i < highscoreObjectArray.length) {
      //found a place to insert the score
      for (var j = highscoreObjectArray.length - 1; j > i; j--) {
        highscoreObjectArray[j].score = highscoreObjectArray[j - 1].score;
        highscoreObjectArray[j].name = highscoreObjectArray[j - 1].name;
      }
      highscoreObjectArray[i].score = finalScore;
      highscoreObjectArray[i].name = username;
    }
    displayHighscoreList();
  }
}


function displayHighscoreList() {
  $('.empty').empty();
  var highscoreList = createElement('ol').class('list').parent(emptyDiv);
  for (var i = 0; i < highscoreObjectArray.length; i++) {
    //create p tags and append to highscore
    createP(`${i + 1}. &emsp;${highscoreObjectArray[i].name}&emsp;${highscoreObjectArray[i].score}`).class('highscore-list-item').parent(highscoreList);
  }
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
  // Adding random friendly Aliens
  for (var i = 0; i < 9; i++) {
    var random = Math.floor((Math.random() * 55));
    aliens[random].friendlyAlien();
  }
}


function updateScore(score) {
  $('.score').html(`Score: ${score}`);
}


function updateLives(lives) {
  var livesStringFormatted = '';
  for (var k = 0; k < lives; k++) {
    livesStringFormatted += " * ";
  }
  $('.lives').html(`Lives: ${lives} ${livesStringFormatted}`);
}


function slowFrameRate() {
  if (frameCount % 2 === 0) {
    frameRate(30);
    frameCount += 1;
  } else {
    frameRate(60);
    frameCount += 1;
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
      $('#string-container').show();
      $('.score').show();
      $('.lives').show();
      resetSketch();
      loop();
    } else {
      console.log("Game has Already Started!");
    }
  }
}

function mousePressed() {}
