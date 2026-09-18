class BaseS extends Phaser.Scene{
    constructor(){
        super({
            key: 'BaseS'
        });
    }

    init(VidasT) {
        console.log('Escena BaseS');
        this.totalVidas=VidasT;
    }
    
    preload() {
        this.load.path = './assets/BaseS/';
        this.load.image(['BaseS','AbajB','ArrB','DerB','IzqB','Puerta4','Compu','cartaB']);
      	this.load.audio('sonidoFB',['../Sound/SoundBaseRep2.mp3']);
        this.load.image(['rept2_down', 'rept2_side', 'rept3_down', 'rept3_side']);
    }

    create() {
        //---Sonidos---
       // sonido de Fondo de la Base
		this.sonidoFB = this.sound.add('sonidoFB');
		this.sonidoFB.loop = true;
		this.sonidoFB.setVolume(.2);
        // Pasos
		this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);
        //controles
        this.cursor = this.input.keyboard.createCursorKeys();
        this.BanCamina=0;
        this.velocidad = 100;

        this.fondoB = this.add.image(0, 0, 'BaseS');
        this.fondoB.setOrigin(0,0);
        //this.fondoB.setScale(1.1,1.2);
        //Derecha
		this.limDer= this.add.image(1220, 0, 'DerB').setOrigin(0,0);
		this.physics.add.existing(this.limDer, true);
        //Izquierda
		this.limIzq= this.add.image(810, 0, 'IzqB').setOrigin(0,0);
		this.physics.add.existing(this.limIzq, true);
        //Arriba
		this.limArr= this.add.image(0, 0, 'ArrB').setOrigin(0,0);
		this.physics.add.existing(this.limArr, true);
        //Arriba
		this.limAbaj= this.add.image(805, 570, 'AbajB').setOrigin(0,0);
		this.physics.add.existing(this.limAbaj, true);

        //Puerta4
		this.Puerta= this.add.image(1400, 495, 'Puerta4').setOrigin(0,0);
		this.physics.add.existing(this.Puerta, false);
        this.Puerta.body.setImmovable(true);
		this.Puerta.body.isStatic = true;
		this.Puerta.body.setAllowGravity(false);
        
        //this.Puerta.setDepth(-1);
    
        //Compu
		this.compu= this.add.image(880, 0, 'Compu').setOrigin(0,0);
		this.physics.add.existing(this.compu, true);
        
        this.carta1= this.add.image(900, 50, 'cartaB');
        this.carta1.setScale(.4);

        const cont_personas = this.add.container(50, 115);

		// Personajes 
		// Jorge centro
		this.jorge = this.add.sprite(0, 0, 'jorge').setScale(1.5);
        this.physics.add.existing(this.jorge, false);
		this.jorge.body.setAllowGravity(false);
		this.jorge.body.isStatic = false;
		this.jorge.anims.play("jorge_down_idle");
		// Isa izq
		this.isa = this.add.sprite(-12, -12, 'isabella').setScale(1.5);
        this.isa.anims.play("isabella_idle");
		// Chemo der
		this.chemo = this.add.sprite(12, -12, 'anselmo').setScale(1.5);
        this.chemo.anims.play("anselmo_idle");
		// Sythua
		this.sythua = this.add.sprite(22, 0, 'reptiliano1').setScale(1.8);
		this.sythua.anims.play('reptiliano1_idle');

        // Reptilianos
        this.repti1 = this.add.sprite(760, 460, 'rept3_side').setScale(1.8).setFlipX(true);
        this.repti2 = this.add.sprite(760, 530, 'rept2_side').setScale(1.8).setFlipX(true);
        this.repti3 = this.add.sprite(876, 196, 'rept3_side').setScale(1.8);
        this.repti4 = this.add.sprite(880, 534, 'rept3_down').setScale(1.8);
        this.repti5 = this.add.sprite(1050, 60, 'rept2_down').setScale(1.8);
        this.repti6 = this.add.sprite(1203, 366, 'rept2_side').setScale(1.8);

        //carta
        this.carta2= this.add.image(1140, 80, 'cartaB');
        this.carta2.setScale(2.5);
        this.carta2.setVisible(0);

        cont_personas.add([
            this.chemo,
            this.isa,
			this.sythua,
            this.jorge
        ]);

        // camara
        const camera1 = this.cameras.add(0, 0, 1280, 720)
        camera1.setZoom(2);
        camera1.setBounds(0,0,1281,721,false);
        camera1.startFollow(this.jorge.body);

        //colisiones
        this.physics.add.collider(this.jorge, this.limDer);
        this.physics.add.collider(this.jorge, this.limIzq);
        this.physics.add.collider(this.jorge, this.limAbaj);
        this.physics.add.collider(this.jorge, this.limArr);

		//empiezan a caminar
		this.scene.launch('Dialogos', [43, 51]);
		this.timelineHistoria1 = this.tweens.timeline({
	        targets: [cont_personas],
	        paused: true,
	        loop: 0,
	        tweens: [
	            { // derecha 
	                x: 675,
	                duration: 9000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_right_walk");
	                    this.chemo.anims.play("anselmo_walk");
	                    this.isa.anims.play("isabella_walk");
						this.sythua.anims.play("reptiliano1_walk");
	                    this.jorge_pasos.play();
	                }
	            },
	            { // bajan
	                y: 300,
	                duration: 2800,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_down_walk");
	                    this.chemo.anims.play("anselmo_down");
	                    this.isa.anims.play("isabella_down");
						this.sythua.anims.play("reptiliano1_walk_down");
	                }
	            },
	            { // izquierda 
	                x: 440,
	                duration: 4000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_left_walk");
	                    this.chemo.anims.play("anselmo_walk_left");
	                    this.isa.anims.play("isabella_walk_left");
						this.sythua.anims.play("reptiliano1_walk");
						this.sythua.setFlipX(true);
	                }
	            },
	            { // bajan 
	                y: 400,
	                duration: 1600,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_down_walk");
	                    this.chemo.anims.play("anselmo_down");
	                    this.isa.anims.play("isabella_down");
						this.sythua.anims.play("reptiliano1_walk_down");
						this.sythua.setFlipX(false);
	                }
	            },
	            { // izquierda 
	                x: 200,
	                duration: 5000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_left_walk");
	                    this.chemo.anims.play("anselmo_walk_left");
	                    this.isa.anims.play("isabella_walk_left");
						this.sythua.anims.play("reptiliano1_walk");
						this.sythua.setFlipX(true);
	                }
	            },
	            { // bajan 
	                y: 600,
	                duration: 3000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_down_walk");
	                    this.chemo.anims.play("anselmo_down");
	                    this.isa.anims.play("isabella_down");
						this.sythua.anims.play("reptiliano1_walk_down");
						this.sythua.setFlipX(false);
	                }
	            },
	            { // derecha 
	                x: 675,
	                duration: 9000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_right_walk");
	                    this.chemo.anims.play("anselmo_walk");
	                    this.isa.anims.play("isabella_walk");
						this.sythua.anims.play("reptiliano1_walk");
	                }
	            },
	            { // suben 
	                y: 510,
	                duration: 2000,
	                onStart: () => {
	                    this.jorge.anims.play('jorge_up_walk');
	                    this.chemo.anims.play('anselmo_up');
	                    this.isa.anims.play('isabella_up');
						this.sythua.anims.play("reptiliano1_walk_up");
	                },
	            },
	            { // entran a la base
	                x: 950,
	                duration: 4000,
	                onStart: () => {
	                    this.jorge.anims.play("jorge_right_walk");
	                    this.chemo.anims.play("anselmo_walk");
	                    this.isa.anims.play("isabella_walk");
						this.sythua.anims.play("reptiliano1_walk");
	                },
	                onComplete: () => {
	                    this.BanCamina=1;
						console.log(this.BanCamina);
	                    this.jorge_pasos.stop();
	                    this.jorge.anims.play("jorge_down_idle");
						this.chemo.anims.play("anselmo_idle");
						this.isa.anims.play("isabella_idle");
						this.sythua.anims.play("reptiliano1_idle");
	                  	this.sonidoFB.play();
	                     
	                }
	            }
	        ]
	    });
        
	    this.timelineHistoria1.play();
	
	    // Anims
		function idle_anim(character){
			character.anims.play("jorge_down_idle");
			//character.body.setOffset(3,0);
		}
		function walk_left(character) {
			character.anims.play("jorge_left_walk");
			//character.body.setOffset(2,0);
			//character.flipX = true;
		}
		function walk_right(character) {
			character.anims.play("jorge_right_walk");
			//character.body.setOffset(4,0);
		}
		function walk_up(character) {
			character.anims.play("jorge_up_walk");
			//character.body.setOffset(-1,0);
		}
		function walk_down(character) {
			character.anims.play("jorge_down_walk");
			//character.body.setOffset(-1,0);
		}

		// Caminar
		// Caminar a la izquierda
		this.cursor.left.on('down',()=>{
			if(this.BanCamina==1) {
				walk_left(this.jorge);
				this.jorge_pasos.play();
			}
		});
		this.cursor.left.on('up',()=>{
			if(this.BanCamina==1) {
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
			}
		});
		// Caminar a la derecha
		this.cursor.right.on('down',()=>{
			if(this.BanCamina==1) {
				walk_right(this.jorge);
				this.jorge_pasos.play();
			}
		});
		this.cursor.right.on('up',()=>{
			if(this.BanCamina==1) {
				if(this.cursor.up.isDown) {
					walk_right(this.jorge);
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
			}
		});
		// Caminar arriba
		this.cursor.up.on('down',()=>{
			if(this.BanCamina==1) {
				walk_up(this.jorge);
				this.jorge_pasos.play();
			}
		});
		this.cursor.up.on('up',()=>{
			if(this.BanCamina==1) {
				if(this.cursor.left.isDown) {
					walk_left(this.jorge);
				}else {
					if(this.cursor.right.isDown) {
						walk_right(this.jorge);
					} else {
						if(this.cursor.left.isDown) {
							walk_left(this.jorge);
						} else {
							idle_anim(this.jorge);
							this.jorge_pasos.pause();
						}
					}
				}
			}
		});
		// Caminar abajo
		this.cursor.down.on('down',()=>{
			if(this.BanCamina==1) {
				walk_down(this.jorge);
				this.jorge_pasos.play();
			}
		});
		this.cursor.down.on('up',()=>{
			if(this.BanCamina==1) {
				if(this.cursor.left.isDown){
					walk_left(this.jorge);
				}else{
					if(this.cursor.right.isDown){
						walk_right(this.jorge);
					}else{
						if(this.cursor.up.isDown) {
							walk_up(this.jorge);
						} else {
							idle_anim(this.jorge);
							this.jorge_pasos.pause();
						}
					}
				}
			}
		});
	

		//colision
		this.physics.add.collider(this.jorge, this.Puerta, () => {
			// Cambia a la siguiente escena
			console.log("Pasa a la escena de LavaS");
			// sig
			this.jorge_pasos.pause();
			this.sonidoFB.stop();
			this.scene.start('LavaS',this.totalVidas);
		});
		this.physics.add.collider(this.jorge, this.compu, () => {
			console.log("se revela la carta");
			this.carta2.setVisible(1);
			this.Puerta.x=1200;
	
		});

	}

    update(time, delta) {
        
        //personaje
        this.jorge.body.setVelocity(0);

        if (this.BanCamina==1) {

            // movimiento horizontal
            if (this.cursor.left.isDown) {
                this.jorge.body.setVelocityX(-this.velocidad);
            }
            else if(this.cursor.right.isDown) {
                this.jorge.body.setVelocityX(this.velocidad);
            }
            
            //movimiento vertical
            if (this.cursor.up.isDown) {
                this.jorge.body.setVelocityY(-this.velocidad);
            }
            else if (this.cursor.down.isDown) {
                this.jorge.body.setVelocityY(this.velocidad);
            }
            
        }
    }
}

export default BaseS;