class Cueva0S extends Phaser.Scene{
    constructor(){
        super({
            key: 'Cueva0S'
        });
    }

    init() {
        console.log('Escena cutscene nivel 1 de mina Cueva0S');
    }
    
    preload() {
        this.load.path = './assets/';
        
       	//Musica 
        this.load.audio('musica_fondo',['Sound/musicaF.mp3']);
        this.load.audio('pasos',['Sound/pasos.mp3']);
        this.load.audio('temblor3',['Sound/temblor3.mp3']);
        // Animaciones
		// Jorge
		this.load.atlas("jorge","anims/jorge.png","anims/jorge_atlas.json");
		this.load.animation("jorgeAnim","anims/jorge_anim.json");
        // Isabella
        this.load.atlas("isabella","anims/Isabella/isabella.png","anims/Isabella/isabella_atlas.json");
        this.load.animation("isabellaAnim","anims/Isabella/isabella_anim.json");
        // Anselmo
        this.load.atlas("anselmo","anims/Anselmo/anselmo.png","anims/Anselmo/anselmo_atlas.json");
        this.load.animation("anselmoAnim","anims/Anselmo/anselmo_anim.json");

        this.load.path = './assets/Cueva0S/';
		this.load.image(['Paredes', 'Piso', 'Bloqueo', 'ParedIzq', 'recuadro', 'sythua', 'sismografo2']);
    }

    create() {
        this.add.text(100,100,'Usted esta en Cueva0S');
		this.piso = this.add.image(0, 0, 'Piso').setOrigin(0,0);
		this.paredes = this.add.image(0, 0, 'Paredes').setOrigin(0,0);
		this.paredIzq = this.add.image(0, 512, 'ParedIzq').setOrigin(0,0).setDepth(1);
		this.block = this.add.image(0, 0, 'Bloqueo').setOrigin(0,0).setDepth(1);
        
		this.sismog = this.add.image(218, 333, 'sismografo2').setScale(0.5);

		this.recuadro = this.add.image(0, 0, 'recuadro').setOrigin(0,0).setDepth(1);
        this.recuadro.setVisible(false);

		// Sonidos	
		// Música fondo
		this.musicaF = this.sound.add('musica_fondo');
		this.musicaF.loop = true;
		this.musicaF.play();
      //Temblor3
        this.tem3 = this.sound.add('temblor3');
		this.tem3.setVolume(.2);
        // Pasos
		this.pasos = this.sound.add('pasos');
		this.pasos.loop = true;
		this.pasos.setVolume(.7);
		this.pasos2 = this.sound.add('pasos');
		this.pasos2.loop = true;
		this.pasos2.setVolume(.7);
        
		// Personajes
        // Jorge
		this.jorge = this.add.sprite(0, 576, 'jorge').setScale(3);
		this.jorge.anims.play("jorge_down_idle");
		// Isabella
        this.isa = this.add.sprite(0, 576, 'isabella').setScale(3);
		this.isa.anims.play("isabella_idle");
		// Anselmo
        this.chemo = this.add.sprite(0, 576, 'anselmo').setScale(3);
		this.chemo.anims.play("anselmo_idle");
        // Sythua
        this.sythua = this.add.image(745, 360, 'sythua').setScale(3);
        this.sythua.setTint(0x4e4e4e);
        this.sythua.setFlipX(true);

        
		// ---------- TWEENS ---------- () => 

		// quitar block
		this.timelineUnblock = this.tweens.timeline({
			targets: [this.block],
			paused: true,
			loop: 0,
			tweens: {
				alpha: 0,
				duration: 500,
				onComplete: () => {
					this.block.destroy();
				}
			}
		});

        // Jorge
        this.timelineJorge = this.tweens.timeline({
			targets: [this.jorge],
			paused: true,
			loop: 0,
            tweens: [
                { // entra a mina
                    onStart: () => {
                        this.jorge.anims.play('jorge_right_walk');
                        this.pasos.play();
                    },
                    x: 48,
                    duration: 500,
                    onComplete: () => {
                        this.timelineIsa.play();
                    }
                }, // 500
                { // camina derecha
                    x: 280,
                    duration: 2000
                }, // 2500
                { // sube hacia sismogg
                    onStart: () => {
                        this.jorge.anims.play('jorge_up_walk');
                    },
                    y: 278,
                    duration: 3400
                }, // 5900
                { // izq hacia sismogg
                    onStart: () => {
                        this.jorge.anims.play('jorge_left_walk');
                    },
                    x: 218,
                    duration: 600,
                    onComplete: () => {
                        this.jorge.anims.play('jorge_down_idle');
                    }
                }, // 6500
				{ // dar chance llegan
					alpha: 1,
					duration: 1000
				}, // 7500
                { // pausa dialogos
                    alpha: 1,
                    duration: 1000
                }, // 8500
                { // pausa chemo baja, ve huecos, sythua baja, chemo grita, sythua se esconde
                    alpha: 1,
                    duration: 11000
                }, // 19500
				{ // habla u ok bro
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("J: ¿Anselmo? ¿Qué pasó?");
                        this.scene.launch('Dialogos', [7, 7]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						// this.recuadro.setVisible(false);
					}
                }, // 20500
                { // pausa chemo corre hasta la mitad
                    alpha: 1,
                    duration: 500
                }, // 21000
                { // derecha poco chemo wtf
                    onStart: () => {
                        this.jorge.anims.play('jorge_right_walk');
                        this.pasos.play();
                    }, 
                    x: 300,
                    duration: 500
                }, // 21500
                { // baja chemo wtf
                    onStart: () => {
                        this.jorge.anims.play('jorge_down_walk');
                    },
                    y: 428,
                    duration: 1000,
                    onComplete: () => {
                        this.jorge.anims.play('jorge_down_idle');
                        this.pasos.stop();
                    }
                }, // 22500
                { // pausa chemo dice ora ora
                    alpha: 1,
                    duration: 3000
                }, // 25500
                { // ve a isa
                    onStart: () => {
                        this.jorge.anims.play('jorge_left_idle');
                    },
                    alpha: 1,
                    duration: 2000
                }, // 27500
                { // espera isa baja
                    onStart: () => {
                        this.jorge.anims.play('jorge_down_idle');
                    },
                    alpha: 1,
                    duration: 1000
                }, // 28500
                { // baja camina cuarto
                    onStart: () => {
                        this.jorge.anims.play('jorge_down_walk');
                    },
                    y: 576,
                    duration: 1000
                }, // 29500
                { // der camina cuarto
                    onStart: () => {
                        this.jorge.anims.play('jorge_right_walk');
                    },
                    x: 770,
                    duration: 3500
                }, // 33000
                { // arriba camina cuarto
                    onStart: () => {
                        this.jorge.anims.play('jorge_up_walk');
                    },
                    y: 220,
                    duration: 4000,
                    onComplete: () => {
                        this.jorge.anims.play('jorge_right_idle');
                        this.pasos.stop();
                    }
                }, // 37000
                { // esperar tantito animaciones
                    alpha: 1,
                    duration: 500
                }, // 37500
                { // pausa dialogos
                    alpha: 1,
                    duration: 1000
                }, // 38500
                { // pausa tiembla
                    alpha: 1,
                    duration: 4000
                }, // 42500
				{ // habla eso si
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("J: Eso sí lo tiene que haber detectado");
                        this.scene.launch('Dialogos', [13, 13]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						// this.recuadro.setVisible(false);
					}
                }, // 43500
                { // baja camina temblo
                    onStart: () => {
                        this.jorge.anims.play('jorge_down_walk');
                        this.pasos.play();
                    },
                    y: 576,
                    duration: 4000
                }, // 47500
                { // camina izq temblo
                    onStart: () => {
                        this.jorge.anims.play('jorge_left_walk');
                    },
                    x: 280,
                    duration: 4000
                }, // 51500
                { // sube hacia sismogg
                    onStart: () => {
                        this.jorge.anims.play('jorge_up_walk');
                    },
                    y: 278,
                    duration: 3400
                }, // 54900
                { // izq hacia sismogg
                    onStart: () => {
                        this.jorge.anims.play('jorge_left_walk');
                    },
                    x: 218,
                    duration: 600,
                    onComplete: () => {
                        this.jorge.anims.play('jorge_down_idle');
                    }
                }, // 55500
            ]
        });

        // Sythua
        this.timelineSythua = this.tweens.timeline({
			targets: [this.sythua],
			paused: true,
			loop: 0,
            tweens: [ // 8500
                { // baja y se asoma
                    y: 456,
                    duration: 2800
                }, // 11300
                { // chemo se asoma huecos
                    alpha: 1,
                    duration: 3200
                }, // 14500
                { // se asoma mas
                    onStart: () => {
                        this.pasos.play();
                        this.pasos.setRate(0.6);
                    },
                    x: 750,
                    y: 464,
                    duration: 2400,
                    onComplete: () => {
                        this.pasos.stop();
                        this.pasos.setRate(1);
                    },
                }, // 16900
                { // para pausar audio
                    alpha: 1,
                    duration: 100
                }, // 17000
                { // lo ven
                    alpha: 1,
                    duration: 1000
                }, // 18000
                { // salta up
                    y: 454,
                    duration: 400
                }, // 18400
                { // salta down
                    y: 462,
                    duration: 400
                }, // 18800
                { // se esconde
                    x: 777,
                    y: 360,
                    duration: 500
                }, // 19300
                {
                    alpha: 0,
                    duration: 100
                }
            ]
        });

        // Anselmo
        this.timelineChemo = this.tweens.timeline({
			targets: [this.chemo],
			paused: true,
			loop: 0,
            duration: 700,
            tweens: [ // 1000
                { // entra a mina
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                    },
                    x: 48,
                    duration: 500,
                }, // 1500
                { // derecha
                    x: 280,
                    duration: 2000,
                }, // 3500
                { // sube hacia sismogg
                    onStart: () => {
                        this.chemo.anims.play('anselmo_up');
                    },
                    y: 328,
                    duration: 2800
                }, // 6300
                { // izq se pega a sismogg
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 265,
                    duration: 200,
                    onComplete: () => {
                        this.chemo.anims.play('anselmo_idle_left');
                    },
                }, // 6500
				{ // dar chance llegan
					alpha: 1,
					duration: 1000
				}, // 7500
                { // pausa dialogos
                    alpha: 1,
                    duration: 1000
                }, // 8500
                { // abajo huecos, sythua aparece
                    onStart: () => {
                        this.timelineSythua.play();
                        this.chemo.anims.play('anselmo_down');
                        this.chemo.setFlipX(false);
                        this.pasos.play();
                    },
                    y: 576,
                    duration: 2000
                }, // 10500
                { // derecha huecos
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                    },
                    x: 460,
                    duration: 2000,
                    onComplete: () => {
                        this.chemo.anims.play('anselmo_walk');
                        this.chemo.anims.stop();
                        this.pasos.stop();
                    },
                }, // 12500
                { // se asoma izquierda
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 450,
                    duration: 500
                }, // 13000
                { // se asoma derecha
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                    },
                    x: 460,
                    duration: 500,
                    onComplete: () => {
                        this.chemo.anims.play('anselmo_idle_right');
                    },
                }, // 13500
				{ // habla ve huecos
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("C: Pues así muy conservado tampoco está, pero está aguantando.");
                        this.scene.launch('Dialogos', [5, 5]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						//this.recuadro.setVisible(false);
					}
                }, // 14500
                { // sythua baja mas
                    alpha: 1,
                    duration: 2500
                }, // 17000
				{ // habla who there
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("C: ¡EY! ¿QUIÉN ANDA AHÍ?");
                        this.scene.launch('Dialogos', [6, 6]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						// this.recuadro.setVisible(false);
					}
                }, // 18000
                { // sythua se esconde
                    alpha: 1,
                    duration: 1500
                }, // 19500
                { // jorge habla u ok bro
                    alpha: 1,
                    duration: 1000
                }, // 20500
                { // corre derecha
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                        this.pasos2.setRate(1.8);
                        this.pasos2.play();
                    },
                    x: 770,
                    duration: 1400,
                }, // 21900
                { // corre arriba
                    onStart: () => {
                        this.chemo.anims.play('anselmo_up');
                        this.timelineUnblock.play();
                    },
                    y: 192,
                    duration: 1400
                }, // 23300
                { // se asoma izquierda
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 750,
                    duration: 500
                }, // 23800
                { // se asoma derecha
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                    },
                    x: 790,
                    duration: 500,
					onComplete: () => {
                        this.chemo.anims.play('anselmo_idle_right');
                        this.pasos2.stop();
					}
                }, // 24300
                { // buffer pausar audio
                    alpha: 1,
                    duration: 200
                }, // 24500
				{ // habla ora ora
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("C: ¿Eh? ¿A dónde fue?");
                        this.scene.launch('Dialogos', [8, 8]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						// this.recuadro.setVisible(false);
					}
                }, // 25500
                { // se asoma izquierda
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk');
                        this.chemo.setFlipX(true);
                        this.pasos2.setRate(1.5);
                        this.pasos2.play();
                    },
                    x: 670,
                    y: 220,
                    duration: 500
                }, // 26000
                { // analiza
                    onStart: () => {
                        this.pasos2.stop();
                    },
                    alpha: 1,
                    duration: 2500 
                }, // 28500
                { // se asoma derecha
                    onStart: () => {
                        this.chemo.setFlipX(false);
                        this.pasos2.play();
                    },
                    x: 860,
                    y: 160,
                    duration: 500
                }, // 29000
                { // analiza
                    onStart: () => {
                        this.pasos2.stop();
                    },
                    alpha: 1,
                    duration: 2500
                }, // 31500
                { // se asoma izquierda
                    onStart: () => {
                        this.chemo.setFlipX(true);
                        this.pasos2.play();
                    },
                    x: 660,
                    y: 115,
                    duration: 500
                }, // 32000
                { // analiza
                    onStart: () => {
                        this.pasos2.stop();
                    },
                    alpha: 1,
                    duration: 2500 
                }, // 34500
                { // se asoma derecha
                    onStart: () => {
                        this.chemo.setFlipX(false);
                        this.pasos2.play();
                    },
                    x: 850,
                    y: 200,
                    duration: 500
                }, // 35000
                { // analiza
                    onStart: () => {
                        this.pasos2.stop();
                    },
                    alpha: 1,
                    duration: 2000, 
					onComplete: () => {
                        this.chemo.anims.play('anselmo_idle_left');
                        this.pasos2.stop();
                        this.pasos2.setRate(1);
					}
                }, // 37000
                { // esperar tantito animaciones
                    alpha: 1,
                    duration: 500
                }, // 37500
                { // pausa dialogos
                    alpha: 1,
                    duration: 1000
                }, // 38500
                { // tiembla y jorge habla
                    alpha: 1,
                    duration: 5000
                }, // 43500
                { // espera que salgan
                    alpha: 1,
                    duration: 1000
                }, // 43500
                { // izq salir cuarto
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 770,
                    duration: 500,
                }, // 81000
                { // baja temblo
                    onStart: () => {
                        this.chemo.anims.play('anselmo_down');
                        this.chemo.setFlipX(false);
                    },
                    y: 576,
                    duration: 4500
                }, // 85500
                {  // izq temblo
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 280,
                    duration: 4000,
                }, // 89500
                { // sube hacia sismogg
                    onStart: () => {
                        this.chemo.anims.play('anselmo_up');
                    },
                    y: 328,
                    duration: 2800
                }, // 92300
                { // izq se pega a sismogg
                    onStart: () => {
                        this.chemo.anims.play('anselmo_walk_left');
                    },
                    x: 265,
                    duration: 200,
                    onComplete: () => {
                        this.chemo.anims.play('anselmo_idle_left');
                        this.chemo.anims.stop();
                        this.pasos.stop();
                    },
                }, // 92500
            ]
        });

       // Isabella
        this.timelineIsa = this.tweens.timeline({
			targets: [this.isa],
			paused: true,
			loop: 0,
            tweens: [ // 500
                { // entra a mina
                    onStart: () => {
                        this.isa.anims.play('isabella_walk');
                    },
                    x: 48,
                    duration: 500,
                    onComplete: () => {
                        this.timelineChemo.play();
                    }
                }, // 1000
                { // derecha
                    x: 280,
                    duration: 2000,
                }, // 3000
                { // sube hacia sismogg
                    onStart: () => {
                        this.isa.anims.play('isabella_up');
                    },
                    y: 345,
                    duration: 2500
                }, // 5500
                { // izquierda sismogg
                    onStart: () => {
                        this.isa.setFlipX(true);
                        this.isa.anims.play('isabella_walk');
                    },
                    x: 180,
                    duration: 1000,
                    onComplete: () => {
                        this.isa.setFlipX(false);
                        this.isa.anims.play('isabella_idle_right');
                        //this.isa.anims.stop();
                    }
                }, // 6500
				{ // dar chance llegan
					alpha: 1,
					duration: 1000
				}, // 7500
				{ // hablan en sismógrafo
					onStart: () => {
                        this.pasos.stop();
						//this.recuadro.setVisible(true);
						console.log("J: El equipo está intacto y funciona a la perfección.");
                        console.log("C: Parece que no ha sido alterado.");
                        console.log("I: Desde aquí sí se registró el terremoto de ayer. Fue de… ¡7.4 grados!");
                        console.log("J: Me sorprende que este lugar no se haya derrumbado aún.");
						this.scene.launch('Dialogos', [1, 5]);
						this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						//this.recuadro.setVisible(false);
					}
                }, // 8500
                { // pausa chemo baja, ve huecos, sythua baja, chemo grita, sythua se esconde
                    alpha: 1,
                    duration: 11000
                }, // 19500
                { // pausa jorge pregunta, chemo corre hasta mitad
                    alpha: 1,
                    duration: 1500
                }, // 21000
                { // baja poco chemo wtf
                    onStart: () => {
                        this.isa.anims.play('isabella_down');
                    },
                    y: 428,
                    duration: 500
                }, // 21500
                { // derecha chemo wtf
                    onStart: () => {
                        this.isa.anims.play('isabella_walk');
                    },
                    x: 252,
                    duration: 500,
                    onComplete: () => {
                        this.isa.anims.play('isabella_idle');
                    }
                }, // 22000
                { // pausa espera a jorge
                    alpha: 1,
                    duration: 500
                }, // 22500
                { // pausa chemo dice ora ora
                    alpha: 1,
                    duration: 3000
                }, // 25500
                { // ve a jorge
                    onStart: () => {
                        this.isa.anims.play('isabella_idle_right');
                    },
                    alpha: 1,
                    duration: 2000
                }, // 27500
                { // baja camina cuarto
                    onStart: () => {
                        this.isa.anims.play('isabella_down');
                        this.pasos.play();
                    },
                    y: 576,
                    duration: 1000
                }, // 28500
                { // derecha camina cuarto
                    onStart: () => {
                        this.isa.anims.play('isabella_walk');
                    },
                    x: 770,
                    duration: 4000
                }, // 32500
                { // arriba camina cuarto
                    onStart: () => {
                        this.isa.anims.play('isabella_up');
                    },
                    y: 160,
                    duration: 4500,
                    onComplete: () => {
                        this.isa.anims.play('isabella_idle_right');
                    }
                }, // 37000
                { // esperar tantito animaciones
                    alpha: 1,
                    duration: 500
                }, // 37500
				{ // hablan en cuarto
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("I: ¿Estás bien?");
                        console.log("C: ¡Había alguien espiándonos!");
                        console.log("J: Y ese espía que viste, ¿está en este cuarto con nosotros?");
                        console.log("C: Les juro que vi una sombra.");
                        this.scene.launch('Dialogos', [9, 13]); 
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						// this.recuadro.setVisible(false);
					}
                }, // 38500
                { // tiembla y jorge habla
					onStart: () => {
                        this.tem3.play();
						this.cameras.main.shake(3000, 0.007);
					},
                    alpha: 1,
                    duration: 5000
                }, // 43500
                { // baja temblo
                    onStart: () => {
                        this.isa.anims.play('isabella_down');
                        this.pasos.play();
                    },
                    y: 576,
                    duration: 5000
                }, // 85000
                { // izq temblo
                    onStart: () => {
                        this.isa.anims.play('isabella_walk');
                        this.isa.setFlipX(true);
                    },
                    x: 280,
                    duration: 4000,
                }, // 89000
                { // sube hacia sismogg temblo
                    onStart: () => {
                        this.isa.anims.play('isabella_up');
                        this.isa.setFlipX(false);
                    },
                    y: 345,
                    duration: 2500
                }, // 91500
                { // izquierda sismogg temblo
                    onStart: () => {
                        this.isa.setFlipX(true);
                        this.isa.anims.play('isabella_walk');
                    },
                    x: 180,
                    duration: 1000,
                    onComplete: () => {
                        this.isa.setFlipX(false);
                        this.isa.anims.play('isabella_walk');
                        this.isa.anims.stop();
                    }
                }, // 92500
                { // espera
                    alpha: 1,
                    duration: 1000
                },
				{ // hablan en sismógrafo fin
					onStart: () => {
						//this.recuadro.setVisible(true);
						console.log("I: Parece que el epicentro fue... ¿¡justo abajo de nosotros!?");
                        console.log("J: Esto no me gusta nada.");
                        console.log("I: Lo sé, pero tenemos que explorar la mina.");
                        console.log("J: …tienes razón, debemos ir. Algo raro está ocurriendo bajo las profundidades.");
                        this.scene.launch('Dialogos', [14, 18]);
                        this.scene.pause('Cueva0S');
					},
					alpha: 1,
					duration: 1000,
					onComplete: () => {
						this.recuadro.setVisible(false);
						setTimeout(() => {
							// Cambia a la siguiente escena
							console.log("Pasa a la escena de Cueva1S");
							// sig
							this.scene.start('Cueva1S');
							// this.scene.start('Cueva2S');
						}, 3000); 
					}
                }, // 112500
            ]
        });

		setTimeout(() => {
			console.log('Empieza timeline')
			this.timelineJorge.play();
			// this.scene.launch('Cueva1S');
		}, 1000);
    }

    update(time, delta) {
        
    }
}

export default Cueva0S;