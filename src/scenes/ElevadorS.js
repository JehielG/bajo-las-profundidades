class ElevadorS extends Phaser.Scene{
    constructor(){ 
        super({ 
            key: 'ElevadorS' 
        }); 
    } 
    init() { 
        console.log('Escena de Elevador'); 
    } 

    preload() {
        this.load.path = './assets/ElevSc/';
        this.load.image(['Elevador','IzqElevador','DerElevador','AElevador']);

    }


    create() { 
        this.cursor = this.input.keyboard.createCursorKeys();

const camera1 =
            //posición x, posición y, ancho, alto
            this.cameras.add(0, 0, 1280, 720).setZoom(1.02)
            .setBackgroundColor(0x00ffff)
            // tiempo en milisegundos, intensidad en [0,1]
            .shake(10000, 0.009).pan(640,385,10000,'Sine.easeInOut');

		camera1.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
			// proporción, duración, interpolación
			camera1.pan(640 , 360, 1000, 'Sine.easeInOut');
		});
      
        this.fondoE = this.add.image(0, 0, 'Elevador');
        this.fondoE.setOrigin(0,0);
        this.fondoE.setScale(1.1,1.2);

        //limitaciones
		this.limDerecha = this.add.image(957, 0, 'DerElevador').setOrigin(0,0);
		this.limDerecha.setScale(1.1,1.2);
		this.physics.add.existing(this.limDerecha, true);

		this.limIzquierda = this.add.image(0, 0, 'IzqElevador').setOrigin(0,0);
		this.limIzquierda.setScale(1.1,1.2);
		this.physics.add.existing(this.limIzquierda, true);
		
		this.limNorte = this.add.image(0, 0, 'AElevador').setOrigin(0,0);
		this.limNorte.setScale(1.1,1.2);
		this.physics.add.existing(this.limNorte, true);

		//---------personaje 
		this.velocidad = 200;
		
		// Pasos
		this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);

        //Personaje
		this.jorge = this.add.sprite(670, 650, 'jorge').setScale(6);
		this.physics.add.existing(this.jorge, false);
		this.jorge.body.setAllowGravity(false);
		this.jorge.body.isStatic = false;
		this.jorge.body.setSize(20,24)//.setOffset(3,0);
		this.jorge.anims.play("jorge_down_idle");

    this.isabella = this.add.sprite(550,600,'isabella',0).setScale(6);
		this.anselmo = this.add.sprite(800,600,'anselmo',0).setScale(6);
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

		// Caminar a la derecha
		this.cursor.left.on('down',()=>{
			walk_left(this.jorge);
			this.jorge_pasos.play();
		});
		this.cursor.left.on('up',()=>{
			//this.jorge.flipX = false;
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
		});
    
		this.cursor.up.on('down',()=>{
			walk_up(this.jorge);
			this.jorge_pasos.play();
		});
		this.cursor.up.on('up',()=>{
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
		});
    
		this.cursor.down.on('down',()=>{
			walk_down(this.jorge);
			this.jorge_pasos.play();
		});
		this.cursor.down.on('up',()=>{
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
		});

        //colisiones
        this.physics.add.collider(this.jorge, this.limDerecha, () => {
            this.jorge.x-=3;
        });
        this.physics.add.collider(this.jorge, this.limIzquierda, () => {
            this.jorge.x+=3;
        });
        this.physics.add.collider(this.jorge, this.limNorte);
        this.jorge.body.setCollideWorldBounds(true);

    }

    update(time, delta) { 
        //personaje
        this.jorge.body.setVelocity(0);

        // movimiento horizontal
        if (this.cursor.left.isDown) {
            this.jorge.body.setVelocityX(-200);
        }
        else if(this.cursor.right.isDown) {
            this.jorge.body.setVelocityX(200);
        }
        
        //movimiento vertical
        if (this.cursor.up.isDown) {
            this.jorge.body.setVelocityY(-200);
        }
        else if (this.cursor.down.isDown) {
            this.jorge.body.setVelocityY(200);
        }
    } 
} 
export default ElevadorS;