let level1 = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	level1.load.image('sky', 'assets/Sunrise.png');
	level1.load.image('ground', 'assets/platform.png');
  level1.load.image('coffee', 'assets/diamond.png');
  level1.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  level1.load.spritesheet('gem', 'assets/gem_pink.png', 32, 32);
}

let player;
let platforms;
let cursors;
let gems;
let coffees;

let score = 0;
let scoreText;

// let gemsHeld = 0;
// let gemsHeldText;

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
    level1.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our level1
    level1.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = level1.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, level1.world.height - 64, 'ground');

    //  Scale it to fit the width of the level1 (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    // var ledge = platforms.create(400, 400, 'ground');
    // ledge.body.immovable = true;
    //
    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;

    let ledge = platforms.create(350, 450, 'ground');
    ledge.scale.setTo(0.7, 0.7);
    ledge.body.immovable = true;

    ledge = platforms.create(-50, 350, 'ground');
    ledge.scale.setTo(0.7, 0.7);
    ledge.body.immovable = true;

    ledge = platforms.create(450, 250, 'ground');
    ledge.scale.setTo(0.7, 0.7);
    ledge.body.immovable = true;

    ledge = platforms.create(50, 150, 'ground');
    ledge.scale.setTo(0.7, 0.7);
    ledge.body.immovable = true;

    // The player - positioned 32px from the left and 150px from the bottom of the level1
    player = level1.add.sprite(32, level1.world.height - 150, 'dude');

    //  We need to enable physics on the player
    level1.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // group(parent, name, addToStage, enableBody, physicsBodyType)
    gems = level1.add.group();
    gems.enableBody = true;

    for (var i = 0; i < 6; i++) {
      const gem = gems.create(i * 100, 0, 'gem');
      gem.body.gravity.y = 60;
      gem.body.bounce.y = 0.5 + Math.random() * 0.2; // will bounce somewhere between 0.7 and 0.9
      gem.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
      gem.animations.play('turn');
    }

    coffees = level1.add.group();
    coffees.enableBody = true;

    coffees.create(level1.world.width - 215, level1.world.height - 185, 'coffee')

    // for (var i = 0; i < 2; i++) {
    //   const coffee = coffees.create(i*400+ 75, -100, 'coffee');
    //   coffee.body.gravity.y = 100;
    //   coffee.body.bounce.y = 0.2;
    // }

    scoreText = level1.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });

    cursors = level1.input.keyboard.createCursorKeys();
}

function update() {
  let hitPlatform = level1.physics.arcade.collide(player, platforms);  // collision check - allows player to collide with platforms

  level1.physics.arcade.collide(gems, platforms); // allows stars to collide with platforms
  level1.physics.arcade.collide(coffees, platforms);
  level1.physics.arcade.overlap(gems, coffees, depositGem, null, this);
  level1.physics.arcade.overlap(player, gems, catchGem, null, this);  // (obj1, obj2, overlapCallback, additionalChecksCallback, callbackContext)
  level1.physics.arcade.overlap(player, coffees, hitByCoffee, null, this);

  player.body.velocity.x = 0;

  // move back and forth with arrow keys
  if (cursors.left.isDown) {
    player.body.velocity.x = -250;
    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 250;
    player.animations.play('right');
  }
  else {
    player.animations.stop();
    player.frame = 4;
  }

  // jump!
  if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    player.body.velocity.y = -350;
  }

  function catchGem (player, gem) {
    // gem.kill();
    // score += 10;
    // scoreText.text = 'Score: ' + score;
    gem.body.position = player.body.position;
    // gemsHeld += 1;
    // gemsHeldText.text = 'Gems In Hand: ' + gemsHeld;

    // gem.body.position.x = player.body.position.x;
    // gem.body.position.y = player.body.position.y + posCounter;
  }

  function depositGem (gem, coffee) {
    gem.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;

  }

  function hitByCoffee (player, coffee) {
    // player.kill();
  }

  console.log("STATE: ", level1.state)
}
