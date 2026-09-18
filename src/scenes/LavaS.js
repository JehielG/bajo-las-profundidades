class LavaS extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'LavaS' 
        }); 
    } 
	
    init(VidasT) { 
        console.log('Escena del puzzle de lava');
      this.totalVidas=VidasT;
    } 

    preload() {
        this.load.path = './assets/LavaS/';
        this.load.image(['fondo_jungla', 'lava_wall', 'rieles', 'plataforma','palancaDerecha','palancaIzquierda','JorgeSeñala','BotonReintentar','FallasteNL1','FallasteNL2','PDINL']);

		this.load.audio('SoundLava',['../Sound/SoundLava.mp3']);
		this.load.audio('SoundPlataforma',['../Sound/SoundPlataforma.mp3']);
		this.load.audio('mov2',['../Sound/mov2.mp3']);
		this.load.audio('SoundGritoMasculino',['../Sound/SoundGritoMasculino.mp3']);
      this.load.audio('SoundAtascado',['../Sound/SoundAtascado.mp3']);
      
        this.load.tilemapTiledJSON('mapaLava', "lava_map.json");
		this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }


    create() { 
        this.scene.bringToTop('VidasP');
    	console.log("Vidas en el puzzle de lava: ",this.totalVidas);
        //---Constantes
		this.velocidad = 200
		this.banPla=0;
		this.banMovP=0;

		this.banJor=0;
		this.banRep1=0;
		this.banRep2=0;
		this.banRep3=0;
		this.banIsa=0;
		this.banAns=0;
		this.ContPerSub=0;

		this.ban2Jor=0;
		this.ban2Rep1=0;
		this.ban2Rep2=0;
		this.ban2Rep3=0;
		this.ban2Isa=0;
		this.ban2Ans=0;
		this.ban3Jor=0;
		this.ban3Rep1=0;
		this.ban3Rep2=0;
		this.ban3Rep3=0;
		this.ban3Isa=0;
		this.ban3Ans=0;
		this.contPerIzq=0;
		this.contRepIzq=0;
		this.contPerDer=0;
		this.contRepDer=0;

    	this.ganaste=0;
		this.perdiste=0;
		this.reintentar=0;
		
        //---Controles
		const eventos = Phaser.Input.Events;
		this.cursor = this.input.keyboard.createCursorKeys();
        //---Sonidos
		//Lava 
		this.sonidoLava = this.sound.add('SoundLava');
		this.sonidoLava.loop = true;
		this.sonidoLava.setVolume(.5);
		this.sonidoLava.play();
		//sonido de caida
		this.sonidoCaidaM = this.sound.add('SoundGritoMasculino');
		this.sonidoCaidaM.setVolume(.5);

    	//sonido plataforma atascada
		this.sonidoAtascado = this.sound.add('SoundAtascado');
		
		//pasos
    this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);
		this.rep1_pasos = this.sound.add('pasos');
		this.rep1_pasos.loop = true;
		this.rep1_pasos.setVolume(.7);
		this.rep2_pasos = this.sound.add('pasos');
		this.rep2_pasos.loop = true;
		this.rep2_pasos.setVolume(.7);
		this.rep3_pasos = this.sound.add('pasos');
		this.rep3_pasos.loop = true;
		this.rep3_pasos.setVolume(.7);
		this.isa_pasos = this.sound.add('pasos');
		this.isa_pasos.loop = true;
		this.isa_pasos.setVolume(.7);
		this.ans_pasos = this.sound.add('pasos');
		this.ans_pasos.loop = true;
		this.ans_pasos.setVolume(.7);
		//saltar
		this.jorge_saltar = this.sound.add('salto');
		this.jorge_saltar.loop = true;
		this.jorge_saltar.setVolume(.3);
		this.rep1_saltar = this.sound.add('mov2');
		this.rep1_saltar.setVolume(.3);
		this.rep2_saltar = this.sound.add('mov2');
		this.rep2_saltar.setVolume(.3);
		this.rep3_saltar = this.sound.add('mov2');
		this.rep3_saltar.setVolume(.3);
		this.isa_saltar = this.sound.add('mov2');
		this.isa_saltar.setVolume(.3);
		this.ans_saltar = this.sound.add('mov2');
		this.ans_saltar.setVolume(.3);
		//se mueve plataforma
		this.sonidoPlataforma = this.sound.add('SoundPlataforma');
		this.sonidoPlataforma.loop = true;
		this.sonidoPlataforma.setVolume(.3);

		
		//---TileMap
		this.mapaLava = this.make.tilemap({
			key: "mapaLava"
		});
		this.tileset = this.mapaLava.addTilesetImage("caveTiles", "caveTiles");

		this.fondo = this.add.image(1280, 0, 'fondo_jungla').setOrigin(1,0).setScale(2.5);
		this.lavaLayer = this.mapaLava.createLayer("2DLava", this.tileset, 0, 0);
		this.wallLayer = this.add.image(0, 0, 'lava_wall').setOrigin(0,0);
		this.groundLayer = this.mapaLava.createLayer("2DPiso", this.tileset, 0, 0);
        this.sys.animatedTiles.init(this.mapaLava);

        //colision
        this.groundLayer.setCollisionByProperty({
			collides: true
		});
		
		// Permite visualizar los colliders de los tiles
		// this.debugGraphics = this.add.graphics().setAlpha(0.7);
		// this.groundLayer.renderDebug(this.debugGraphics, {
		// 	tileColor: null,
		// 	collidingTileColor: new Phaser.Display.Color(243,243,48,255),
		// });
		
		//-------------Personajes
        //jorge
        this.jorge = this.add.sprite(50, 400, 'jorge').setScale(3);
		this.physics.add.existing(this.jorge, false);
		this.jorge.body.setAllowGravity(true);
		this.jorge.body.isStatic = false;
		this.jorge.body.setBounce(.2);
		this.jorge.setDisplaySize(40,44);
		this.jorge.anims.play("jorge_down_idle");
		
		//Jorge Salta
		this.jorgeJump = this.add.sprite(150, 150, 'jorge_jump');
		this.physics.add.existing(this.jorgeJump, false);
		this.jorgeJump.body.setAllowGravity(false);
		this.jorgeJump.body.isStatic = false;
		this.jorgeJump.body.setBounce(.2);
		this.jorgeJump.setDisplaySize(40,80);
		this.jorgeJump.setVisible(0);

		//Jorge Señala
		this.jorgeS = this.add.image(50, 400, 'JorgeSeñala').setScale(3);
		this.jorgeS.setVisible(0);
		
		//isabella
		this.isabella = this.add.sprite(150, 400, 'isabella').setInteractive();
		this.isabella.name='isabella';
		this.isabella.setScale(3);
		this.physics.add.existing(this.isabella, false);
		this.isabella.body.setAllowGravity(true);
		this.isabella.body.isStatic = false;
		this.isabella.body.setBounce(.2);
		this.isabella.anims.play("isabella_idle");
		//Anselmo
		this.anselmo = this.add.sprite(100, 400, 'anselmo').setInteractive();
		this.anselmo.name='anselmo';
		this.anselmo.setScale(3);
		this.physics.add.existing(this.anselmo, false);
		this.anselmo.body.setAllowGravity(true);
		this.anselmo.body.isStatic = false;
		this.anselmo.body.setBounce(.2);
		this.anselmo.anims.play("anselmo_idle");
		//sythua1
        this.sythua1 = this.add.sprite(200, 400, 'reptiliano1').setInteractive();
		this.sythua1.name='sythua1';
		this.sythua1.setScale(4);
		this.physics.add.existing(this.sythua1, false);
		this.sythua1.body.setAllowGravity(true);
		this.sythua1.body.isStatic = false;
		this.sythua1.body.setBounce(.2);
		this.sythua1.body.setOffset(0,-2);
		this.sythua1.anims.play("reptiliano1_idle");

		//sythua2
        this.sythua2 = this.add.sprite(250, 400, 'reptiliano2').setInteractive();
		this.sythua2.name='sythua2';
		this.sythua2.setScale(4);
		this.physics.add.existing(this.sythua2, false);
		this.sythua2.body.setAllowGravity(true);
		this.sythua2.body.isStatic = false;
		this.sythua2.body.setBounce(.2);
		this.sythua2.body.setOffset(0,-2);
		this.sythua2.anims.play("reptiliano2_idle");

		//sythua3
        this.sythua3 = this.add.sprite(300, 400, 'reptiliano3').setInteractive();
		this.sythua3.name='sythua3';
		this.sythua3.setScale(4);
		this.physics.add.existing(this.sythua3, false);
		this.sythua3.body.setAllowGravity(true);
		this.sythua3.body.isStatic = false;
		this.sythua3.body.setBounce(.2);
		this.sythua3.body.setOffset(0,-2);
		this.sythua3.anims.play("reptiliano3_idle");
		
		//Rieles
		this.rieles = this.add.image(640, 515, 'rieles');
		//palanca derecha
		this.palancaD = this.add.image(430,473, 'palancaDerecha');
		this.palancaD.setScale(.5);
		this.palancaD.setVisible(0);
		//palanca Izquierda
		this.palancaI = this.add.image(430,473, 'palancaIzquierda');
		this.palancaI.setScale(.5);
		this.palancaI.setVisible(1);
		
		//Plataforma
		this.plataforma = this.add.image(430, 488, 'plataforma').setInteractive();//inicio x=430, fin x=850
		this.plataforma.name='plataforma';
		this.plataforma.setScale(1.7);
		this.physics.add.existing(this.plataforma, false);
		this.plataforma.body.setImmovable(true);
		this.plataforma.body.isStatic = true;
		this.plataforma.body.setAllowGravity(false);
		this.plataforma.body.setOffset(0,14);

		//Pantalla Fallaste(un personaje se te cayo)
		this.fallaste1 = this.add.image(640, 360, 'FallasteNL1');
		this.fallaste1.setVisible(0);
		//Pantalla Fallaste(hay conflicto entre personajes)
		this.fallaste2 = this.add.image(640, 360, 'FallasteNL2');
		this.fallaste2.setVisible(0);

		this.botonReintentar = this.add.image(640, 490, 'BotonReintentar').setInteractive();
		this.botonReintentar.name='reintentar';
		this.botonReintentar.setScale(.3);
		this.botonReintentar.setVisible(0);
		
		
    //pantalla de instrucciones
		this.PanIns = this.add.image(640, -300, 'PDINL');// 360
		
		setTimeout(() => {
			this.Entra = this.add.tween({ 
				targets: [this.PanIns], 
				duration: 1000,
				ease:'Bounce',
				y:360 
			});
		}, 1000);
		
		setTimeout(() => {
			this.Sale = this.add.tween({ 
				targets: [this.PanIns],
				duration:1000, 
				y:-360 
			});
		}, 30000);

        //-----------Coliciones
		this.physics.world.setBoundsCollision(true,true,true,false);
		this.jorge.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jorge, this.groundLayer);
		this.physics.add.collider(this.jorge, this.plataforma);
		this.physics.add.collider(this.sythua1, this.groundLayer);
		this.physics.add.collider(this.sythua1, this.plataforma);
		this.physics.add.collider(this.sythua2, this.groundLayer);
		this.physics.add.collider(this.sythua2, this.plataforma);
		this.physics.add.collider(this.sythua3, this.groundLayer);
		this.physics.add.collider(this.sythua3, this.plataforma);
		this.physics.add.collider(this.isabella, this.groundLayer);
		this.physics.add.collider(this.isabella, this.plataforma);
		this.physics.add.collider(this.anselmo, this.groundLayer);
		this.physics.add.collider(this.anselmo, this.plataforma);
		/*this.physics.add.collider(this.jorge, this.plataforma, () => { 
			//this.plataforma.body.setVelocityY(-200);
			//this.plataforma.body.setAccelerationY(0);
			//this.jorge.body.setAccelerationY(0);
			//this.jorge.body.setVelocityY(0);
			this.jorge.body.setAllowGravity(false);
			console.log("entra a la plataforma");
		});*/

		//------------------timeline Izquierda
		//se encuentra en la izquierda
		//------------------Codigo alternativo(no camina bien)
		/*
		this.timelineRep1walk1 = this.tweens.timeline({
			targets: [this.sythua1],
			paused: true,
			tweens: [
			  {
				paused: true,
				x: 350,
				duration: 1500,
				onStart: () => { 
					console.log("entra en el primer timeline de la izquierda");
					this.sythua1.anims.play("reptiliano1_walk"); 
				},
				onRepeat: () => { this.sythua1.anims.play("reptiliano1_walk"); },
				onYoyo: () => { 
					this.sythua1.anims.play("reptiliano1_walk");
					console.log('Yoyo del tween'); }
			  },
			  {
				paused: true,
				y: 380,
				x: 450,
				duration: 300,
				onStart: () => { 
					this.sythua1.anims.play("reptiliano1_j_idle"); 
				},
				onComplete: () => {
					this.sythua1.anims.play("reptiliano1_idle");
					
				}
			  }
			],
		  });

		  */
		//-------------------------------------------------------------------------Reptiliano1--
		//--se encuentra en la izquierda
		this.timelineRep1walk1= this.tweens.createTimeline({
			onStart: () => {
				this.sythua1.anims.play("reptiliano1_walk");
				this.rep1_pasos.play();
			},
			onComplete: () => {
				this.timelineRep1jump1.play();
				this.tweens.makeActive(this.timelineRep1jump1);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
				this.rep1_pasos.pause();
			}
		});
		this.timelineRep1walk1.add({ 
			targets: [this.sythua1],
			paused: true,
			x: 350,
			duration: 1500
		});
		//timeline de reptilianos salta
		this.timelineRep1jump1 = this.tweens.createTimeline({
			onStart: () => {
				this.sythua1.anims.play("reptiliano1_j_idle");
				this.rep1_saltar.play();
			},
			onComplete: () => {
				this.sythua1.anims.play("reptiliano1_idle");
			}
		});
		this.timelineRep1jump1.add({ 
			targets: [this.sythua1],
			paused: true,
			y: 380,
			x: 450,
			duration: 300,
		});
		 

		//--Se encuentra en la plataforma izquierda
		this.timelineRep1jump2 = this.tweens.createTimeline({
			onStart: () => { 
				this.sythua1.flipX = true;
				this.sythua1.anims.play("reptiliano1_j_idle"); 
				this.rep1_saltar.play();
			},
			onComplete: () => {
				this.timelineRep1walk2.play();
				this.tweens.makeActive(this.timelineRep1walk2);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep1jump2.add({ 
			targets: [this.sythua1],
			paused: true,
			y: 380,
			x: 350,
			duration: 300,
		});
		//camina para volver a su lugar de inicio
		this.timelineRep1walk2= this.tweens.createTimeline({
			onStart: () => {
				this.rep1_pasos.play();
				this.sythua1.anims.play("reptiliano1_walk");},
			onComplete: () => {
				this.sythua1.anims.play("reptiliano1_idle");
				this.sythua1.flipX = false;
				this.rep1_pasos.pause();
			}
		});
		this.timelineRep1walk2.add({ 
			targets: [this.sythua1],
			paused: true,
			x: 200,
			duration: 1500

		});

		//------------------timeline Derecha

		//Se encuentra en la plataforma derecha 
		this.timelineRep1jump3 = this.tweens.createTimeline({
			onStart: () => {
				this.rep1_saltar.play();
				this.sythua1.anims.play("reptiliano1_j_idle");
			},
			onComplete: () => {
				this.timelineRep1walk3.play();
				this.tweens.makeActive(this.timelineRep1walk3);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep1jump3.add({ 
			targets: [this.sythua1],
			paused: true,
			y: 380,
			x: 950,
			duration: 300,
		});
		//camina para la parte derecha
		this.timelineRep1walk3= this.tweens.createTimeline({
			onStart: () => {
				this.rep1_pasos.play();
				this.sythua1.anims.play("reptiliano1_walk");},
			onComplete: () => {
				this.rep1_pasos.pause();
				this.sythua1.anims.play("reptiliano1_idle");}
		});
		this.timelineRep1walk3.add({ 
			targets: [this.sythua1],
			paused: true,
			x: 1050,
			duration: 1500

		});

		//--regresa a la plataforma derecha
		this.timelineRep1walk4= this.tweens.createTimeline({
			onStart: () => {
				this.rep1_pasos.play(); 
				this.sythua1.anims.play("reptiliano1_walk"); 
				this.sythua1.flipX = true;
			},
			onComplete: () => {
				this.rep1_pasos.pause();
				this.timelineRep1jump4.play();
				this.tweens.makeActive(this.timelineRep1jump4);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep1walk4.add({ 
			targets: [this.sythua1],
			paused: true,
			x: 950,
			duration: 1500
		});
		//salta a la plataforma derecha
		this.timelineRep1jump4 = this.tweens.createTimeline({
			onStart: () => { 
				this.rep1_saltar.play();
				this.sythua1.anims.play("reptiliano1_j_idle"); 
			},
			onComplete: () => {
				this.sythua1.anims.play("reptiliano1_idle");
				this.sythua1.flipX = false;
			}
		});
		this.timelineRep1jump4.add({ 
			targets: [this.sythua1],
			paused: true,
			y: 380,
			x: 830,
			duration: 300,
		});
		//-------------------------------------------------------------------------Reptiliano2--
		//--se encuentra en la izquierda
		this.timelineRep2walk1= this.tweens.createTimeline({
			onStart: () => {
				this.rep2_pasos.play();
				this.sythua2.anims.play("reptiliano2_walk");},
			onComplete: () => {
				this.rep2_pasos.pause();
				this.timelineRep2jump1.play();
				this.tweens.makeActive(this.timelineRep2jump1);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep2walk1.add({ 
			targets: [this.sythua2],
			paused: true,
			x: 350,
			duration: 1500
		});
		//timeline de reptilianos salta
		this.timelineRep2jump1 = this.tweens.createTimeline({
			onStart: () => {
				this.rep2_saltar.play();
				this.sythua2.anims.play("reptiliano2_jump");},
			onComplete: () => {this.sythua2.anims.play("reptiliano2_idle");}
		});
		this.timelineRep2jump1.add({ 
			targets: [this.sythua2],
			paused: true,
			y: 380,
			x: 455,
			duration: 300,
		});

		//--Se encuentra en la plataforma izquierda
		this.timelineRep2jump2 = this.tweens.createTimeline({
			onStart: () => {
				this.rep2_saltar.play(); 
				this.sythua2.flipX = true;
				this.sythua2.anims.play("reptiliano2_jump"); 
			},
			onComplete: () => {
				this.timelineRep2walk2.play();
				this.tweens.makeActive(this.timelineRep2walk2);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep2jump2.add({ 
			targets: [this.sythua2],
			paused: true,
			y: 380,
			x: 350,
			duration: 300,
		});
		//camina para volver a su lugar de inicio
		this.timelineRep2walk2= this.tweens.createTimeline({
			onStart: () => {
				this.rep2_pasos.play();
				this.sythua2.anims.play("reptiliano2_walk");},
			onComplete: () => {
				this.rep2_pasos.pause();
				this.sythua2.anims.play("reptiliano2_idle");
				this.sythua2.flipX = false;
			}
		});
		this.timelineRep2walk2.add({ 
			targets: [this.sythua2],
			paused: true,
			x: 250,
			duration: 1500

		});
		//------------------timeline Derecha

		//--Se encuentra en la plataforma derecha 
		this.timelineRep2jump3 = this.tweens.createTimeline({
			onStart: () => {
				this.rep2_saltar.play();
				this.sythua2.anims.play("reptiliano2_jump");},
			onComplete: () => {
				this.timelineRep2walk3.play();
				this.tweens.makeActive(this.timelineRep2walk3);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep2jump3.add({ 
			targets: [this.sythua2],
			paused: true,
			y: 380,
			x: 950,
			duration: 300,
		});
		//camina para la parte derecha
		this.timelineRep2walk3= this.tweens.createTimeline({
			onStart: () => {
				this.rep2_pasos.play();
				this.sythua2.anims.play("reptiliano2_walk");},
			onComplete: () => {
				this.rep2_pasos.pause();
				this.sythua2.anims.play("reptiliano2_idle");}
		});
		this.timelineRep2walk3.add({ 
			targets: [this.sythua2],
			paused: true,
			x: 1000,
			duration: 1500

		});

		//--regresa a la plataforma derecha
		this.timelineRep2walk4= this.tweens.createTimeline({
			onStart: () => {
				this.rep2_pasos.play(); 
				this.sythua2.anims.play("reptiliano2_walk"); 
				this.sythua2.flipX = true;
			},
			onComplete: () => {
				this.rep2_pasos.pause();
				this.timelineRep2jump4.play();
				this.tweens.makeActive(this.timelineRep2jump4);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep2walk4.add({ 
			targets: [this.sythua2],
			paused: true,
			x: 950,
			duration: 1500
		});
		//salta a la plataforma derecha
		this.timelineRep2jump4 = this.tweens.createTimeline({
			onStart: () => { 
				this.rep2_saltar.play();
				this.sythua2.anims.play("reptiliano2_jump"); 
			},
			onComplete: () => {
				this.sythua2.anims.play("reptiliano2_idle");
				this.sythua2.flipX = false;
			}
		});
		this.timelineRep2jump4.add({ 
			targets: [this.sythua2],
			paused: true,
			y: 380,
			x: 810,
			duration: 300,
		});

		//-------------------------------------------------------------------------Reptiliano3--
		//--se encuentra en la izquierda
		this.timelineRep3walk1= this.tweens.createTimeline({
			onStart: () => {
				this.rep3_pasos.play();
				this.sythua3.anims.play("reptiliano3_walk");},
			onComplete: () => {
				this.rep3_pasos.pause();
				this.timelineRep3jump1.play();
				this.tweens.makeActive(this.timelineRep3jump1);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep3walk1.add({ 
			targets: [this.sythua3],
			paused: true,
			x: 350,
			duration: 1500
		});
		//timeline de reptilianos salta
		this.timelineRep3jump1 = this.tweens.createTimeline({
			onStart: () => {
				this.rep3_saltar.play();
				this.sythua3.anims.play("reptiliano3_jump");},
			onComplete: () => {this.sythua3.anims.play("reptiliano3_idle");}
		});
		this.timelineRep3jump1.add({ 
			targets: [this.sythua3],
			paused: true,
			y: 380,
			x: 460,
			duration: 300,
		});

		//--Se encuentra en la plataforma izquierda
		this.timelineRep3jump2 = this.tweens.createTimeline({
			onStart: () => {
				this.rep3_saltar.play(); 
				this.sythua3.flipX = true;
				this.sythua3.anims.play("reptiliano3_jump"); 
			},
			onComplete: () => {
				this.timelineRep3walk2.play();
				this.tweens.makeActive(this.timelineRep3walk2);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep3jump2.add({ 
			targets: [this.sythua3],
			paused: true,
			y: 380,
			x: 350,
			duration: 300,
		});
		//camina para volver a su lugar de inicio
		this.timelineRep3walk2= this.tweens.createTimeline({
			onStart: () => {
				this.rep3_pasos.play();
				this.sythua3.anims.play("reptiliano3_walk");},
			onComplete: () => {
				this.rep3_pasos.pause();
				this.sythua3.anims.play("reptiliano3_idle");
				this.sythua3.flipX = false;
			}
		});
		this.timelineRep3walk2.add({ 
			targets: [this.sythua3],
			paused: true,
			x: 300,
			duration: 1500

		});

		//------------------timeline Derecha

		//--Se encuentra en la plataforma derecha 
		this.timelineRep3jump3 = this.tweens.createTimeline({
			onStart: () => {
				this.rep3_saltar.play();
				this.sythua3.anims.play("reptiliano3_jump");},
			onComplete: () => {
				this.sythua3.anims.play("reptiliano3_idle");
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep3jump3.add({ 
			targets: [this.sythua3],
			paused: true,
			y: 380,
			x: 950,
			duration: 300,
		});
		
		//--salta a la plataforma derecha
		this.timelineRep3jump4 = this.tweens.createTimeline({
			onStart: () => { 
				this.rep3_saltar.play();
				this.sythua3.anims.play("reptiliano3_jump");
				this.sythua3.flipX = true; 
			},
			onComplete: () => {
				this.sythua3.anims.play("reptiliano3_idle");
				this.sythua3.flipX = false;
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineRep3jump4.add({ 
			targets: [this.sythua3],
			paused: true,
			y: 380,
			x: 800,
			duration: 300,
		});


		//-------------------------------------------------------------------------Isabella---
		//se encuentra en la izquierda
		this.timelineIsawalk1= this.tweens.createTimeline({
			onStart: () => {
				this.isa_pasos.play();
				this.isabella.anims.play("isabella_walk");},
			onComplete: () => {
				this.isa_pasos.pause();
				this.timelineIsajump1.play();
				this.tweens.makeActive(this.timelineIsajump1);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineIsawalk1.add({ 
			targets: [this.isabella],
			paused: true,
			x: 350,
			duration: 1500
		});
		//timeline de isabella salta
		this.timelineIsajump1 = this.tweens.createTimeline({
			onStart: () => {
				this.isa_saltar.play();
				this.isabella.anims.play("isabella_jump");},
			onComplete: () => {this.isabella.anims.play("isabella_idle");}
		});
		this.timelineIsajump1.add({ 
			targets: [this.isabella],
			paused: true,
			y: 380,
			x: 465,
			duration: 300,
		});

		//Se encuentra en la plataforma izquierda
		this.timelineIsajump2 = this.tweens.createTimeline({
			onStart: () => { 
				this.isa_saltar.play();
				this.isabella.flipX = true;
				this.isabella.anims.play("isabella_jump"); 
			},
			onComplete: () => {
				this.timelineIsawalk2.play();
				this.tweens.makeActive(this.timelineIsawalk2);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineIsajump2.add({ 
			targets: [this.isabella],
			paused: true,
			y: 380,
			x: 350,
			duration: 300,
		});
		//camina para volver a su lugar de inicio
		this.timelineIsawalk2= this.tweens.createTimeline({
			onStart: () => {
				this.isa_pasos.play();
				this.isabella.anims.play("isabella_walk");},
			onComplete: () => {
				this.isa_pasos.pause();
				this.isabella.anims.play("isabella_idle");
				this.isabella.flipX = false;
			}
		});
		this.timelineIsawalk2.add({ 
			targets: [this.isabella],
			paused: true,
			x: 150,
			duration: 1500

		});

		//--Se encuentra en la plataforma derecha 
		this.timelineIsajump3 = this.tweens.createTimeline({
			onStart: () => {
				this.isa_saltar.play();
				this.isabella.anims.play("isabella_jump");},
			onComplete: () => {
				this.timelineIsawalk3.play();
				this.tweens.makeActive(this.timelineIsawalk3);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineIsajump3.add({ 
			targets: [this.isabella],
			paused: true,
			y: 380,
			x: 950,
			duration: 300,
		});
		//camina para la parte derecha
		this.timelineIsawalk3= this.tweens.createTimeline({
			onStart: () => {
				this.isa_pasos.play();
				this.isabella.anims.play("isabella_walk");},
			onComplete: () => {
				this.isa_pasos.pause();
				this.isabella.anims.play("isabella_idle");}
		});
		this.timelineIsawalk3.add({ 
			targets: [this.isabella],
			paused: true,
			x: 1100,
			duration: 1500

		});

		//--regresa a la plataforma derecha
		this.timelineIsawalk4= this.tweens.createTimeline({
			onStart: () => { 
				this.isa_pasos.play();
				this.isabella.anims.play("isabella_walk"); 
				this.isabella.flipX = true;
			},
			onComplete: () => {
				this.isa_pasos.pause();
				this.timelineIsajump4.play();
				this.tweens.makeActive(this.timelineIsajump4);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineIsawalk4.add({ 
			targets: [this.isabella],
			paused: true,
			x: 950,
			duration: 1500
		});
		//salta a la plataforma derecha
		this.timelineIsajump4 = this.tweens.createTimeline({
			onStart: () => { 
				this.isa_saltar.play();
				this.isabella.anims.play("isabella_jump"); 
			},
			onComplete: () => {
				this.isabella.anims.play("isabella_idle");
				this.isabella.flipX = false;
			}
		});
		this.timelineIsajump4.add({ 
			targets: [this.isabella],
			paused: true,
			y: 380,
			x: 795,
			duration: 300,
		});

		//-------------------------------------------------------------------------Anselmo---
		//--se encuentra en la izquierda
		this.timelineAnswalk1= this.tweens.createTimeline({
			onStart: () => {
				this.ans_pasos.play();
				this.anselmo.anims.play("anselmo_walk");},
			onComplete: () => {
				this.ans_pasos.pause();
				this.timelineAnsjump1.play();
				this.tweens.makeActive(this.timelineAnsjump1);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineAnswalk1.add({ 
			targets: [this.anselmo],
			paused: true,
			x: 350,
			duration: 1500
		});
		//timeline de anselmo salta
		this.timelineAnsjump1 = this.tweens.createTimeline({
			onStart: () => {
				this.ans_saltar.play();
				this.anselmo.anims.play("anselmo_jump");},
			onComplete: () => {this.anselmo.anims.play("anselmo_idle");}
		});
		this.timelineAnsjump1.add({ 
			targets: [this.anselmo],
			paused: true,
			y: 380,
			x: 460,
			duration: 300,
		});

		//--Se encuentra en la plataforma izquierda
		this.timelineAnsjump2 = this.tweens.createTimeline({
			onStart: () => {
				this.ans_saltar.play(); 
				this.anselmo.flipX = true;
				this.anselmo.anims.play("anselmo_jump"); 
			},
			onComplete: () => {
				this.timelineAnswalk2.play();
				this.tweens.makeActive(this.timelineAnswalk2);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineAnsjump2.add({ 
			targets: [this.anselmo],
			paused: true,
			y: 380,
			x: 350,
			duration: 300,
		});
		//camina para volver a su lugar de inicio
		this.timelineAnswalk2= this.tweens.createTimeline({
			onStart: () => {
				this.ans_pasos.play();
				this.anselmo.anims.play("anselmo_walk");},
			onComplete: () => {
				this.ans_pasos.pause();
				this.anselmo.anims.play("anselmo_idle");
				this.anselmo.flipX = false;
			}
		});
		this.timelineAnswalk2.add({ 
			targets: [this.anselmo],
			paused: true,
			x: 100,
			duration: 1500

		});

		//--Se encuentra en la plataforma derecha 
		this.timelineAnsjump3 = this.tweens.createTimeline({
			onStart: () => {
				this.ans_saltar.play();
				this.anselmo.anims.play("anselmo_jump");},
			onComplete: () => {
				this.timelineAnswalk3.play();
				this.tweens.makeActive(this.timelineAnswalk3);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineAnsjump3.add({ 
			targets: [this.anselmo],
			paused: true,
			y: 380,
			x: 950,
			duration: 300,
		});
		//camina para la parte derecha
		this.timelineAnswalk3= this.tweens.createTimeline({
			onStart: () => {
				this.ans_pasos.play();
				this.anselmo.anims.play("anselmo_walk");},
			onComplete: () => {
				this.ans_pasos.pause();
				this.anselmo.anims.play("anselmo_idle");}
		});
		this.timelineAnswalk3.add({ 
			targets: [this.anselmo],
			paused: true,
			x: 1150,
			duration: 1500

		});

		//--regresa a la plataforma derecha
		this.timelineAnswalk4= this.tweens.createTimeline({
			onStart: () => { 
				this.ans_pasos.play();
				this.anselmo.anims.play("anselmo_walk"); 
				this.anselmo.flipX = true;
			},
			onComplete: () => {
				this.ans_pasos.pause();
				this.timelineAnsjump4.play();
				this.tweens.makeActive(this.timelineAnsjump4);
				this.jorgeS.setVisible(0);
				this.jorge.setVisible(1);
			}
		});
		this.timelineAnswalk4.add({ 
			targets: [this.anselmo],
			paused: true,
			x: 950,
			duration: 1500
		});
		//salta a la plataforma derecha
		this.timelineAnsjump4 = this.tweens.createTimeline({
			onStart: () => {
				this.ans_saltar.play(); 
				this.anselmo.anims.play("anselmo_jump"); 
			},
			onComplete: () => {
				this.anselmo.anims.play("anselmo_idle");
				this.anselmo.flipX = false;
			}
		});
		this.timelineAnsjump4.add({ 
			targets: [this.anselmo],
			paused: true,
			y: 380,
			x: 820,
			duration: 300,
		});


        // Anims
		function idle_anim(character){
			character.anims.play("jorge_down_idle");
		}
		function walk_left(character) {
			character.anims.play("jorge_left_walk");
		}
		function walk_right(character) {
			character.anims.play("jorge_right_walk");
		}
		function walk_up(character) {
			character.anims.play("jorge_up_walk");
		}
		function walk_down(character) {
			character.anims.play("jorge_down_walk");
		}
        //-----------Movimientos
        // Caminar a la izquierda
		this.cursor.left.on('down',()=>{
			walk_left(this.jorge);
			this.jorge_pasos.play();
		});
		this.cursor.left.on('up',()=>{
			if(this.cursor.up.isDown) {
				walk_up(this.jorge);
			} else {
				if(this.cursor.down.isDown) {
					walk_down(this.jorge);
				} else{
					if(this.cursor.right.isDown) {
						walk_right(this.jorge);
					} else {
						idle_anim(this.jorge);
						this.jorge_pasos.pause();
					}
				}
			} 
		});
    	// Caminar a la derecha
		this.cursor.right.on('down',()=>{
			walk_right(this.jorge);
			this.jorge_pasos.play();
		});
		this.cursor.right.on('up',()=>{
			if(this.cursor.up.isDown) {
				walk_up(this.jorge);
			} else {
				if(this.cursor.down.isDown){
					walk_down(this.jorge);
				} else {
					if(this.cursor.left.isDown) {
						walk_left(this.jorge);
					} else {
						idle_anim(this.jorge);
						this.jorge_pasos.pause();
					}
				}
			}
		});

		//pasa el raton
		this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => { 
            gameObject.setTint(0x9c9c9c); 
			if(gameObject.name == "reintentar"){
				this.botonReintentar.setScale(.4);
			 }
           
		}); 
		//quita el raton
		this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
			gameObject.clearTint();
			this.botonReintentar.setScale(.3);
			
		});

		//oprime los objetos interactivos
		this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject)=>{
            //oprime reintentar
			if(gameObject.name == "reintentar"){
		
				this.perdiste=0;
				this.banMovP=0;
				this.banPla=0;
				this.plataforma.x=430;
				this.plataforma.y=488;
				this.palancaI.x=430;
				this.palancaI.setVisible(1);
				this.palancaD.x=430;
				this.palancaD.setVisible(0);
				this.jorge.x=50;
				this.jorge.y=400;
				this.anselmo.x=100;
				this.anselmo.y=400;
				this.isabella.x=150;
				this.isabella.y=400;
				this.sythua1.x=200;
				this.sythua1.y=400;
				this.sythua2.x=250;
				this.sythua2.y=400;
				this.sythua3.x=300;
				this.sythua3.y=400;

				this.jorge.body.setVelocityY(0);
				this.anselmo.body.setVelocityY(0);
				this.isabella.body.setVelocityY(0);
				this.sythua1.body.setVelocityY(0);
				this.sythua2.body.setVelocityY(0);
				this.sythua3.body.setVelocityY(0);

				this.fallaste1.setVisible(0);
				this.fallaste2.setVisible(0);
				this.botonReintentar.setVisible(0);
			}
			//oprime plataforma
			//se encuentra en la izquierda
			if(gameObject.name == "plataforma" && this.banMovP==0 && this.banPla==0){
				if (this.banJor==1)this.ContPerSub+=1;
				if (this.banRep1==1)this.ContPerSub+=1;
				if (this.banRep2==1)this.ContPerSub+=1;
				if (this.banRep3==1)this.ContPerSub+=1;
				if (this.banIsa==1)this.ContPerSub+=1;
				if (this.banAns==1)this.ContPerSub+=1;


				if(this.ContPerSub<=0){
					console.log("no hay nadie para mover la palanca");
          this.sonidoAtascado.play();
				}else{
					if (this.ContPerSub>2){
						console.log("plataforma muy pesada para avanzar");
            this.sonidoAtascado.play();
						this.ContPerSub=0;
					}else{
						console.log("plataforma va hacia la derecha");
						this.sonidoPlataforma.play();
						this.banPla=1;
						this.banMovP=1;
						this.palancaD.setVisible(1);
						this.palancaI.setVisible(0);
						this.ContPerSub=0;
					}
				}

				//evalua personajes a la izquierda
				if (this.ban2Jor==1)this.contPerIzq+=1;
				if (this.ban2Isa==1)this.contPerIzq+=1;
				if (this.ban2Ans==1)this.contPerIzq+=1;
				

				if (this.ban2Rep1==1)this.contRepIzq+=1;
				if (this.ban2Rep2==1)this.contRepIzq+=1;
				if (this.ban2Rep3==1)this.contRepIzq+=1;
				

				if(this.contRepIzq>this.contPerIzq  && this.contPerIzq!=0){
					console.log("Los reptilianos ya se madrearon en la izquierda a la persona xd");
          this.sonidoPlataforma.pause();
					this.fallaste2.setVisible(1);
					this.botonReintentar.setVisible(1);
					this.plataforma.y=-100;
					
				}
				//console.log("Personas en la izquierda: ",this.contPerIzq);
				this.contPerIzq=0;
				//console.log("Reptilianos en la izquierda: ",this.contRepIzq);
				this.contRepIzq=0;
				

			}else// se encuentra en la derecha 
			if(gameObject.name == "plataforma" && this.banPla==1 && this.banMovP==0){
		
				if (this.banJor==1)this.ContPerSub+=1;
				if (this.banRep1==1)this.ContPerSub+=1;
				if (this.banRep2==1)this.ContPerSub+=1;
				if (this.banRep3==1)this.ContPerSub+=1;
				if (this.banIsa==1)this.ContPerSub+=1;
				if (this.banAns==1)this.ContPerSub+=1;

				

				if(this.ContPerSub<=0){
					console.log("no hay nadie para mover la palanca");
          this.sonidoAtascado.play();
				}else{

					if (this.ContPerSub>2){
						console.log("plataforma muy pesada para avanzar");
            this.sonidoAtascado.play();
						this.ContPerSub=0;
					}else 
					{
						console.log("plataforma va hacia la izquierda");
						this.sonidoPlataforma.play();
						this.banPla=0;
						this.banMovP=1;
						this.palancaD.setVisible(0);
						this.palancaI.setVisible(1);
						this.ContPerSub=0;
					}

				}

				//evalua personajes a la derecha
				if (this.ban3Jor==1)this.contPerDer+=1;
				if (this.ban3Isa==1)this.contPerDer+=1;
				if (this.ban3Ans==1)this.contPerDer+=1;
				

				if (this.ban3Rep1==1)this.contRepDer+=1;
				if (this.ban3Rep2==1)this.contRepDer+=1;
				if (this.ban3Rep3==1)this.contRepDer+=1;
				

				if(this.contRepDer>this.contPerDer && this.contPerDer!=0){
					this.fallaste2.setVisible(1);
					this.botonReintentar.setVisible(1);
					this.plataforma.y=-100;
          this.sonidoPlataforma.pause();
					console.log("Los reptilianos ya se madrearon en la derecha a la persona xd");
				}
				//console.log("Personas en la Derecha: ",this.contPerDer);
				this.contPerDer=0;
				//console.log("Reptilianos en la Derecha: ",this.contRepDer);
				this.contRepDer=0;
				
			}
			//---reptiliano1---
			//oprime a reptimiano y se encuentra en la izquierda
			if(gameObject.name == "sythua1" && this.sythua1.x==200){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep1walk1.play();
				this.tweens.makeActive(this.timelineRep1walk1);
				
			}
			//oprime a reptimiano y se encuentra en la plataforma izquierda 
			if(gameObject.name == "sythua1" && this.sythua1.x>360 && this.sythua1.x<505){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep1jump2.play();
				this.tweens.makeActive(this.timelineRep1jump2);
			}

			//oprime a reptimiano y se encuentra en la plataforma derecha 
			if(gameObject.name == "sythua1" && this.sythua1.x>790 && this.sythua1.x<925){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep1jump3.play();
				this.tweens.makeActive(this.timelineRep1jump3);
			}

			//oprime a reptimiano y se encuentra en la derecha
			if(gameObject.name == "sythua1" && this.sythua1.x==1050){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep1walk4.play();
				this.tweens.makeActive(this.timelineRep1walk4);
			}
			//---reptiliano2---
			//oprime a reptimiano2 y se encuentra en la izquierda
			if(gameObject.name == "sythua2" && this.sythua2.x==250){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep2walk1.play();
				this.tweens.makeActive(this.timelineRep2walk1);
				
			}
			//oprime a reptimiano2 y se encuentra en la plataforma izquierda 
			if(gameObject.name == "sythua2" && this.sythua2.x>360 && this.sythua2.x<505){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep2jump2.play();
				this.tweens.makeActive(this.timelineRep2jump2);
			}
			//oprime a reptimiano2 y se encuentra en la plataforma derecha 
			if(gameObject.name == "sythua2" && this.sythua2.x>790 && this.sythua2.x<925){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep2jump3.play();
				this.tweens.makeActive(this.timelineRep2jump3);
			}
			//oprime a reptimiano2 y se encuentra en la derecha
			if(gameObject.name == "sythua2" && this.sythua2.x==1000){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep2walk4.play();
				this.tweens.makeActive(this.timelineRep2walk4);
			}
			//---reptiliano3---
			//oprime a reptimiano3 y se encuentra en la izquierda
			if(gameObject.name == "sythua3" && this.sythua3.x==300){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep3walk1.play();
				this.tweens.makeActive(this.timelineRep3walk1);
				
			}
			//oprime a reptimiano3 y se encuentra en la plataforma izquierda 
			if(gameObject.name == "sythua3" && this.sythua3.x>360 && this.sythua3.x<505){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep3jump2.play();
				this.tweens.makeActive(this.timelineRep3jump2);
			}
			//oprime a reptimiano3 y se encuentra en la plataforma derecha 
			if(gameObject.name == "sythua3" && this.sythua3.x>790 && this.sythua3.x<925){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep3jump3.play();
				this.tweens.makeActive(this.timelineRep3jump3);
			}
			//oprime a reptimiano3 y se encuentra en la derecha
			if(gameObject.name == "sythua3" && this.sythua3.x==950){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineRep3jump4.play();
				this.tweens.makeActive(this.timelineRep3jump4);
				
			}
			//---isabella---
			//oprime a isabella y se encuentra en la izquierda
			if(gameObject.name == "isabella" && this.isabella.x==150){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineIsawalk1.play();
				this.tweens.makeActive(this.timelineIsawalk1);
				
			}
			//oprime a isabella y se encuentra en la plataforma izquierda 
			if(gameObject.name == "isabella" && this.isabella.x>360 && this.isabella.x<505){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineIsajump2.play();
				this.tweens.makeActive(this.timelineIsajump2);
			}
			//oprime a isabella y se encuentra en la plataforma derecha 
			if(gameObject.name == "isabella" && this.isabella.x>790 && this.isabella.x<925){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineIsajump3.play();
				this.tweens.makeActive(this.timelineIsajump3);
			}
			//oprime a isabella y se encuentra en la derecha
			if(gameObject.name == "isabella" && this.isabella.x==1100){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineIsawalk4.play();
				this.tweens.makeActive(this.timelineIsawalk4);
			}

			//---anselmo---
			//oprime a anselmo y se encuentra en la izquierda
			if(gameObject.name == "anselmo" && this.anselmo.x==100){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineAnswalk1.play();
				this.tweens.makeActive(this.timelineAnswalk1);
				
			}
			//oprime a anselmo y se encuentra en la plataforma izquierda 
			if(gameObject.name == "anselmo" && this.anselmo.x>360 && this.anselmo.x<505){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineAnsjump2.play();
				this.tweens.makeActive(this.timelineAnsjump2);
			}
			//oprime a anselmo y se encuentra en la plataforma derecha 
			if(gameObject.name == "anselmo" && this.anselmo.x>790 && this.anselmo.x<925){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineAnsjump3.play();
				this.tweens.makeActive(this.timelineAnsjump3);
			}
			//oprime a anselmo y se encuentra en la derecha
			if(gameObject.name == "anselmo" && this.anselmo.x==1150){
				this.jorgeS.setVisible(1);
				this.jorge.setVisible(0);
				this.timelineAnswalk4.play();
				this.tweens.makeActive(this.timelineAnswalk4);
			}
            
        });

		// Salta 
		this.cursor.space.on('down', () => {
			this.jorge_saltar.play();
			this.jorgeJump.setVisible(1);
			this.jorge.setVisible(0);
			this.jorgeJump.anims.play("jorge_jump");
			this.jorgeJump.flipX = false;
			this.jorge.y-=40;
			if(this.cursor.right.isDown) {
				//this.jorge.anims.play('jump_side');
				this.jorgeJump.setVisible(1);
				this.jorge.setVisible(0);
				this.jorgeJump.anims.play("jorge_jump");
				this.jorgeJump.flipX = false;
				this.jorgeS.flipX=false;
				//this.jorge.anims.play('jorge_right_idle');
			} else if(this.cursor.left.isDown) {
				//this.jorge.anims.play('jump_side');
				this.jorgeJump.setVisible(1);
				this.jorge.setVisible(0);
				this.jorgeJump.flipX = true;
				this.jorgeS.flipX=true;
				this.jorgeJump.anims.play("jorge_jump");
				
				//this.jorge.anims.play('jorge_left_idle');
			}
			
		});
		
		this.cursor.space.on('up', () => {
			/*this.physics.world.colliders.add(this.colliders);
			this.overlaps = this.physics.add.overlap(this.gameObjects);*/
			this.jorge.flipX = false;
			this.jorge_saltar.pause();
			this.jorgeJump.setVisible(0);
			this.jorge.setVisible(1);
			
			if(this.cursor.left.isDown){
				walk_left(this.jorge);
			}else{
				if(this.cursor.right.isDown){
					walk_right(this.jorge);
				}else
					idle_anim(this.jorge);

			}
		});
	
		

       
    } 

    update(time, delta) { 
		this.jorgeJump.x=this.jorge.x;
		this.jorgeJump.y=this.jorge.y-23;
		this.jorgeS.x=this.jorge.x;
		this.jorgeS.y=this.jorge.y;
		if (this.jorgeS.x<395) this.jorgeS.flipX=false;
		else this.jorgeS.flipX=true;
		
        //---Movimientos del personaje
        this.jorge.body.setVelocityX(0);

        if (this.cursor.left.isDown){
            this.jorge.body.setVelocityX(-this.velocidad);
        }else if(this.cursor.right.isDown){
            this.jorge.body.setVelocityX(this.velocidad);
        }
		//---Movimientos de la plataforma
		//va a la derecha
		if(this.banPla==1 && this.plataforma.x>=430 && this.plataforma.x<=850 && this.banMovP==1){
			this.plataforma.x+=2;
			this.palancaD.x+=2;
			this.palancaI.x+=2;
			//se mueve reptiliano1 con plataforma derecha
			if (this.sythua1.x>365 && this.sythua1.x<910) {
				this.sythua1.x+=2;
			}
			//se mueve reptiliano2 con plataforma derecha
			if (this.sythua2.x>365 && this.sythua2.x<910) {
				this.sythua2.x+=2;
			}
			//se mueve reptiliano3 con plataforma derecha
			if (this.sythua3.x>365 && this.sythua3.x<910) {
				this.sythua3.x+=2;
			}
			//se mueve jorge con plataforma
			if (this.jorge.x>=365 && this.jorge.x<910) {
				this.jorge.x+=2;
			}
			//se mueve isabella con plataforma
			if (this.isabella.x>=365 && this.isabella.x<910) {
				this.isabella.x+=2;
			}
			//se mueve anselmo con plataforma
			if (this.anselmo.x>=365 && this.anselmo.x<910) {
				this.anselmo.x+=2;
			}
			if(this.plataforma.x==850){
				this.banMovP=0;
				this.sonidoPlataforma.pause();
			}
		}
		//va a la izquierda
		if(this.banPla==0 && this.plataforma.x<=850 && this.plataforma.x>=430 && this.banMovP==1){
			this.plataforma.x-=2;
			this.palancaD.x-=2;
			this.palancaI.x-=2;
			//se mueve reptiliano1 con plataforma
			if (this.sythua1.x<=910 && this.sythua1.x>=365 ) {
				this.sythua1.x-=2;
			}
			//se mueve reptiliano2 con plataforma
			if (this.sythua2.x<=910 && this.sythua2.x>=365 ) {
				this.sythua2.x-=2;
			}
			//se mueve reptiliano3 con plataforma
			if (this.sythua3.x<=910 && this.sythua3.x>=365 ) {
				this.sythua3.x-=2;
			}
			//se mueve jorge con plataforma
			if (this.jorge.x<=910 && this.jorge.x>=365 ) {
				this.jorge.x-=2;
			}
			//se mueve isabella con plataforma
			if (this.isabella.x<=910 && this.isabella.x>=365 ) {
				this.isabella.x-=2;
			}
			//se mueve anselmo con plataforma
			if (this.anselmo.x<=910 && this.anselmo.x>=365 ) {
				this.anselmo.x-=2;
			}
			if(this.plataforma.x==430){
				this.banMovP=0;
				this.sonidoPlataforma.pause();
			} 
		}

		//se encuentran en la plataforma
		if (this.sythua1.x>365 && this.sythua1.x<910 || this.sythua1.x<=910 && this.sythua1.x>=365) {
			this.banRep1=1;
		}else this.banRep1=0;
		if (this.sythua2.x>365 && this.sythua2.x<910 || this.sythua2.x<=910 && this.sythua2.x>=365) {
			this.banRep2=1;
		}else this.banRep2=0;
		if (this.sythua3.x>365 && this.sythua3.x<910 || this.sythua3.x<=910 && this.sythua3.x>=365) {
			this.banRep3=1;
		}else this.banRep3=0;  
		if (this.jorge.x>=365 && this.jorge.x<910 || this.jorge.x<=910 && this.jorge.x>=365 ) {
			this.banJor=1;
		}else this.banJor=0;  
		if (this.isabella.x>=365 && this.isabella.x<910 || this.isabella.x<=910 && this.isabella.x>=365 ) {
			this.banIsa=1;
		}else this.banIsa=0;
		if (this.anselmo.x>=365 && this.anselmo.x<910 || this.anselmo.x<=910 && this.anselmo.x>=365 ) {
			this.banAns=1;
		}else this.banAns=0; 
		
		//se encuentran en la parte izquierda
		
		if (this.sythua1.x<365) {
			this.ban2Rep1=1;
		}else this.ban2Rep1=0;
		if (this.sythua2.x<365) {
			this.ban2Rep2=1;
		}else this.ban2Rep2=0;
		if ( this.sythua3.x<365) {
			this.ban2Rep3=1;
		}else this.ban2Rep3=0;
		if ( this.jorge.x<365) {
			this.ban2Jor=1;
		}else this.ban2Jor=0;
		if ( this.isabella.x<365) {
			this.ban2Isa=1;
		}else this.ban2Isa=0;
		if ( this.anselmo.x<365) {
			this.ban2Ans=1;
		}else this.ban2Ans=0;

		//se encuentran en la parte derecha
		
		if (this.sythua1.x>910) {
			this.ban3Rep1=1;
		}else this.ban3Rep1=0;
		if (this.sythua2.x>910) {
			this.ban3Rep2=1;
		}else this.ban3Rep2=0;
		if ( this.sythua3.x>910) {
			this.ban3Rep3=1;
		}else this.ban3Rep3=0;
		if ( this.jorge.x>910) {
			this.ban3Jor=1;
		}else this.ban3Jor=0;
		if ( this.isabella.x>910) {
			this.ban3Isa=1;
		}else this.ban3Isa=0;
		if ( this.anselmo.x>910) {
			this.ban3Ans=1;
		}else this.ban3Ans=0;

		//Paso nivel
		if(this.ganaste==0 &&this.ban3Rep1==1 && this.ban3Rep2==1 && this.ban3Rep3==1 && this.ban3Jor==1 && this.ban3Isa==1 && this.ban3Ans==1){
				console.log("Felicidades pasaste el nivel c:");
				this.ganaste=1;
                setTimeout(() => {
                    // Cambia a la siguiente escena
                    console.log("Pasa a la escena de JunglaS");
                    this.scene.start('JunglaS');
                    this.sonidoLava.stop();
                    this.jorge_pasos.pause();
                    this.jorge_saltar.pause();
                    this.scene.stop('LavaS');
                    
                }, 3000); 
		}
		//Perdio por caida de lava
		if (this.jorge.y>600 || this.sythua1.y>600 || this.sythua2.y>600 || this.sythua3.y>600 || this.anselmo.y>600 || this.isabella.y>600) {
			if (this.perdiste==0) {
        if (this.totalVidas == 1) {
					this.totalVidas -=2;	
				}
        //pierde vida
				this.totalVidas -=1;
				this.scene.stop('VidasP');
				this.scene.launch('VidasP', this.totalVidas);
				this.sonidoCaidaM.play();
				console.log("Alguien cayo en la lava");
				this.fallaste1.setVisible(1);
				this.botonReintentar.setVisible(1);
				this.perdiste=1;
			}
		}

      if(this.totalVidas<=0 && this.perdiste==1){
		
			//this.cameras.main.fadeOut(2000);
			this.perdiste=2;
			//this.BanMuert=2;
			//this.scene.pause('Cueva1S');
			this.sonidoLava.pause();
			setTimeout(() => { 
				this.scene.launch('Muerte');
				this.scene.bringToTop('Muerte');
			}, 3000);
		}
		
    } 
} 
export default LavaS;