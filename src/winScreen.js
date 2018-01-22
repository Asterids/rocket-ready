export default let RocketReacdy = {};

RocketReady.winScreen = function (game) {
	this.platforms;
	this.youWin = '';
	this.finalScore = '';
	this.restart = '';
	this.cursors;
}

RocketReady.winScreen.prototype = {
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

		this.youWin = this.add.text(440, 160, 'You Win!');
		this.finalScore = this.add.text(388, 210, ' Final Score: ' + score)
		this.restart = this.add.text(360, 335, 'Press up ⇧ to restart');

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
