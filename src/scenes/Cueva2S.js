class Cueva2S extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'Cueva2S' 
        }); 
    } 
	
    init(valor) { 
        console.log('Escena de nivel 2 de mina');
		this.parte = valor;
    } 

    preload() {
        this.load.path = './assets/Cueva2S/';
        this.load.tilemapTiledJSON('mapaCueva2', "cave_floor2_map.json");
		this.load.image(['recuadro', 'piedrota', 'juyoB', 'juyoY', 'juyoR']);
		this.load.image('blockDown', 'cave_floor2_blockDown.png');
		this.load.image('blockUp', 'cave_floor2_blockUp.png');
    	this.load.image('skeleton', 'skeleton.png');
      	this.load.audio('temblorP',['../Sound/temblorPeque.mp3']);
    }


    create() {
		// this.scene.stop('VidasP');
		// this.scene.start('VidasP', 3);

		// TileMap
		this.mapaCueva2 = this.make.tilemap({
			key: "mapaCueva2"
		});
		this.tileset = this.mapaCueva2.addTilesetImage("caveTiles", "caveTiles");
		this.tileset2 = this.mapaCueva2.addTilesetImage("caveStatuesTiles","caveStatuesTiles");

		this.groundLayer = this.mapaCueva2.createLayer("Ground", this.tileset, 0, 0);
		this.wallsLayer = this.mapaCueva2.createLayer("Walls", this.tileset, 0, 0);
		this.torchesLayer = this.mapaCueva2.createLayer("Torches", this.tileset2, 0, 0);
		this.wallOpenLayer = this.mapaCueva2.createLayer("WallOpen", this.tileset, 0, 0);
		this.wallOpenLayer.setAlpha(0);

		this.puertaElevador = this.add.image(1186, 320, 'puertaE').setScale(.2);
		
		// Sonidos
    	//temblor pequeño
		this.temP = this.sound.add('temblorP');
		this.temP.setVolume(1.2);
    	//pasos
		this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);
		
		// Música fondo
		this.musicaF = this.sound.add('musica_fondo');
		this.musicaF.loop = true;
		this.musicaF.play();

		// Personajes
		// Contenedor de Personajes
        const cont_personas = this.add.container(1186, 330).setAlpha(0);

		// Personajes / 1194, 390
		this.jorge = this.add.sprite(0, 0, 'jorge').setScale(3);
		this.jorge.anims.play("jorge_down_idle");
		// Isabella izquierda / 1216, 368
		this.isa = this.add.sprite(-20, -20, 'isabella').setScale(3);
		this.isa.anims.play("isabella_idle");
		// Anselmo derecha / 1178, 368
		this.chemo = this.add.sprite(20, -20, 'anselmo').setScale(3);
		this.chemo.anims.play("anselmo_idle");

        cont_personas.add([
            this.chemo,
            this.isa,
            this.jorge
        ]);
		
		// Sythua
		this.sythua = this.add.sprite(1300, 128, 'reptiliano1').setScale(3.6);
		this.sythua.anims.play('reptiliano1_idle');

		// Piedrota / 288
		this.piedrota = this.add.image(224, 448, 'piedrota').setScale(1.4);

      // Esqueleto de dinosaurio
		this.Esqueleto = this.add.image(300, 1175, 'skeleton').setScale(.7);
		this.Esqueleto.angle=45;

		// Contenedor de juyos / 384
		const cont_juyos = this.add.container(332, 448);

		// Juyos
		this.juyo1 = this.add.image(-12, 0, 'juyoR').setScale(0.8);
		this.juyo2 = this.add.image(12, -10, 'juyoB').setScale(0.8);
		this.juyo3 = this.add.image(12, 10, 'juyoY').setScale(0.8);
		
        cont_juyos.add([
            this.juyo1,
            this.juyo2,
            this.juyo3
        ]);

		// Extras
		this.blockDown = this.add.image(0, 0, 'blockDown').setOrigin(0,0);
		this.blockUp = this.add.image(0, 0, 'blockUp').setOrigin(0,0);
		this.recuadro = this.add.image(0, 0, 'recuadro').setOrigin(0,0).setVisible(false);
		
		// Camara
		this.cameras.main.setBounds(0,0,1280,1344,false);
		this.cameras.main.startFollow(cont_personas);

		// ----- TWEENS -----

		// quitar block
		this.timelineUnblockDown = this.tweens.timeline({
			targets: [this.blockDown],
			paused: true,
			loop: 0,
			tweens: {
				alpha: 0,
				duration: 500,
				onComplete: () => {
					this.blockDown.destroy();
				}
			}
		});
		this.timelineUnblockUp = this.tweens.timeline({
			targets: [this.blockUp],
			paused: true,
			loop: 0,
			tweens: {
				alpha: 0,
				duration: 500,
				onComplete: () => {
					this.blockUp.destroy();
				}
			}
		});
		this.timelineOpenWall = this.tweens.timeline({
			targets: [this.wallOpenLayer],
			paused: true,
			loop: 0,
			tweens: {
				alpha: 1,
				duration: 5000
			}
		});

		// Toda la historia
		this.timelineHistoria1 = this.tweens.timeline({
			targets: [cont_personas],
			paused: true,
			loop: 0,
			tweens: [
				{ // salen de elevador
					y: 380,
					alpha: 1
				},
				{ // baja desde elevador
					onStart: () => {
						this.jorge.anims.play("jorge_down_walk");
						this.chemo.anims.play("anselmo_down");
						this.chemo.setFlipX(false);
						this.isa.setFlipX(false);
						this.isa.anims.play("isabella_down");
						this.jorge_pasos.play();
					},
					y: 800,
					duration: 2800,
				},
				{ // se coloca en borde
					onStart: () => {
						this.jorge.anims.play("jorge_left_walk");
						this.chemo.setFlipX(true);
						this.chemo.anims.play("anselmo_walk");
						this.isa.setFlipX(true);
						this.isa.anims.play("isabella_walk");
					},
					x: 976,
					duration: 1200,
					onComplete: () => {
						this.jorge_pasos.stop();
						this.jorge.anims.play("jorge_down_idle");
						this.chemo.setFlipX(false);
						this.chemo.anims.play("anselmo_idle");
						this.isa.setFlipX(false);
						this.isa.anims.play("isabella_idle");
					}
				},
				{ // habla en borde
					onStart: () => {
						// launch dialogos y pausar escena tweens
						this.scene.launch('Dialogos', [21, 21]);
						this.scene.pause('Cueva2S');
						console.log("J: No se acerquen mucho al borde, se ve muy inestable.");
					},
					alpha: 1,
					duration: 1000
				},
				{ // camina hacia pasillo abajo
					onStart: () => {
						this.jorge.anims.play("jorge_left_walk");
						this.chemo.setFlipX(true);
						this.chemo.anims.play("anselmo_walk");
						this.isa.setFlipX(true);
						this.isa.anims.play("isabella_walk");
						this.jorge_pasos.play();
					},
					x: 512,
					duration: 3300
				},
				{ // entra en cuarto abajo
					onStart: () => {
						this.timelineUnblockDown.play();
						this.jorge.anims.play("jorge_down_walk");
						this.chemo.setFlipX(false);
						this.chemo.anims.play("anselmo_down");
						this.isa.setFlipX(false);
						this.isa.anims.play("isabella_down");
					},
					y: 1000,
					duration: 1000,
					onComplete: () => {
						this.jorge_pasos.stop();
						this.jorge.anims.play("jorge_down_idle");
						this.chemo.anims.play("anselmo_idle");
						this.isa.anims.play("isabella_idle");
					}
				},
				{ // habla en cuarto abajo
					onStart: () => {
						// launch dialogos y pausar escena tweens
						// desde: 
						console.log("I: Eso es...");
						// hasta:
						console.log("C: ¿Cómo llegó un esqueleto de dinosaurio aquí?");
						this.scene.launch('Dialogos', [22, 24]);
						this.scene.pause('Cueva2S');
						
					},
					alpha: 1,
					duration: 1000
				},
				{ // baja tantito
					y: 1020,
					duration: 1000,
				},
				{ // habla en cuarto abajo
					onStart: () => {
						// launch dialogos y pausar escena tweens
						console.log("I: Más importante; está intacto, y parece ser reciente...");
						this.scene.launch('Dialogos', [24, 24]);
						this.scene.pause('Cueva2S');
					},
					alpha: 1,
					duration: 1000
				},
				{ // pausa dramatica
					alpha: 1,
					duration: 1000,
				},
				{ // tiembla y ellos se ven
					onStart: () => {
            			this.temP.play();
						this.cameras.main.shake(500, 0.003);
					},
					y: 988,
					duration: 1000,
					onComplete: () => {
						this.jorge.anims.play('jorge_up_idle');
						this.chemo.anims.play('anselmo_idle_left');
						this.isa.anims.play('isabella_idle_right');
						this.isa.anims.stop();
					}
				},
				{ // pausa dramatica
					alpha: 1,
					duration: 1000,
				},
				{ // caminan arriba desde abajo
					onStart: () => {
            			this.temP.play();
						this.cameras.main.shake(500, 0.003);
						this.jorge.anims.play('jorge_up_walk');
						this.chemo.anims.play('anselmo_up');
						this.isa.anims.play('isabella_up');
						this.jorge_pasos.play();
					},
					y: 800,
					duration: 2000
				},
				{ // caminan izquierda pasillo arriba
					onStart: () => {
						this.jorge.anims.play('jorge_left_walk');
						this.chemo.anims.play("anselmo_walk_left");
						this.isa.anims.play("isabella_walk_left");
						this.cameras.main.shake(500, 0.003);
            			this.temP.play();
					},
					x: 288,
					duration: 2000, onComplete: () => {
						this.timelineH1_personas.play();
						this.timelineH1_piedra.play();
						this.timelineH1_juyos.play();
					}
				}
			]
		});

		this.timelineH1_personas = this.tweens.timeline({
			targets: [cont_personas], // 288, 800
			paused: true,
			loop: 0,
			tweens: [ // 0
				{ // entran al cuarto arriba
					onStart: () => {
						this.jorge.anims.play('jorge_up_walk');
						this.chemo.anims.play('anselmo_up');
						this.isa.anims.play('isabella_up');
						this.timelineUnblockUp.play();
					},
					y: 592,
					duration: 2000,
					onComplete: () => {
						this.jorge.anims.play('jorge_up_idle');
						this.chemo.anims.play('anselmo_idle_up');
						this.isa.anims.play('isabella_idle_up');
						this.jorge_pasos.stop();
					}
				}, // 2000
				{ // pausa
					alpha: 1,
					duration: 1600
				}, // 3600
				{ // entran tantito mas
					onStart: () => {
						this.jorge.anims.play('jorge_up_walk');
						this.chemo.anims.play('anselmo_up');
						this.isa.anims.play('isabella_up');
						this.jorge_pasos.play();
					},
					y: 560,
					duration: 400,
					onComplete: () => {
						this.jorge.anims.stop();
						this.chemo.anims.stop();
						this.isa.anims.stop();
						this.jorge_pasos.stop();
					}
				}, // 4000
				{ // pausa ven huir
					alpha: 1,
					duration: 4000
				}, // 8000
				{ // entran mas
					onStart: () => {
						this.jorge.anims.play('jorge_up_walk');
						this.chemo.anims.play('anselmo_up');
						this.isa.anims.play('isabella_up');
						this.jorge_pasos.play();
					},
					y: 448,
					duration: 1000,
					onComplete: () => {
						this.jorge.anims.play('jorge_right_walk');
						this.chemo.anims.play("anselmo_walk");
						this.isa.anims.play("isabella_walk");
						this.jorge.anims.stop();
						this.chemo.anims.stop();
						this.isa.anims.stop();
						this.jorge_pasos.stop();
					}
				}, // 9000
				{ // habla en cuarto arriba
					onStart: () => {
						// launch dialogos y pausar escena tweens
						console.log("I: No sé qué sea esa piedrota, pero no se ve muy amable…");
						this.scene.launch('Dialogos', [25, 25]);
						this.scene.pause('Cueva2S');
					},
					alpha: 1,
					duration: 1000
				}, // 10000
				{ // pausa piedra salta
					alpha: 1,
					duration: 800,
				}, // 10800
				{ // atras 1
					onStart: () => {
						this.jorge.anims.play('jorge_right_walk');
						this.chemo.anims.play("anselmo_walk");
						this.isa.anims.play("isabella_walk");
					},
					x: 256,
					duration: 800,
					onComplete: () => {
						this.jorge.anims.stop();
						this.chemo.anims.stop();
						this.isa.anims.stop();
					}
				}, // 11600
				{ // pausa
					alpha: 1,
					duration: 800,
				}, // 12400
				{ // atras 2
					onStart: () => {
						this.jorge.anims.play('jorge_right_walk');
						this.chemo.anims.play("anselmo_walk");
						this.isa.anims.play("isabella_walk");
					},
					x: 224,
					duration: 800,
					onComplete: () => {
						this.jorge.anims.stop();
						this.chemo.anims.stop();
						this.isa.anims.stop();
					}
				}, // 13200
				{ // pausa
					alpha: 1,
					duration: 800,
				}, // 14000
				{ // atras 3
					onStart: () => {
						this.jorge.anims.play('jorge_right_walk');
						this.chemo.anims.play("anselmo_walk");
						this.isa.anims.play("isabella_walk");
					},
					x: 192,
					duration: 800,
					onComplete: () => {
						this.jorge.anims.stop();
						this.chemo.anims.stop();
						this.isa.anims.stop();
					}
				}, // 14800
				{ // pausa dramatica
					alpha: 1,
					duration: 1200,
				}, // 16000
				{ // pausa salen juyos
					alpha: 1,
					duration: 1400,
				}, // 17400
				{ // habla en cuarto arriba
					onStart: () => {
						// launch dialogos y pausar escena tweens
						console.log("J: Creo que podemos ayudarnos a enfrentarla.");
						this.scene.launch('Dialogos', [26, 26]);
						this.scene.pause('Cueva2S');
					},
					alpha: 1,
					duration: 1000
				}, // 18400
			]
		});


		this.timelineH1_juyos = this.tweens.timeline({
			targets: [cont_juyos], // 332, 448
			paused: true,
			loop: 0,
			tweens: [ // 0
				{ // salto 1 up
					x: 332,
					y: 442,
					duration: 400 
				},
				{ // salto 1 down
					x: 348,
					y: 448,
					duration: 400,
				}, // 800
				{ // pausa
					alpha: 1,
					duration: 400
				},
				{ // salto 2 up
					x: 364,
					y: 442,
					duration: 400 
				}, // 1600
				{ // salto 2 down
					x: 380,
					y: 448,
					duration: 400,
				},
				{ // pausa
					alpha: 1,
					duration: 400
				}, // 2400
				{ // salto 3 up
					x: 396,
					y: 442,
					duration: 400 
				},
				{ // salto 3 down
					x: 412,
					y: 448,
					duration: 400,
				}, // 3200
				{ // pausa ven humanos
					alpha: 1,
					duration: 800
				}, // 4000
				{ // salto 4 up
					y: 442,
					duration: 400 
				},
				{ // salto 4 down
					y: 448,
					duration: 400
				}, // 4800
				{ // derecha esconderse
					x: 496,
					duration: 500
				}, // 5300
				{ // arriba esconderse
					y: 320,
					duration: 700,
					onComplete: () => {
						cont_juyos.setVisible(false);
					}
				}, // 6000
				{ // pausa piedra acosa humanos
					alpha: 1,
					duration: 10000
				}, // 16000
				{ // salir abajo
					onStart: () => {
						cont_juyos.setVisible(true);
					},
					y: 448,
					duration: 700
				}, // 16700
				{ // salir izquierda
					onStart: () => {
						cont_juyos.setVisible(true);
					},
					x: 384,
					duration: 700
				}, // 17400
			]
		});
		
		this.timelineH1_piedra = this.tweens.timeline({
			targets: [this.piedrota], // 224, 448
			paused: true,
			loop: 0,
			tweens: [
				{ // salto 1 up
					onStart: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					},
					x: 240,
					y: 438,
					duration: 400 
				},
				{ // salto 1 down
					x: 256,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				},
				{ // pausa
					alpha: 1,
					duration: 400
				},
				{ // salto 2 up
					x: 272,
					y: 438,
					duration: 400 
				},
				{ // salto 2 down
					x: 288,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				},
				{ // pausa
					alpha: 1,
					duration: 400
				},
				{ // salto 3 up
					x: 304,
					y: 438,
					duration: 400 
				},
				{ // salto 3 down
					x: 320,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 3200
				{ // pausa ven humanos
					alpha: 1,
					duration: 2000
				}, // 5200
				{ // salto 4 up
					x: 336,
					y: 438,
					duration: 400 
				},
				{ // salto 4 down
					x: 352,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 6000
				{ // salto 5 up
					x: 368,
					y: 438,
					duration: 400 
				},
				{ // salto 5 down
					x: 384,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 6800
				{ // pausa se enoja
					alpha: 1,
					duration: 400
				}, // 7200
				{ // salto 6 up en el lugar
					y: 430,
					duration: 400 
				},
				{ // salto 6 down en el lugar
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.005);
					}
				}, // 8000
				{ // pausa personas hablan
					alpha: 1,
					duration: 2000
				}, // 10000
				{ // salto 7 up en el lugar
					y: 430,
					duration: 400 
				},
				{ // salto 7 down en el lugar
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.005);
					}
				}, // 10800
				{ // salto 8 up personas
					x: 368,
					y: 438,
					duration: 400 
				},
				{ // salto 8 down personas
					x: 352,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 11600
				{ // pausa personas
					alpha: 1,
					duration: 800
				}, // 12400
				{ // salto 9 up personas
					x: 336,
					y: 438,
					duration: 400 
				},
				{ // salto 9 down personas
					x: 320,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 13200
				{ // pausa personas
					alpha: 1,
					duration: 800
				}, // 14000
				{ // salto 10 up personas
					x: 304,
					y: 438,
					duration: 400 
				},
				{ // salto 10 down personas
					x: 288,
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.003);
					}
				}, // 14800
				{ // pausa salen juyos y personas hablan
					alpha: 1,
					duration: 3600
				}, // 18400
				{ // salto 11 up en el lugar
					y: 430,
					duration: 400 
				}, // 18800
				{ // salto 11 down en el lugar
					y: 448,
					duration: 400,
					onComplete: () => {
            			this.temP.play();
						this.cameras.main.shake(300, 0.005);
						console.log("FIN CUTSCENE 1");
				        setTimeout(() => {
				            // Cambia a la siguiente escena
				            console.log("Pasa a la escena de primer enfrentamiento con juyos");
				            this.scene.start('Juyos1S',this.totalVidas);
							// this.timelineH2_juyos.play();
				        }, 3000);
					}
				}, // 19200
			]
		});



		// ---------- PARTE 2 ----------
		
		this.timelineH2_piedrota = this.tweens.timeline({
			targets: [this.piedrota], // 288, 448
			paused: true,
			loop: 0,
			tweens: [
				{
					alpha: 0,
					duration: 3000
				},
			]
		});

		this.timelineH2_juyos = this.tweens.timeline({
			targets: [cont_juyos], // 384, 448
			paused: true,
			loop: 0,
			tweens: [
				{
					onStart: () => {
						this.timelineH2_piedrota.play();
					},
					alpha: 1,
					duration: 3000
				}, // 3000
				{ // salto 1 up
					y: 440,
					duration: 500 
				},
				{ // salto 1 down
					y: 448,
					duration: 500
				}, // 4000
				{ // salto 2 up
					y: 440,
					duration: 500 
				},
				{ // salto 2 down
					y: 448,
					duration: 500
				}, // 5000
				{ // derecha esconderse
					x: 484,
					duration: 1000
				}, // 6000
				{ // arriba esconderse
					y: 308,
					duration: 1000,
					onComplete: () => {
						cont_juyos.setAlpha(0);
					}
				}, // 7000
				{ // pausa trabajan
					alpha: 0,
					duration: 1500
				}, // 8500
				{ // abren pared
					onStart: () => {
						this.cameras.main.shake(5000, 0.007)
						this.timelineOpenWall.play();
					},
					alpha: 1,
					duration: 5000
				}, // 13500
				{ // salto 3 up
					y: 300,
					duration: 500 
				},
				{ // salto 3 down
					y: 308,
					duration: 500
				}, // 14500
				{ // salto 4 up
					y: 300,
					duration: 500 
				},
				{ // salto 4 down
					y: 308,
					duration: 500
				}, // 15500
				{ // desaparecen
					y: 0,
					duration: 2500,
					onComplete: () => {
						cont_juyos.setAlpha(0);
						this.timelineH2_personas.play();
					}
				} // 17000
			]
		});

		this.timelineH2_personas = this.tweens.timeline({
			targets: [cont_personas], // 192, 448
			paused: true,
			loop: 0,
			tweens: [
				{ // 17000
					onStart: () => {
						this.jorge.anims.play("jorge_up_idle");
						this.isa.anims.play("isabella_idle");
						this.chemo.anims.play("anselmo_idle");
					},
					alpha: 1,
					duration: 1000
				}, // 18000
				{
					onStart: () => {
						this.jorge.anims.play("jorge_right_walk");
						this.isa.anims.play("isabella_walk");
						this.chemo.anims.play("anselmo_walk");
						this.jorge_pasos.play();
					},
					x: 484,
					duration: 2000,
					onComplete: () => {
						this.jorge.anims.play("jorge_up_idle");
						this.isa.anims.play("isabella_idle_up");
						this.chemo.anims.play("anselmo_idle_up");
						this.jorge_pasos.stop();
					},
				}, // 20000
				{ // dialogos
					onStart: () => {
						// launch dialogos y pausar escena tweens
						console.log("C: ¡El espía debe haber desaparecido así! Les dije que había visto algo.")
						console.log("J: Pero ¿quién era, y como sabía sobre esas piedritas?")
						console.log("I: Parece haber un pasillo aquí atrás, es probable que todo esté conectado.")
						console.log("C: Debemos recorrerlos, quizás encontremos al espía.")
						console.log("J: Vamos, necesitamos respuestas.")
						this.scene.launch('Dialogos', [27, 32]);
						this.scene.pause('Cueva2S');
					},
					alpha: 1,
					duration: 1000
				}, // 21000
				{ // entran a tunel
					onStart: () => {
						this.jorge.anims.play("jorge_up_walk");
						this.isa.anims.play("isabella_up");
						this.chemo.anims.play("anselmo_up");
						this.jorge_pasos.play();
					},
					y: 128,
					duration: 3000,
					onComplete: () => {
						this.timelineH2_sythua.play();
					},
				}, // 24000
				{ // derecha tunel
					onStart: () => {
						this.jorge.anims.play("jorge_right_walk");
						this.isa.anims.play("isabella_walk");
						this.chemo.anims.play("anselmo_walk");
					},
					x: 780,
					duration: 2000,
					onComplete: () => {
						this.jorge.anims.play('jorge_right_idle');
						this.chemo.anims.play("anselmo_idle_right");
						this.isa.anims.play("isabella_idle_right");
						this.jorge_pasos.stop();
					},
				}, // 26000
			]
		});

		this.timelineH2_sythua = this.tweens.timeline({
			targets: [this.sythua],
			paused: true,
			loop: 0,
			tweens: [
				{ // 24000
					onStart: () => {
						this.sythua.anims.play("reptiliano1_walk");
						this.sythua.setFlipX(true);
					},
					x: 890,
					duration: 2000,
					onComplete: () => {
						this.sythua.anims.play("reptiliano1_walk");
						this.sythua.anims.stop();
					},
				}, // 26000
				{ // dialogos
					onStart: () => {
						// launch dialogos y pausar escena tweens
						// desde: 
						console.log("S: ¡ALTO AHÍ! ¿Quiénes son ustedes?")
						// ... hasta:
						console.log("S: Está bien, les contaré lo que ha sucedido.")
						this.scene.launch('Dialogos', [32, 43]);
						this.scene.pause('Cueva2S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						console.log("FIN CUTSCENE 2");
				        setTimeout(() => {
				            // Cambia a la siguiente escena
				            console.log("Pasa a la escena de Base de reptilianos");
				            this.scene.start('BaseS',this.totalVidas);
				        }, 3000);
					}
				}, // 27000

			]
		});

		if(this.parte == 2){
				this.blockDown.setVisible(false);
				this.blockUp.setVisible(false);

				this.piedrota.setPosition(288, 448);
				
				cont_juyos.setPosition(384, 448);

				cont_personas.setPosition(192, 448);
				cont_personas.setAlpha(1);
				this.jorge.anims.play('jorge_right_idle');
				this.chemo.anims.play("anselmo_idle_right");
				this.isa.anims.play("isabella_idle_right");
		}

		setTimeout(() => {
			console.log('Empieza timeline')
			if(this.parte == 1){
				this.timelineHistoria1.play();
			}
			if(this.parte == 2){
				this.timelineH2_juyos.play();
				// this.scene.start('BaseS');
			}
		}, 1000);
    } 

    update(time, delta) { 

    } 
} 
export default Cueva2S;