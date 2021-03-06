class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload(){
      //load images/title sprites
      this.load.image('rocket', './assets/Blue_Rocket.png');
      this.load.image('rocketBlue', './assets/Blue_Rocket.png');
      this.load.image('rocketGreen', './assets/Green_Rocket.png');
      this.load.image('spaceship', './assets/New_Spaceship.png');
      this.load.image('starfield', './assets/New_Starfield.png');
      this.load.image('fastship', './assets/New_Fastship.png');
      
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64,
      frameHeight: 32, startFrame: 0, endFrame: 9});
      
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
      
    // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
      
      // white borders
      this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
      
      // green UI background
      this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);
      
      //define keys for P1
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      
      // define keys for P2
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      
      //add rockets
      if(game.settings.multiplay == 1){
          
          game.settings.multiplay = 0;
          this.p1Rocket = new Rocket(this, game.config.width/4, 431, 'rocketGreen').setScale(0.5, 0.5).setOrigin(0, 0);
          game.settings.multiplay = 1;
          this.p2Rocket = new Rocket(this, (3*game.config.width)/4, 431, 'rocketBlue').setScale(0.5, 0.5).setOrigin(0, 0);
      }else{
          this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
      }
      //add spaceships (x3) + fastship
      this.ship01 = new Spaceship(this, game.config.width + 192, 196, 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width + 96, 260, 'spaceship', 0, 20).setOrigin(0, 0);
      this.ship03 = new Spaceship(this, game.config.width, 324, 'spaceship', 0, 10).setOrigin(0, 0);
      this.fast1 = new Spaceship(this, game.config.width + 288, 132, "fastship", 0, 50).setOrigin(0, 0);
      // Had to change it up because it was eaiser to change the x,y for the ships from here

      // animation config
      this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
          frameRate: 30
      });
      
      // initialize score
      this.p1Score = 0;
      this.p2Score = 0;
      
      // display score
      this.scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bototm: 5,
          },
          fixedWidth: 100
      }
      if(game.settings.multiplay == 0){
          this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
      }else{ 
          
          this.scoreConfig.backgroundColor = '#FF4466';
          this.scoreConfig.color = '#FFF';
          this.scoreConfig.align = 'left';
          this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
          this.scoreConfig.backgroundColor = '#3DBAFF';
          this.scoreConfig.color = '#FFF';
          this.scoreConfig.align = 'right';
          this.scoreRight = this.add.text(471, 54, this.p2Score, this.scoreConfig);
          this.scoreConfig.backgroundColor = '#F3B141';
          this.scoreConfig.color = '#843605';
      }
      
      // GAME OVER flag
      this.gameOver = false;
      
      //30-second speed-up clock
      this.clock = this.time.delayedCall(30000, ()=> {
          game.settings.spaceshipSpeed += 1.5;
      }, null, this);
      
      //45/60-second play clock
      this.timeOffset = this.time.now;
      
      //a countdown clock
      this.scoreConfig.align = 'center';
      this.timeUI = this.add.text(270, 54, '0', this.scoreConfig);
      this.scoreConfig.align = 'right';
  }


  update(){
      this.starfield.tilePositionX -= 4;
      
      // update if the game's over
      if(this.time.now - this.timeOffset >= game.settings.gameTimer && this.gameOver == false){
          this.timeUI.text = '0.0000';
          this.scoreConfig.fixedWidth = 0;
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', 
          this.scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ??? for Menu',
          this.scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }
      //update in-game timer
      if(!this.gameOver){
          this.timeUI.text = (game.settings.gameTimer - (this.time.now - this.timeOffset)) / 1000;
      }
      //check key input for restart
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
          game.settings.spaceshipSpeed -= 1.5;
          this.scene.restart(this.p1Score);
      }
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
          this.scene.start("menuScene");
      }
      if(!this.gameOver){
          this.p1Rocket.update();
          if(game.settings.multiplay == 1){ this.p2Rocket.update(); }
          this.ship01.update();           //update spaceships (x3) 
          this.ship02.update();           
          this.ship03.update();
          this.fast1.update();           // update fastship(x1)
      }
      //check p1 collisions
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship03);
          this.p1Score += this.ship03.points;
          this.scoreLeft.text = this.p1Score;
          this.gameEnd += 1000;
      }
      if(this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship02);
          this.p1Score += this.ship02.points;
          this.scoreLeft.text = this.p1Score;
          this.gameEnd += 1000;
      }
      if(this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship01);
          this.p1Score += this.ship01.points;
          this.scoreLeft.text = this.p1Score;
          this.gameEnd += 1000;
      }
      if(this.checkCollision(this.p1Rocket, this.fast1)) {
        this.p1Rocket.reset();
        this.shipExplode(this.fast1);
        this.p1Score += this.fast1.points;
        this.scoreLeft.text = this.p1Score;
        this.gameEnd += 1000;
      }
      //check p2 collisions
      if(game.settings.multiplay == 1){
          if(this.checkCollision(this.p2Rocket, this.ship03)) {
              this.p2Rocket.reset();
              this.shipExplode(this.ship03);
              this.p2Score += this.ship03.points;
              this.scoreRight.text = this.p2Score;
              this.gameEnd += 1000;
          }
          if(this.checkCollision(this.p2Rocket, this.ship02)) {
              this.p2Rocket.reset();
              this.shipExplode(this.ship02);
              this.p2Score += this.ship02.points;
              this.scoreRight.text = this.p2Score;
              this.gameEnd += 1000;
          }
          if(this.checkCollision(this.p2Rocket, this.ship01)) {
              this.p2Rocket.reset();
              this.shipExplode(this.ship03);
              this.p2Score += this.ship03.points;
              this.scoreRight.text = this.p2Score;
              this.gameEnd += 1000;
          }
          if(this.checkCollision(this.p1Rocket, this.fast1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fast1);
            this.p1Score += this.fast1.points;
            this.scoreLeft.text = this.p1Score;
            this.gameEnd += 1000;
          }
      }
  }

  checkCollision(rocket, ship){
      //simple AABB checking
      if (rocket.x < ship.x + ship.width &&
          rocket.x  + rocket.width > ship.x &&
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship.y){
          return true;
      } else {
          return false;
      }
  }

  shipExplode(ship){
      
      //temporarily hide ship
      ship.alpha = 0;    
      
      //create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             //play explode animation
      boom.on('animationcomplete', () => {   //callback after animations completes
          ship.reset();                       //reset ship position
          ship.alpha = 1;                     //make ship visible again
          boom.destroy();                     //remove explosion sprite
      });
      
      //score increment and repaint
      this.sound.play('sfx_explosion');
  }
}


