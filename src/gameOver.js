export default let RocketReady = {};

RocketReady.gameOver = function (game) {
	this.platforms;
	this.endText = '';
	this.restart = '';
	this.cursors;
}

RocketReady.gameOver.prototype = {
	preload: function () {
		this.load.image('sky', 'assets/bg_sunrise.png');
		this.load.image('ledgeL', 'assets/plat1left.png');
	},

	create: function () {
		this.add.sprite(0, 0, 'sky');

		this.platforms = this.add.group();
    let ground = this.platforms.create(-10, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(245, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(495, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);
		ground = this.platforms.create(745, this.world.height - 64, 'ledgeL');
    ground.scale.setTo(1.5, 1.5);

		this.endText = this.add.text(418, 180, 'GAME OVER');
		this.restart = this.add.text(362, 335, 'Press up ⇧ to restart');

		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		score = 0;
		livesRemaining = 5;
		if (this.cursors.up.isDown) {
			this.state.start('startMenu');
		}
	}
}
