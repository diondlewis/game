var click1 = new Audio();
if (click1.canPlayType('audio/mpeg;')) {
    click1.src = 'sounds/click1.mp3';
} else if (click1.canPlayType('audio/ogg;')) {
    click1.src = 'sounds/click1.ogg';
} else {
    click1.src = 'sounds/click1.wav';
}

var bugSound = new Audio();
if (bugSound.canPlayType('audio/mpeg;')) {
    bugSound.src = 'sounds/boink.mp3';
} else if (bugSound.canPlayType('audio/ogg;')) {
    bugSound.src = 'sounds/boink.ogg';
} else {
    bugSound.src = 'sounds/boink.wav';
}

var loseSound = new Audio();
if (loseSound.canPlayType('audio/mpeg;')) {
    loseSound.src = 'sounds/moonlight.mp3';
}


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = 60;
    this.speed = 10;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 10;
    this.height = 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x < 450) { // This if statement checks the condition of whether the bugs are off the screen or not.
   		this.x += 3 + this.speed * dt;
   	}
   		else { // this else statement resets the bugs to their original position once they go off the screen and gives them a random speed.
   			this.x = -100;
   			this.speed = getRandomIntInclusive();
   		}
   	// You have to use x instead of y, because the movement of
   	// enemy is horizontally and not vertically.
   	this.checkCollision(player);//This calls check collision function to apply to each instance of the bugs.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this function checks if bugs collide with the player
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        player.reset(); // if bugs collide with player, the player will reset to the original position.
        $('#lose').modal()
        bugSound.play();
        //loseSound.play();
    }
};

// Now write your own player class
var Player = function(x, y, width, height) {
    this.x = 200; // starts the player in the middle,
    this.y = 400; // in the grass at the bottom
    this.sprite = 'images/char-boy.png';
	this.width = 10;
	this.height = 10;
// This function resets player to starting position.
	Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
  };

};

// This class requires an update(),  and
Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
	if (this.y < 0) { // this statement checks to see if the player has reached the water
    $('#win').modal()
		this.reset(); // then resets the player, after he reaches the water. I plan add more to this later
	}
};

// render()
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(allowedKeys) {
// These if statements determine how far in each direction the player will move around the board and stops the player before he goes off the canvas
	if (allowedKeys === 'left' && this.x > 0) {
		this.x = this.x - 100;

	}
	if (allowedKeys === 'right' && this.x < 400) {
		this.x = this.x + 100;
	}
	if (allowedKeys === 'up' && this.y > 40) {
		this.y = this.y - 82;
	}
	if (allowedKeys === 'down' && this.y < 400) {
		this.y = this.y + 82;
	}
};

// This function is just so that something will happen when the player reaches the water, it resets the player to the starting position.
// Player.prototype.gameWin = function() {
	// if (this.y < 100) {
		// this.reset();

	// }
// };

// This function provides a random number that I'm using to vary the speed of the bugs.
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (300 - 1 + 1)) + 1;
}

// Now instantiate your objects.
var bug1 = new Enemy();
bug1.speed = getRandomIntInclusive();

var bug2 = new Enemy();
bug2.y = 150;
bug2.speed = getRandomIntInclusive();


var bug3 = new Enemy();
bug3.y = 225;
bug3.speed = getRandomIntInclusive();

// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    click1.play();
});