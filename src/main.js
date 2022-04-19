//# Jocque Jefferson,Rocket-Patrol-Mods, 4/18/2022, 72 Hours to complete

//-Implement a simultaneous two-player mode (30);

//-Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20);

//-Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)-(I only did new artwork for the Spaceship and Rockets, did not have time to do explosion), Give me credit?; 

//-Display the time remaining (in seconds) on the screen (10);

//-Create a new title screen (e.g., new artwork, typography, layout) (10);

//-Allow the player to control the Rocket after it's fired (5);

//-Create a new scrolling tile sprite for the background (5);
//-Implement the speed increase that happens after 30 seconds in the original game (5);
//-Track a high score that persists across scenes and display it in the UI (5);
//Total:(100) Points

//Cited Code
//Phaser Tutorials, April 2020-July 2021, Javascript, http://phaser.io/news/category/tutorial

let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, MenuMulti, Play ]
}

let game = new Phaser.Game(config);
game.settings = {
  spaceshipSpeed: 3,
  gameTimer: 60000,
  multiplay: 0
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyE, keyA, keyD, keyUP, keyDOWN;