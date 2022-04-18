class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList, updateList
        //store pointValue
        this.points = pointValue; // track rocket's firing status
    }

    update(){
        //move spaceship left
        this.x -= game.settings.spaceshipSpeed;
        //wrap around from left to right edge
        if(this.x <= 0-this.width){
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}
