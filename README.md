# Space-Invaders II

https://wireframe.cc/h1ye9w
https://trello.com/b/PnU0AWS5/space-invaders
 -Trello Board contains User Stories as Well.


 ### Technologies used
     - HTML, CSS, JS, jQuery, p5.js Library (p5.dom, p5.sound, p5.collide2d)

 ### Your process/approach.
     - I used an object oriented approach to organize the construction of this project. Every javascript file in the JS folder besides sketch.js is a separate object prototype (ship.js, aliens.js, bomb.js, and rocket.js). In sketch.js I intantiate the objects from the prototype templates and use them with p5 library methods to display a canvas where the objects can interact. p5.js allows the user to easily display graphics and animations using the canvas as well as using the built-in setup and draw functions. After writing all the game logic to make the objects on the canvas interact, the next step was to write the code to allow for different game states as well as the logic for moving from one state to another (welcome page, play state, game over state, etc...). The last major step was allowing the user to record their highscores given that they scored well enough when playing the game.

 ### Future features
     - Timer
     - Persistent Storage/Local Storage
     - Alien Sprite images using p5.images
     - Explosion animations using the p5 animation library

 ### Any bugs
     - I was not able to make game responsive due to the use of absolute positioning for the canvas object used with the p5.js library.

 ### Your biggest wins and challenges.


 ### The game you chose.
     - My game is a remake of the original Space Invaders Game from 1978

 ### The rules of the game.
     - The Polyspheres have arrived at Earth and are trying to invade! You are the sole fighter pilot that can fly the Rectanger, the most complex fighter jet known to all of mankind. Using the left and right arrow keys to move and the spacebar to shoot, destroy the approaching RED Polyspheres to save the planet. Be careful not to shoot the Green Polyspheres since they have human prisoners onboard! Note that the Polyspheres won't go down without a fight; be wary of the bombs they drop since getting bombed 3 times will result in the game ending. Good Luck!

 ### Your process for turning that game into a web application (wireframes, blockers/issues that popped up).
