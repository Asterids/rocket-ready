RocketReady.startMenu = function (game) {
	this.platforms;
	this.rockets;
	this.player;
	this.levelText = '';
	this.livesText = '';
	this.gemsLeftText = '';
	this.instruct1 = '';
	this.instruct2 = '';
	this.howToMove = '';
	this.intro = '';
	this.cursors;
}

RocketReady.startMenu.prototype = {
	preload: function () {
		this.load.image('sky', 'assets/bg_sunrise.png');
		this.load.image('ledgeL', 'assets/plat1left.png');
		this.load.image('rocket', 'assets/rocket1.png');
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function () {
		this.add.sprite(0, 0, 'sky');
		this.add.sprite(70, 387, 'rocket');
		this.add.sprite(175, 440, 'dude');

		this.platforms = this.add.group();
    let ground = this.platforms.create(-10, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(245, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(495, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(745, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);

		this.levelText = this.add.text(this.world.centerX - 50, 16, 'Level 1');
		this.gemsLeftText = this.add.text(16, 16, 'Gems left: 0');
		this.livesText = this.add.text(880, 16, 'Lives: 5')

		this.instruct1 = this.add.text(190, 140, 'Bring the power gems to the spaceship to launch to the next level!');
		this.instruct1.scale.setTo(0.75, 0.75);
		this.instruct2 = this.add.text(376, 180, 'Watch out for monsters...');
		this.instruct2.scale.setTo(0.75, 0.75);
		this.howToMove = this.add.text(321, 275, 'Move using the arrow keys');
		this.intro = this.add.text(360, 335, 'Press up ⇧ to start');

		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		if (this.cursors.up.isDown) {
			this.state.start('level1');
		}
	}
}
