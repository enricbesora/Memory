class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data;
		options_data = JSON.parse(json);
		this.cards = options_data.cards;
		switch (options_data.dificulty){
			case 'easy':
				this.time = 4000;
				this.dificultyMultiplier = 5;
				break;
			case 'normal':
				this.time = 2000;
				this.dificultyMultiplier = 10;
				break;
			case 'hard':
				this.time = 1000;
				this.dificultyMultiplier = 20;
				break;
			default:
				this.time = 2000;
				this.dificultyMultiplier = 10;
				break;
		}
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		var arraycards = ['cb','co','sb','so','tb','to'];
		arraycards = arraycards.slice(); // Copiem l'array
		arraycards.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		arraycards = arraycards.slice(0, this.cards); // Agafem els primers numCards elements
		arraycards = arraycards.concat(arraycards); // Dupliquem els elements
		arraycards.sort(function(){return Math.random() - 0.5}); // Array aleatòria

		/*
		switch (this.cards) {
			case 2:
				this.add.image(250, 300, arraycards[0]);
				this.add.image(350, 300, arraycards[1]);
				this.add.image(450, 300, arraycards[2]);
				this.add.image(550, 300, arraycards[3]);
				
				this.cards = this.physics.add.staticGroup();
				
				this.cards.create(250, 300, 'back');
				this.cards.create(350, 300, 'back');
				this.cards.create(450, 300, 'back');
				this.cards.create(550, 300, 'back');
				break;

			case 3:
				this.add.image(150, 300, arraycards[4]);
				this.add.image(650, 300, arraycards[5]);
				
				
				
				break;

			default:
				break;
		}
		*/
		if(this.cards == 2){
			this.add.image(250, 300, arraycards[0]);
			this.add.image(350, 300, arraycards[1]);
			this.add.image(450, 300, arraycards[2]);
			this.add.image(550, 300, arraycards[3]);
			
			this.cards = this.physics.add.staticGroup();
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
		} else if (this.cards == 3){
			this.add.image(150, 300, arraycards[0]);
			this.add.image(250, 300, arraycards[1]);
			this.add.image(350, 300, arraycards[2]);
			this.add.image(450, 300, arraycards[3]);
			this.add.image(550, 300, arraycards[4]);
			this.add.image(650, 300, arraycards[5]);
			
			this.cards = this.physics.add.staticGroup();
			this.cards.create(150, 300, 'back');
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
			this.cards.create(650, 300, 'back');
		} else if (this.cards == 4){
			this.add.image(50, 300, arraycards[0]);
			this.add.image(150, 300, arraycards[0]);
			this.add.image(250, 300, arraycards[1]);
			this.add.image(350, 300, arraycards[2]);
			this.add.image(450, 300, arraycards[3]);
			this.add.image(550, 300, arraycards[4]);
			this.add.image(650, 300, arraycards[5]);
			this.add.image(750, 300, arraycards[0]);
			
			this.cards = this.physics.add.staticGroup();
			this.cards.create(50, 300, 'back');
			this.cards.create(150, 300, 'back');
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
			this.cards.create(650, 300, 'back');
			this.cards.create(750, 300, 'back');

			
		}
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.setInteractive();
			card.disableBody(true,true);

		})
		setTimeout(() =>{
			this.cards.children.iterate((card)=>{
				card.enableBody(false, 0, 0, true, true);
			})
		},this.time);


		i= 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= this.dificultyMultiplier;
						card.disableBody(true,true);
						var aux = this.firstClick;
						setTimeout(()=>{
							aux.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
						},200);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

