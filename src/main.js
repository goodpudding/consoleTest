const config = {
    type: Phaser.AUTO,
    parent: 'game',  // add this line
    width: 1280,
    height: 720,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  let player, cursors;
  
  
  function preload() {
    this.load.image('Dungeon_Tileset', './src/assets/Dungeon_Tileset.png');
    this.load.tilemapTiledJSON('map', './src/assets/consoleTest.json');
  
    this.load.spritesheet("cat-run", "./src/assets/sprites/cat02_spritesheets/cat02_run_strip4.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("cat-jump", "./src/assets/sprites/cat02_spritesheets/cat02_jump_strip4.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("cat-land", "./src/assets/sprites/cat02_spritesheets/cat02_land_strip2.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("cat-walk", "./src/assets/sprites/cat02_spritesheets/cat02_walk_strip8.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
  }
  
  function create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('Dungeon_Tileset');
    const backgroundLayer = map.createLayer('Background', tileset);
    const interactiveLayer = map.createLayer('Interactive', tileset).setInteractive();
    const overheadLayer = map.createLayer('Overhead', tileset);
    backgroundLayer.setCollisionByProperty({ collide: true });

    player = this.physics.add.sprite(100, 450, 'cat-walk');
    player.body.setSize(player.width * 0.5, player.height * 0.5); // Adjust the hitbox size here
    player.anims.play('walk', true);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, backgroundLayer);  // Add this line

    cursors = this.input.keyboard.addKeys('W,A,S,D'); // add WASD keys here
   
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(player);
  
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('cat-run', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });
  
  this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('cat-jump', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });
  
  this.anims.create({
      key: 'land',
      frames: this.anims.generateFrameNumbers('cat-land', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: 0
  });
  
  this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('cat-walk', { start: 0, end: 7 }),
      frameRate: 20,
      repeat: -1
  });
  }
  
  function update() {
    if (cursors.A.isDown) {
        player.setVelocityX(-200);
        player.setFlipX(true);
    } else if (cursors.D.isDown) {
        player.setVelocityX(200);
        player.setFlipX(false);
    } else {
        player.setVelocityX(0);
    }
  
    if (cursors.W.isDown) {
        player.setVelocityY(-200);
        if (!player.anims.isPlaying || player.anims.currentAnim.key !== 'run') {
          player.anims.play('walk', false);
        }
    } else if (cursors.S.isDown) {
        player.setVelocityY(200);
        if (!player.anims.isPlaying || player.anims.currentAnim.key !== 'run') {
          player.anims.play('walk', false);
        }
    } else {
        player.setVelocityY(0);
    }
  }
  
  
  
  const game = new Phaser.Game(config);
  