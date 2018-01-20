Rocketeer.level1 = function (game) {
	this.player;
	this.platforms;
	this.cursors;
	this.gems;
	this.rockets;
	this.levelText = '';

	this.gemsLeft = 6;
	this.gemsLeftText = '';

	this.result = "Move with arrow keys - collect the gems and bring them to the spaceship!"
};

Rocketeer.level1.prototype = {
	preload: function () {
		this.load.image('sky', 'assets/bg_sunrise.png');
		this.load.image('ledgeL', 'assets/plat1left.png');
		this.load.image('ledgeR', 'assets/plat1right.png');
		this.load.image('ground', 'assets/plat1left.png');
	  this.load.image('rocket', 'assets/rocket1.png');
	  this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	  this.load.spritesheet('gem', 'assets/gem_pink.png', 32, 32);
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.sprite(0, 0, 'sky');

    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    let ground = this.platforms.create(-10, this.world.height - 64, 'ground');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(245, this.world.height - 64, 'ground');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(495, this.world.height - 64, 'ground');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;
		ground = this.platforms.create(745, this.world.height - 64, 'ground');
    ground.scale.setTo(1.5, 1.5);
    ground.body.immovable = true;

    let ledge = this.platforms.create(65, 365, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(180, 365, 'ledgeR');
    ledge.body.immovable = true;

    ledge = this.platforms.create(500, 260, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(650, 260, 'ledgeR');
    ledge.body.immovable = true;

    ledge = this.platforms.create(180, 140, 'ledgeL');
    ledge.body.immovable = true;
		ledge = this.platforms.create(230, 140, 'ledgeR');
    ledge.body.immovable = true;

    this.player = this.add.sprite(this.world.width / 2, this.world.height - 150, 'dude');
    this.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.1;
    this.player.body.gravity.y = 400;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.gems = this.add.group();
    this.gems.enableBody = true;

		let gem = this.gems.create(100, 330, 'gem');
		// gem.body.gravity.y = 60;
		// gem.body.bounce.y = 0.5 + Math.random() * 0.2; // will bounce somewhere between 0.7 and 0.9
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(300, 330, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');


		gem = this.gems.create(650, 225, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(700, 225, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(750, 225, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');


		gem = this.gems.create(200, 105, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

		gem = this.gems.create(250, 105, 'gem');
		gem.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		gem.animations.play('sparkle');

    this.rockets = this.add.group();
    this.rockets.enableBody = true;

    let mothership = this.rockets.create(165, 265, 'rocket')
		mothership.checkWorldBounds = true;
		mothership.outOfBoundsKill = true;

    this.gemsLeftText = this.add.text(16, 16, 'Gems left: 6', { fontSize: '20px', fill: '#000' });
		this.levelText = this.add.text(this.world.centerX - 50, 16, 'Level 1', {fill: '#000'});

    this.cursors = this.input.keyboard.createCursorKeys();
		// this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},

	launchRocket: function (rocket) {
		rocket.body.velocity.y = -200;
	},

	loadLevel2: function () {
		this.state.start('level2');
	},

	update: function () {
		let hitPlatform = this.physics.arcade.collide(this.player, this.platforms);  // collision check - allows player to collide with platforms

	  this.physics.arcade.collide(this.gems, this.platforms); // allows stars to collide with platforms
	  // this.physics.arcade.collide(this.rockets, this.platforms);
	  this.physics.arcade.overlap(this.gems, this.rockets, depositGem, null, this);
	  this.physics.arcade.overlap(this.player, this.gems, catchGem, null, this);  // (obj1, obj2, overlapCallback, additionalChecksCallback, callbackContext)
	  // this.physics.arcade.overlap(this.player, this.rockets, hitByCoffee, null, this);

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
			this.loadLevel2()
		}

		if (!this.player.alive) {
			this.state.start('level1');
		}

		// if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	  //   {
	        // fireBullet();
	  //   }

	  // jump!
	  if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
	    this.player.body.velocity.y = -350;
	  }

	  function catchGem (player, gem) {
	    gem.body.position = player.body.position;
	  }

	  function depositGem (gem, rocket) {
	    gem.kill();

			if (this.gemsLeft === 0) {
				this.launchRocket(rocket);
			} else {
				this.gemsLeft -= 1;
			}

	    this.gemsLeftText.text = 'Gems left: ' + this.gemsLeft;
	  }

	  // function hitByCoffee (player, rocket) {
	  //   // player.kill();
	  // }
	},

	render: function () {
		// if (this.changeTimer.tick) {
		// 	console.log("this.changeTimer", this.changeTimer);
		// 	this.countdownText = '' + this.changeTimer
		// } else {
		// 	this.loadLevel2();
		// }
	}
};
