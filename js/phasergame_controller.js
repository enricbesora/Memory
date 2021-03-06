var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	cards: 2,
	time: 0,
	timeout : 0,
	dificultyMultiplier: 0,
	dificulty: 'normal',
	games: 0,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [ GameScene ]
};

var game = new Phaser.Game(config);

