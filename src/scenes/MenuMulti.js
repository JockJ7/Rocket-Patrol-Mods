//created a new scene where you switch over to another menu when you want to have two players
class MenuMulti extends Phaser.Scene {
    constructor() {
        super("menuMultiScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
        fontFamily: 'Ariel',
        fontSize: '28px',
        backgroundColor: '#fff700',
        color: '#000',
        align: 'right',
        padding: {
            top: 5,
            bototm: 5,
        },
        fixedWidth: 0
        }   

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL TWO-PLAYER', menuConfig).setOrigin(0.5);
        
        menuConfig.fontSize = '24px';
        menuConfig.backgroundColor = '#840523';
        menuConfig.color = '#FFF';
        this.add.text(centerX, centerY, 'P1: Use ↔ arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#843105';
        menuConfig.color = '#FFF';
        this.add.text(centerX, centerY + textSpacer, 'P2: Use <A W> keys to move and (E) to Shoot', menuConfig).setOrigin(0.5);
        
        menuConfig.fontSize = '28px';
        menuConfig.backgroundColor = '#5e8405';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + (2 * textSpacer), 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#fff700';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + (3 * textSpacer), 'Press ↓ for One Player Mode', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multiplay: 1
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multiplay: 1
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            //go to two-player mode
            game.settings = {multiplay: 0}
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
    }
}