// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this); // add to existing, displayList, updateList
      this.multi = game.settings.multiplay; 
      this.isFiring = false; // track rocket's firing status 
      this.moveSpeed = 2; // pixels per frame
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      if(this.multi ==0){
          //if 0 give P1 controls
          this.moveleft = keyLEFT;
          this.moveRight = keyRIGHT;
          this.fire = keyF;
      }
      else{
          //if 1 (or anything else) give P2 controls
          this.moveLeft = keyA;
          this.moveRight = keyD;
          this.fire = keyO
      }
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this .x <= game.config.width -
            borderUISize - this.width) {
                this.x += this.moveSpeed;
            }

        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(this.fire) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    //reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
