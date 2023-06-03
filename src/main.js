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
    this.load.atlas('bluechar', './src/assets/sprites/bluechar/bluechar-0.png', './src/assets/sprites/bluechar/bluechar.json')
    this.load.atlas('golem1', './src/assets/monsters/golem1.png', './src/assets/monsters/golem1.json')
    this.load.atlas('bird1', './src/assets/monsters/bird1.png', './src/assets/monsters/bird1.json')
  
    
  }
  
  function create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('Dungeon_Tileset');
    const backgroundLayer = map.createLayer('Background', tileset);
    const interactiveLayer = map.createLayer('Interactive', tileset).setInteractive();
    const overheadLayer = map.createLayer('Overhead', tileset);
    backgroundLayer.setCollisionByProperty({ collide: true });
    interactiveLayer.setCollisionByProperty({ collide: true });
    const bluechar = this.add.sprite(128, 128, 'bluechar', 'down1.png' )
    const golem1 = this.add.sprite(128, 156, 'golem1', 'down1.png' )
    const bird1 = this.add.sprite(128, 128, 'bird1', 'down1.png' )
   
    this.anims.create({
        key: 'bluechar-down',
        frames: this.anims.generateFrameNames('bluechar', {
            prefix: 'down',
            suffix: '.png',
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'bluechar-up',
        frames: this.anims.generateFrameNames('bluechar', {
            prefix: 'up',
            suffix: '.png',
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    }); 
    this.anims.create({
        key: 'bluechar-left',
        frames: this.anims.generateFrameNames('bluechar', {
            prefix: 'left',
            suffix: '.png',
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'bluechar-right',
        frames: this.anims.generateFrameNames('bluechar', {
            prefix: 'right',
            suffix: '.png',
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
      key: 'golem1-down',
      frames: this.anims.generateFrameNames('golem1', {
          prefix: 'down',
          suffix: '.png',
          start: 1,
          end: 3,
      }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
      key: 'golem1-up',
      frames: this.anims.generateFrameNames('golem1', {
          prefix: 'up',
          suffix: '.png',
          start: 1,
          end: 3,
      }),
      frameRate: 10,
      repeat: -1
  }); 
  this.anims.create({
      key: 'golem1-left',
      frames: this.anims.generateFrameNames('golem1', {
          prefix: 'left',
          suffix: '.png',
          start: 1,
          end: 3,
      }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
      key: 'golem1-right',
      frames: this.anims.generateFrameNames('golem1', {
          prefix: 'right',
          suffix: '.png',
          start: 1,
          end: 3,
      }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
    key: 'bird1-down',
    frames: this.anims.generateFrameNames('bird1', {
        prefix: 'down',
        suffix: '.png',
        start: 1,
        end: 3,
    }),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'bird1-up',
    frames: this.anims.generateFrameNames('bird1', {
        prefix: 'up',
        suffix: '.png',
        start: 1,
        end: 3,
    }),
    frameRate: 10,
    repeat: -1
}); 
this.anims.create({
    key: 'bird1-left',
    frames: this.anims.generateFrameNames('bird1', {
        prefix: 'left',
        suffix: '.png',
        start: 1,
        end: 3,
    }),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'bird1-right',
    frames: this.anims.generateFrameNames('bird1', {
        prefix: 'right',
        suffix: '.png',
        start: 1,
        end: 3,
    }),
    frameRate: 10,
    repeat: -1
});
    
    bird1.anims.play('bird1-down');    golem1.anims.play('golem1-down');

    player = this.physics.add.sprite(100, 450, 'bluechar');
    player.body.setSize(player.width * 0.4, player.height * 0.4); // Adjust the hitbox size here
    player.anims.play('walk', false);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, backgroundLayer);  
    this.physics.add.collider(player, interactiveLayer); 

    cursors = this.input.keyboard.addKeys('W,A,S,D'); // add WASD keys here
   
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(player);
  
  
  }
  
  function update() {
    // Horizontal movement
    if (cursors.A.isDown) {
        player.setVelocityX(-200);
        player.anims.play('bluechar-left', true);
    } else if (cursors.D.isDown) {
        player.setVelocityX(200);
        player.anims.play('bluechar-right', true);
    } else {
        player.setVelocityX(0);
    }
  
    // Vertical movement
    if (cursors.W.isDown) {
        player.setVelocityY(-200);
        player.anims.play('bluechar-up', true);
    } else if (cursors.S.isDown) {
        player.setVelocityY(200);
        player.anims.play('bluechar-down', true);
    } else {
        player.setVelocityY(0);
    }
  }
  
  
  
  
  const game = new Phaser.Game(config);
  