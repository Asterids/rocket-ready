export default let RocketReady = {};

RocketReady.level2 = function (game) {
	this.player;
	this.platforms;
	this.cursors;
	this.gems;
	this.rockets;

	this.monsters;

	this.gemsLeft = 8;
	this.gemsLeftText = '';
	this.levelText = '';
	this.livesText = '';
};

RocketReady.level2.prototype = {
	preload: function () {
		this.load.image('sky', 'assets/bg_sunrise.png');
		this.load.image('ledgeL', 'assets/plat1left.png');
		this.load.image('ledgeR', 'assets/plat1right.png');
	  this.load.image('rocket', 'assets/rocket1.png');

		this.load.image('monster', 'assets/spiky-monster.png');

	  this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	  this.load.spritesheet('gem', 'assets/gem_grey.png', 32, 32);
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.gemsLeft = 8;

    this.add.sprite(0, 0, 'sky');

    this.platforms = this.add.group();
    this.platforms.enableBody = true;

		let ground = this.platforms.create(-10, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(245, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(495, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(745, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;

    let ledge = this.platforms.create(520, 370, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(630, 370, 'ledgeR');
    ledge.body.immovable = true;

		ledge = this.platforms.create(-50, 370, 'ledgeR');
    ledge.body.immovable = true;

    ledge = this.platforms.create(330, 240, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(400, 240, 'ledgeR');
    ledge.body.immovable = true;

    ledge = this.platforms.create(50, 135, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(50, 135, 'ledgeR');
    ledge.body.immovable = true;

		ledge = this.platforms.create(650, 130, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(720, 130, 'ledgeR');
    ledge.body.immovable = true;


		this.rockets = this.add.group();
		this.rockets.enableBody = true;

		let mothership = this.rockets.create(410, 140, 'rocket')
		mothership.checkWorldBounds = true;
		mothership.outOfBoundsKill = true;


		this.player = this.add.sprite(this.world.width / 2, this.world.height - 150, 'dude');
		this.physics.arcade.enable(this.player);

		this.player.body.bounce.y = 0.1;
		this.player.body.gravity.y = 400;
		this.player.body.collideWorldBounds = true;

		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);


		this.gems = this.add.group();
		this.gems.enableBody = true;

		let gem = this.gems.create(25, 455, 'gem');
		gem.animations.add('sparkle', [6, 7, 0, 1, 2, 3, 4, 5], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(725, 455, 'gem');
		gem.animations.add('sparkle', [6, 7, 0, 1, 2, 3, 4, 5], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(570, 330, 'gem');
		gem.animations.add('sparkle', [4, 5, 6, 7, 0, 1, 2, 3], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(620, 330, 'gem');
		gem.animations.add('sparkle', [2, 3, 4, 5, 6, 7, 0, 1], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(50, 330, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(70, 100, 'gem');
		gem.animations.add('sparkle', [3, 4, 5, 6, 7, 0, 1, 2], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(665, 95, 'gem');
		gem.animations.add('sparkle', [1, 2, 3, 4, 5, 6, 7, 0], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(715, 95, 'gem');
		gem.animations.add('sparkle', [6, 7, 0, 1, 2, 3, 4, 5], 10, true);
		gem.animations.play('sparkle');


		this.monsters = this.add.group();
		this.monsters.enableBody = true;

		let monster = this.monsters.create(880, 453, 'monster');
		this.physics.arcade.enable(monster);
		monster.body.collideWorldBounds = true;
		monster.body.velocity.x = -100;
		monster.body.bounce.setTo(1, 0);

		monster = this.monsters.create(24, 453, 'monster');
		this.physics.arcade.enable(monster);
		monster.body.collideWorldBounds = true;
		monster.body.velocity.x = -100;
		monster.body.bounce.setTo(1, 0);

		monster = this.monsters.create(130, 101, 'monster');
		this.physics.arcade.enable(monster);


		this.gemsLeftText = this.add.text(16, 16, 'Gems left: 8', { fontSize: '20px', fill: '#000' });
		this.levelText = this.add.text(this.world.centerX - 50, 16, 'Level 2', {fill: '#000'});
		this.livesText = this.add.text(880, 16, "Lives: " + livesRemaining);

		this.cursors = this.input.keyboard.createCursorKeys();
		// this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},

	launchRocket: function (rocket) {
		this.player.kill();
		rocket.body.velocity.y = -200;
	},

	loadLevel3: function () {
		this.state.start('level3');
	},

	update: function () {
		let hitPlatform = this.physics.arcade.collide(this.player, this.platforms);  // collision check - allows player to collide with platforms

	  this.physics.arcade.collide(this.gems, this.platforms); // allows monsters to collide with platforms
	  // this.physics.arcade.collide(this.rockets, this.platforms);
	  this.physics.arcade.overlap(this.gems, this.rockets, depositGem, null, this);
	  this.physics.arcade.overlap(this.player, this.gems, catchGem, null, this);  // (obj1, obj2, overlapCallback, additionalChecksCallback, callbackContext)
	  this.physics.arcade.overlap(this.player, this.monsters, deathByMonster, null, this);

	  this.player.body.velocity.x = 0;

	  // move back and forth with arrow keys
	  if (this.cursors.left.isDown) {
	    this.player.body.velocity.x = -250;
	    this.player.animations.play('left');
	  }
	  else if (this.cursors.right.isDown) {
	    this.player.body.velocity.x = 250;
	    this.player.animations.play('right');
	  }
	  else {
	    this.player.animations.stop();
	    this.player.frame = 4;
	  }

		if (!this.rockets.countLiving() > 0) {
			this.loadLevel3()
		}

		// if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	  //   {
	        // fireBullet();
	  //   }

	  if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
	    this.player.body.velocity.y = -350;
	  }

	  function catchGem (player, gem) {
	    gem.body.position = player.body.position;
	  }

	  function depositGem (gem, rocket) {
	    gem.kill();
			this.gemsLeft--;
	    this.gemsLeftText.text = 'Gems left: ' + this.gemsLeft;

			if (!this.gems.countLiving() > 0) {
				this.launchRocket(rocket)
			}
	  }

		function deathByMonster (player, monster) {
			livesRemaining--;
			this.gemsLeft = 8;
			if (livesRemaining === 0) {
				this.state.start('gameOver')
			} else {
		    this.state.start('level2');
			}
	  }

	},

	render: function () {

	}
};
