# Space-Invaders II: "Descent of the Polygons"
##  - A Game By Andy Loh -


 ### Links
 - https://wireframe.cc/h1ye9w
 - https://trello.com/b/PnU0AWS5/space-invaders
 - *Note* Trello Board contains User Stories as Well.


 ### The game you chose.
     My game is a remake of the original Space Invaders Game from 1978.

 ### The rules of the game.
     The Polyspheres have arrived on Earth and are trying to invade! You are the sole fighter pilot that can fly the Rectanger, the most complex fighter jet known to all of mankind. Using the left and right arrow keys to move and the spacebar to shoot, destroy the approaching RED Polyspheres to save the planet. Be careful not to shoot the Green Polyspheres since they have human prisoners onboard! Note that the Polyspheres won't go down without a fight; be wary of the bombs they drop since getting bombed 3 times will result in the game ending. Good Luck!

 ### Your process for turning that game into a web application (wireframes, blockers/issues that popped up).
     - 1) Creating a Wireframe for the look of the game as well as my trello board for organizational purposes.
     - 2) Creating a p5 canvas and making a ship.js object that has a move method allowing it to move horizontally across the canvas.
     - 3) Creating a rocket.js object that can display on the screen as well as 'shoot' (shows the rockets moving up the screen)
     - 4) Creating an alien.js object that can move and shift down and then initializing a display of an array of such aliens to the canvas.
     - 5) Creating a bomb.js object that can display on the canvas as well as a method for falling from aliens.
     - 6) Writing the game logic for collision detection so that aliens can disappear when hit by rockets and so the ship can lose lives when hit by bombs.
     - 7) Creating different game states. Specifically the welcome page and the end game display. Hooking up the game logic to transition from one state to another. This included adding a reset button to change states.
     - 8) Creating functionality to keep track of a user's score and lives when in the play state.
     - 9) Creating functionality for displaying a running highscore list as well as the option to add your highscore given it is high enough.
     - 10) Adding styling to make the game look the way I like.
     - 11) Adding icebox features such as sounds effects, friendly aliens, a button for slowing the framerate, and having text blink red when you lose a life.

 ### Technologies used
     - HTML, CSS, JS, jQuery, p5.js Library (p5.dom, p5.sound, p5.collide2d)

 ### Your process/approach.
     I used an object oriented approach to organize the construction of this project. Every javascript file in the JS folder besides sketch.js is a separate object prototype (ship.js, aliens.js, bomb.js, and rocket.js). In sketch.js I intantiate the objects from the prototype templates and use them with p5 library methods to display a canvas where the objects can interact. p5.js allows the user to easily display graphics and animations using the canvas as well as using the built-in setup and draw functions. After writing all the game logic to make the objects on the canvas interact, the next step was to write the code to allow for different game states as well as the logic for moving from one state to another (welcome page, play state, game over state, etc...). The last major step was allowing the user to record their highscores given that they scored well enough when playing the game. After this I focused on implementing extra features to improve the look and feel of the game.

 ### Future features
     - Persistent Storage/Local Storage for highscores
     - Explosion animations using the p5 animation library
     - Timer to record game play time

 ### Any bugs
     I was not able to make game responsive due to the use of absolute positioning for the canvas object used with the p5.js library.

 ### Your biggest wins and challenges.
     - Biggest Challenges: Logic for transitioning between game states as well as updating the highscore list using local storage/persistant memory.
     - Biggest Wins: Organization of the code into different js files (object prototypes) and functions despite the large code base.
