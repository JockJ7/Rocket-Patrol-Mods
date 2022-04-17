/*
Thomas Applewhite
All work is my own or provided from the tutorial
---Point Breakdown---
S-Tier:
    simultaneous two-player mode: 50 points
Intermediate Tier:
    new timing/scoring mechanism that adds time to the clock for successful hits: 25 points
Novice Tier:
    display the time remaining (in seconds) on the screen: 15 points
Starting Tier:
    speed increase that happens after 30 seconds in the original game: 10 points
    allow the player to control the Rocket after it's fired: 10 points
Final Score: 110/100
I know I can't go over 100 but I forgot the timer was on the list so I went over by accident
*/


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
let keyF, keyLEFT, keyRIGHT, keyS, keyN, keyM, keyUP, keyDOWN;