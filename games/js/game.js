var then;
// Create the canvas
var canvas;
var ctx;

// Background image
var bgReady;
var bgImage;

/*bgImage.onload = function () {
  bgReady = true;
};*/


// Hero image
var heroReady;
var heroImage;
/*heroImage.onload = function () {
  heroReady = true;
};*/

// Monster image
var monsterReady;
var monsterImage
/*monsterImage.onload = function () {
  monsterReady = true;
};*/

// Game objects
var hero;
var monster;
var monstersCaught;

// Handle keyboard controls
var keysDown;

window.addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  // Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown && hero.y > 0) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y < canvas.offsetHeight) { 
  // Player holding down
    hero.y += Math.min(hero.speed * modifier,
                      canvas.offsetHeight-hero.y-30);
  }
  if (37 in keysDown && hero.x > 0) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x < canvas.offsetWidth) { // Player holding right
    hero.x += Math.min(hero.speed * modifier,
                      canvas.offsetWidth-hero.x-30);
  }

  // Are they touching?
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
  
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame 
                        || w.webkitRequestAnimationFrame 
                        || w.msRequestAnimationFrame 
                        || w.mozRequestAnimationFrame;
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

var init = function(){
  then = Date.now();
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  //canvas.width = 512;
  //canvas.height = 480;

  // Background image
  bgReady = false;
  bgImage = new Image();
  bgImage.onload = function () {
      bgReady = true;
  };
  bgImage.src = "images/background.png";
  // Hero image
  heroReady = false;
  heroImage = new Image();
  heroImage.onload = function () {
      heroReady = true;
  };
  heroImage.src = "images/hero.png";
  // Monster image
  monsterReady = false;
  monsterImage = new Image();
  monsterImage.onload = function () {
      monsterReady = true;
  };
  monsterImage.src = "images/monster.png";

  hero = {
  speed: 256 // movement in pixels per second
  };

  monster = {};
  monstersCaught = 0;

  // Handle keyboard controls
  keysDown = {};
  
  //position hero
  hero.x = canvas.offsetWidth / 2;
  hero.y = canvas.offsetHeight / 2;
};


// Let's play this game!
var onload = function(){
  init();
  reset();
  main();
};
