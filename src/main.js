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
  const directions = ['down', 'up', 'left', 'right'];
  
  let golem1;
  let bird1;
  let monsters = [];
  let monsterTypes = ['golem1', 'bird1', 'cacto']; // Array of monster sprite keys

  function preload() {
    this.load.image('Dungeon_Tileset', './src/assets/Dungeon_Tileset.png');
    this.load.tilemapTiledJSON('map', './src/assets/consoleTest.json');
    loadSpriteAtlas(this, 'bluechar');
    loadSpriteAtlas(this, 'golem1');
    loadSpriteAtlas(this, 'bird1');
    loadSpriteAtlas(this, 'cacto');
  
    function loadSpriteAtlas(context, spriteName) {
      context.load.atlas(spriteName, `./src/assets/sprites/${spriteName}/${spriteName}.png`, `./src/assets/sprites/${spriteName}/${spriteName}.json`);
    }
  }
  function chasePlayer(monster, speed) {
    const direction = new Phaser.Math.Vector2(player.x - monster.x, player.y - monster.y);
    direction.normalize();
    monster.setVelocity(direction.x * speed, direction.y * speed);
  
    // Determine the direction of the monster
    if (Math.abs(direction.x) > Math.abs(direction.y)) {
      // Monster is moving more horizontally
      if (direction.x > 0) {
        monster.play(`${monster.texture.key}-right`, true);
      } else {
        monster.play(`${monster.texture.key}-left`, true);
      }
    } else {
      // Monster is moving more vertically
      if (direction.y > 0) {
        monster.play(`${monster.texture.key}-down`, true);
      } else {
        monster.play(`${monster.texture.key}-up`, true);
      }
    }
  }
  
  function create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('Dungeon_Tileset');
    const backgroundLayer = map.createLayer('Background', tileset);
    const interactiveLayer = map.createLayer('Interactive', tileset).setInteractive();
    const overheadLayer = map.createLayer('Overhead', tileset);
    backgroundLayer.setCollisionByProperty({ collide: true });
    interactiveLayer.setCollisionByProperty({ collide: true });
    golem1 = this.physics.add.sprite(128, 180, 'golem1', 'down1.png');
    cacto = this.physics.add.sprite(128, 180, 'cacto', 'down1.png');
bird1 = this.physics.add.sprite(128, 128, 'bird1', 'down1.png');


    directions.forEach(direction => createAnimationForCharacter(this, 'bluechar', direction));
    directions.forEach(direction => createAnimationForCharacter(this, 'golem1', direction));
    directions.forEach(direction => createAnimationForCharacter(this, 'bird1', direction));
    directions.forEach(direction => createAnimationForCharacter(this, 'cacto', direction));
  
    function createAnimationForCharacter(context, character, direction) {
      context.anims.create({
        key: `${character}-${direction}`,
        frames: context.anims.generateFrameNames(character, {
          prefix: direction,
          suffix: '.png',
          start: 1,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1
      });
    }
  
  // bird1.anims.play('bird1-down');
  // golem1.anims.play('golem1-up');
  // cacto.anims.play('cacto-up');

    player = this.physics.add.sprite(100, 450, 'bluechar');
    player.body.setSize(player.width * 0.4, player.height * 0.4); // Adjust the hitbox size here
    player.anims.play('walk', false);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, backgroundLayer);  
    this.physics.add.collider(player, interactiveLayer); 
    this.physics.add.collider(golem1, backgroundLayer);  
    this.physics.add.collider(bird1, interactiveLayer); 

    cursors = this.input.keyboard.addKeys('W,A,S,D'); // add WASD keys here
   
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(player);
for (let i = 0; i < 400; i++) {
  let monsterType = Phaser.Utils.Array.GetRandom(monsterTypes); // Randomly select a monster sprite

  const monster = this.physics.add.sprite(
    Phaser.Math.Between(100, 700), // random X position between 100 and 700
    Phaser.Math.Between(100, 500), // random Y position between 100 and 500
    monsterType, // use the randomly selected monster sprite
    'down1.png' // replace with your animation key
  );

  monster.play(`${monsterType}-down`); // Play the corresponding animation for the monster
  this.physics.add.collider(monster, backgroundLayer);
  this.physics.add.collider(monster, interactiveLayer);

  // Add collision between the monster and the player
  this.physics.add.collider(monster, player);
  this.physics.add.collider(monster, golem1);
  this.physics.add.collider(monster, bird1);
  this.physics.add.collider(monster, cacto);

  // Set the speed of the monster
  const speed = Phaser.Math.Between(50, 200); // Random speed between 50 and 200
  const angle = Phaser.Math.Between(0, 360); // Random angle of movement

  // Set the velocity based on the speed and angle
  monster.body.setVelocity(
    Math.cos(Phaser.Math.DEG_TO_RAD * angle) * speed,
    Math.sin(Phaser.Math.DEG_TO_RAD * angle) * speed
  );

  monsters.push(monster);
}

  
  }
  
  function update() {
    chasePlayer(golem1, 150);
    chasePlayer(cacto, 150);
    chasePlayer(bird1, /* `80` is the speed at which the `bird1` sprite is chasing the player in the
    `chasePlayer` function. */
    50);
    monsters.forEach((monster) => {
      chasePlayer(monster, 50);
    });
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
  