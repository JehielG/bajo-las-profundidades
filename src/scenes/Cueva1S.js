//import CajasS from "../scenes/CajasS.js"
//import ElevadorS from "../scenes/ElevadorS.js"
//import MinimapS from "../scenes/MinimapS.js"
//import Cueva2S from "../scenes/Cueva2S.js"
//import LavaS from "../scenes/LavaS.js"


class Cueva1S extends Phaser.Scene{
    constructor(){
        super({
            key: 'Cueva1S'
		});
    }

    init() {
        console.log('Escena Cueva1S');
    }

	
    preload() {
        this.load.path = './assets/';

       	//Musica 
        this.load.audio('musica_fondo',['Sound/musicaF.mp3']);
        this.load.audio('arrastre',['Sound/arrastre.mp3']);
        this.load.audio('pasos',['Sound/pasos.mp3']);
        this.load.audio('salto',['Sound/saltar.mp3']);
        this.load.audio('corazons',['Sound/corazons.mp3']);

		this.load.audio('SoundAbreElevador',['Sound/SoundAbreElevador.mp3']);
		this.load.audio('SoundElevadorBaja',['Sound/SoundElevadorBaja.mp3']);
      
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
    	//Salto de Jorge
		this.load.atlas("jorge_jump","anims/Jump/jorge_jump.png","anims/Jump/jorge_jump_atlas.json");
		this.load.animation("jorgeAnim_jump","anims/Jump/jorge_jump_anim.json");
		//Reptilianos
		//Color1
		this.load.atlas("reptiliano1","anims/Reptiliano/Color1/reptiliano1.png","anims/Reptiliano/Color1/reptiliano1_atlas.json");
		this.load.animation("reptiliano1Anim","anims/Reptiliano/Color1/reptiliano1_anim.json");
		//Color2
		this.load.atlas("reptiliano2","anims/Reptiliano/Color2/reptiliano2.png","anims/Reptiliano/Color2/reptiliano2_atlas.json");
		this.load.animation("reptiliano2Anim","anims/Reptiliano/Color2/reptiliano2_anim.json");
		//Color3
		this.load.atlas("reptiliano3","anims/Reptiliano/Color3/reptiliano3.png","anims/Reptiliano/Color3/reptiliano3_atlas.json");
		this.load.animation("reptiliano3Anim","anims/Reptiliano/Color3/reptiliano3_anim.json");
      // Estatua 1
		this.load.atlas("statue1_fall","anims/statues/statue1_fall.png","anims/statues/statue1_fall_atlas.json");
		this.load.animation("statue1_fallAnim","anims/statues/statue1_fall_anim.json");
		// Estatua 2
		this.load.atlas("statue2_fall","anims/statues/statue2_fall.png","anims/statues/statue2_fall_atlas.json");
		this.load.animation("statue2_fallAnim","anims/statues/statue2_fall_anim.json");
		// Estatua 3
		this.load.atlas("statue3_fall","anims/statues/statue3_fall.png","anims/statues/statue3_fall_atlas.json");
		this.load.animation("statue3_fallAnim","anims/statues/statue3_fall_anim.json");
		// Estatua 4
		this.load.atlas("statue4_fall","anims/statues/statue4_fall.png","anims/statues/statue4_fall_atlas.json");
		this.load.animation("statue4_fallAnim","anims/statues/statue4_fall_anim.json");

		// MAPA
		// Elelementos a colisionar (elevador, huecos, boton, pista)
        this.load.path = './assets/Cueva1S/';
		this.load.image(['puertaE', 'caja', 'red_button_pressed', 'red_button_unpressed', 'pista1', 'hojita-amarilla']);
        this.load.path = './assets/CaveTiles/';
		this.load.image(['hole', 'BigHole1', 'BigHole2']);
        // Tiles
		this.load.image('blocked', 'cave_floor1_blocked.png')
        this.load.image(['caveTiles', 'caveStatuesTiles']);
        this.load.tilemapTiledJSON('mapaCueva', "cave_floor1_map.json");

		// Manejo de eventos
		this.elev_reparado = false;
		this.registry.events.on('completo', (dato) => { 
			console.log('Se ha emitido el evento', dato); 
			setTimeout(() => { this.scene.remove('mj_cables'); }, 3000);
			this.elev_reparado = true;
      	this.scene.resume('Cueva1S');
		});


		//se registra el evento economico
      /*
        this.registry.events.on('eventoCC', (CajasD) => {
            console.log('Se ha emitido el evento ', CajasD);
        });

        //se registra el evento economico Vidas
        this.registry.events.on('eventoV', (VidasT) => {
            console.log('Se ha emitido el evento ', VidasT);
        });
      
      	//se registra el evento Mapa
        this.registry.events.on('eventoMM', (eMapa) => {
            console.log('Se ha emitido el evento ', eMapa);
        });*/
    }

	create() {
		
		// Se agregan las demás escenas
    //	this.scene.add('CajasS', CajasS);
		//this.scene.add('ElevadorS', ElevadorS);
		//this.scene.add('MinimapS', MinimapS);
		//this.scene.add('Cueva2S', Cueva2S);
		//this.scene.add('LavaS', LavaS);
		//this.scene.add('JuyoS', JuyoS);

    	// this.scene.start('Cueva2S', 1);

    
		this.scene.launch('VidasP', 3);
    	this.scene.launch('CajasS', 0);
		this.scene.launch('MinimapS',0);

		// console.log('lesgo');
  //   	this.scene.launch('Juyos1S');
		
		// Controles
		this.cursor = this.input.keyboard.createCursorKeys();
		
		// Constantes
		this.velocidad = 200
		this.velocidadCaja = 100;

    	this.VidasJugador = 3;

   		 this.BanMuert=0;
    
		this.bandSalto = false;
		this.bandCaida = false;
		this.Banhue1 = 0;
		this.Banhue2 = 0;
		this.Banhue3 = 0;
		this.Banhue4 = 0;
		this.BanBH1 = 0;
		this.BanBH2 = 0;
		
		// ----- Sonidos 
		// Música fondo
		this.musicaF = this.sound.add('musica_fondo');
		this.musicaF.loop = true;
		//this.musicaF.setVolume(.2);
		this.musicaF.play();


    	//sonido de corazon a 1 de vida
		this.corazonS = this.sound.add('corazons');
		this.corazonS.loop = true;
		this.corazonS.setVolume(.5);
    
		// Arrastre de caja
		this.arrastre = this.sound.add('arrastre');

		// Pasos
		this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);

		// Salto 
		this.jorge_saltar = this.sound.add('salto');
		this.jorge_saltar.loop = true;
		this.jorge_saltar.setVolume(.3);

		// abre elevador
		this.sonidoAbreElevador = this.sound.add('SoundAbreElevador');
		this.sonidoAbreElevador.setVolume(.3);
		//elevador bajando
		this.sonidoElevadorBaja = this.sound.add('SoundElevadorBaja');
		this.sonidoElevadorBaja.loop=true;
		this.sonidoElevadorBaja.setVolume(.3);
		
		
		// TileMap
		this.mapaCueva = this.make.tilemap({
			key: "mapaCueva"
		});
		this.tileset = this.mapaCueva.addTilesetImage("caveTiles","caveTiles");
		this.tileset2 = this.mapaCueva.addTilesetImage("caveStatuesTiles","caveStatuesTiles");
		
		this.groundLayer = this.mapaCueva.createLayer("Ground", this.tileset, 0, 0);
		this.wallsLayer = this.mapaCueva.createLayer("Walls", this.tileset, 0, 0);
		this.torchesLayer = this.mapaCueva.createLayer("Torches", this.tileset2, 0, 0);
		
		this.wallsLayer.setCollisionByProperty({
			collides: true
		});

		// Puerta de elevador
		this.pueEle = this.physics.add.image(1440, 63, 'puertaE');
		this.pueEle.body.setAllowGravity(false);
		this.pueEle.body.setImmovable(true);
		this.pueEle.setScale(.2);

		// Sismografo
		this.sismog = this.physics.add.image(218, 333, 'sismografo2').setScale(0.5);
		this.sismog.body.setAllowGravity(false);
		this.sismog.body.setImmovable(true);

		// Imagen que no permite ver más allá
		this.blockedMap = this.add.image(0, 0, 'blocked').setOrigin(0,0);

		// Estatuas
		// Statue 1
		this.statue1 = this.add.sprite(1394, 377, 'statue1_fall');
		this.physics.add.existing(this.statue1, false);
		this.statue1.body.setAllowGravity(false);
		this.statue1.body.setImmovable(true);
		// Statue 2
		this.statue2 = this.add.sprite(1426, 378, 'statue2_fall');
		this.physics.add.existing(this.statue2, false);
		this.statue2.body.setAllowGravity(false);
		this.statue2.body.setImmovable(true);
		// Statue 3
		this.statue3 = this.add.sprite(1458, 377, 'statue3_fall');
		this.physics.add.existing(this.statue3, false);
		this.statue3.body.setAllowGravity(false);
		this.statue3.body.setImmovable(true);
		// Statue 4
		this.statue4 = this.add.sprite(1490, 380, 'statue4_fall');
		this.physics.add.existing(this.statue4, false);
		this.statue4.body.setAllowGravity(false);
		this.statue4.body.setImmovable(true);

		// Hole 1
		this.hole1 = this.physics.add.image(320, 640, 'hole');
		this.hole1.body.setAllowGravity(false);
		this.hole1.body.setImmovable(true);
		this.hole1.body.setCircle(18).setOffset(14,14);
		// Hole 2
		this.hole2 = this.physics.add.image(640, 512, 'hole');
		this.hole2.body.setAllowGravity(false);
		this.hole2.body.setImmovable(true);
		this.hole2.body.setCircle(18).setOffset(14,14);
		// Hole 3
		this.hole3 = this.physics.add.image(1152, 576, 'hole');
		this.hole3.body.setAllowGravity(false);
		this.hole3.body.setImmovable(true);
		this.hole3.body.setCircle(18).setOffset(14,14);
		// Hole 4
		this.hole4 = this.physics.add.image(1408, 640, 'hole');
		this.hole4.body.setAllowGravity(false);
		this.hole4.body.setImmovable(true);
		this.hole4.body.setCircle(18).setOffset(14,14);
		// Big Hole 1
		this.bigHole1 = this.physics.add.image(896, 576, 'BigHole1');
		this.bigHole1.body.setAllowGravity(false);
		this.bigHole1.body.setImmovable(true);
		this.bigHole1.body.setSize(36,168).setOffset(14,12);
		// Big Hole 2
		this.bigHole2 = this.physics.add.image(1440, 448, 'BigHole2');
		this.bigHole2.body.setAllowGravity(false);
		this.bigHole2.body.setImmovable(true);
		this.bigHole2.body.setSize(104,36).setOffset(12,14);

		// Imagenes pista 1
		this.pista1 = this.add.image(900, 333, 'pista1').setVisible(false).setDepth(1);
		this.hojita = this.physics.add.image(415, 155, 'hojita-amarilla').setScale(1.5);
		this.hojita.body.setAllowGravity(false);
		this.hojita.body.setImmovable(true);

		//Botón rojo para cajas
		this.redButtonPressed = this.physics.add.image(90,510,'red_button_pressed');
		this.redButtonPressed.body.setAllowGravity(false);
		this.redButtonPressed.setScale(0.4);
		
		this.redButtonUnpressed = this.physics.add.image(90,510,'red_button_unpressed');
		this.redButtonUnpressed.body.setAllowGravity(false);
		this.redButtonUnpressed.setScale(0.4);

		//Jorge
		this.jorge = this.add.sprite(200, 150, 'jorge').setScale(2.2);
		this.physics.add.existing(this.jorge, false);
		this.jorge.body.setAllowGravity(false);
		this.jorge.body.isStatic = false;
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
		
		// Camara
		this.cameras.main.setBounds(0,0,1537,705,false);
		this.cameras.main.startFollow(this.jorge);

		const camera1 = this.cameras.add(10, 70, 100, 100);
		camera1.startFollow(this.jorge);
		// tiempo en milisegundos 
        //.fadeIn(2000);

		this.cameras.main.on(Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE, () => { 
            console.log("Se ha completado el Zoom"); 
			//this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut');
			this.cameras.main.fadeOut(2000);
      		this.corazonS.play();
        });


        //aplicamos zomm
        camera1.setZoom(2);
        //se centra
        camera1.scrollX = -20; camera1.scrollY = -20;

		//Cajas
		this.contCajas=0;
		this.contCajasError = 0
		this.caja1Band = false;
		this.caja2Band = false;
		this.caja3Band = false;
		this.caja4Band = false;
		this.caja1 = this.physics.add.image(450, 300, 'caja');
		this.caja1.body.setAllowGravity(false);
		this.caja1.body.setSize(30,24).setOffset(3,6);
		this.caja1.setScale(1.5);
		
		this.caja2 = this.physics.add.image(710, 210, 'caja');
		this.caja2.body.setAllowGravity(false);
		this.caja2.body.setSize(30,24).setOffset(3,6);
		this.caja2.setScale(1.5);
		
		this.caja3 = this.physics.add.image(1090, 596, 'caja');
		this.caja3.body.setAllowGravity(false);
		this.caja3.body.setSize(30,24).setOffset(3,6);
		this.caja3.setScale(1.5);
		
		this.caja4 = this.physics.add.image(1400, 540, 'caja');
		this.caja4.body.setAllowGravity(false);
		this.caja4.body.setSize(30,24).setOffset(3,6);
		this.caja4.setScale(1.5);
		
    	// ---------- Colision entre objetos ----------
		
		this.physics.add.collider(this.jorge, this.caja1, () => {
			this.arrastre.play();
		});
		this.physics.add.collider(this.jorge, this.caja2, () => {
			this.arrastre.play();
		});
		this.physics.add.collider(this.jorge, this.caja3, () => {
			this.arrastre.play();
		});
		this.physics.add.collider(this.jorge, this.caja4, () => {
			this.arrastre.play();
		});

    	this.ban = 0;

		// CAMBIAR DE ESCENA
		this.physics.add.collider(this.jorge, this.pueEle, () => {
			//pasa a la escena de los cables
			if(this.elev_reparado == true){
				console.log("Pasa a la ecena de elevador");
				// this.scene.stop('MinimapS');
				this.scene.stop('CajasS');
					this.scene.stop('MinimapS');
				this.scene.start('ElevadorS');
				this.sonidoAbreElevador.play();
				this.sonidoElevadorBaja.play();
				this.jorge_pasos.pause();
				
				// cambiar a la sig parte
				setTimeout(() => {
					console.log('vamos a lo que sigue');
					this.sonidoElevadorBaja.pause();
					//this.scene.launch('LavaS');
          			//this.scene.launch('JuyoS');
                    this.scene.launch('Cueva2S', 1);
					this.scene.stop('ElevadorS');
                    
				}, 5000);
			}else{
				//puzzle reparacion
				this.scene.launch('Dialogos', [18, 21]);
				this.scene.pause('Cueva1S');
				if(this.ban == 0){
					this.jorge.anims.play("jorge_down_idle");
					this.scene.launch('mj_cables');
					this.scene.pause('Cueva1S');
					this.jorge_pasos.pause();
					this.ban = 1;
				}
			}
		});
		
	    // Colisiones
		// Jorge y las cajas con la pared
	    this.physics.add.collider(this.jorge, this.wallsLayer);
	    this.physics.add.collider(this.caja1, this.wallsLayer);
	    this.physics.add.collider(this.caja2, this.wallsLayer);
	    this.physics.add.collider(this.caja3, this.wallsLayer);
	    this.physics.add.collider(this.caja4, this.wallsLayer);
		// Jorge con las cajas
	    this.physics.add.collider(this.jorge, this.caja1);
	    this.physics.add.collider(this.jorge, this.caja2);
	    this.physics.add.collider(this.jorge, this.caja3);
	    this.physics.add.collider(this.jorge, this.caja4);
		// Jorge con sismografo
		this.physics.add.collider(this.jorge, this.sismog);
		// Jorge con las estatuas
		this.physics.add.collider(this.jorge, this.statue1);
		this.physics.add.collider(this.jorge, this.statue2);
		// this.physics.add.collider(this.jorge, this.statue3);
		// this.physics.add.collider(this.jorge, this.statue4);
    
		// // Caja 1 con los huecos
	 //    this.physics.add.collider(this.caja1, this.bigHole1Layer);
	 //    this.physics.add.collider(this.caja1, this.bigHole2Layer);
		// // Caja 2 con los huecos
	 //    this.physics.add.collider(this.caja2, this.bigHole1Layer);
	 //    this.physics.add.collider(this.caja2, this.bigHole2Layer);
		// // Caja 3 con los huecos
	 //    this.physics.add.collider(this.caja3, this.bigHole1Layer);
	 //    this.physics.add.collider(this.caja3, this.bigHole2Layer);
		// // Caja 4 con los huecos
	 //    this.physics.add.collider(this.caja4, this.bigHole1Layer);
	 //    this.physics.add.collider(this.caja4, this.bigHole2Layer);
	    
	    // Colliders para la animacion de salto con todos los huecos
	    this.gameObjects = [this.jorge/*, this.bigHole1Layer, this.bigHole2Layer*/];
	
	    this.colliders = this.physics.add.collider(this.gameObjects);
	    this.overlaps = this.physics.add.overlap(this.gameObjects);
		
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

		// Caminar a la derecha
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
  
		// Salta los huecos
		this.cursor.space.on('down', () => {
			this.physics.world.removeCollider(this.colliders);
			this.overlaps.destroy();
			this.jorge_saltar.play();
      this.jorgeJump.setVisible(1);
			this.jorge.setVisible(0);
      this.jorgeJump.anims.play("jorge_jump");
			this.jorgeJump.flipX = false;
			
			if(this.cursor.right.isDown) {
				//this.jorge.anims.play('jump_side');
				//this.jorge.flipX = true;
        this.jorgeJump.setVisible(1);
				this.jorge.setVisible(0);
				this.jorgeJump.anims.play("jorge_jump");
				this.jorgeJump.flipX = false;
			} else if(this.cursor.left.isDown) {
				//this.jorge.anims.play('jump_side');
        this.jorgeJump.setVisible(1);
				this.jorge.setVisible(0);
				this.jorgeJump.flipX = true;
				this.jorgeJump.anims.play("jorge_jump");
				//this.jorge.flipX = false;
			}
			if(this.cursor.up.isDown) {
				//this.jorge.anims.play('j_up');
				//this.jorge.body.setOffset(-1,0);
			} else if(this.cursor.down.isDown) {
				//this.jorge.anims.play('link_jump');
				//this.jorge.body.setOffset(3,0);
			}
		});
		
		this.cursor.space.on('up', () => {
			this.physics.world.colliders.add(this.colliders);
			this.overlaps = this.physics.add.overlap(this.gameObjects);
			this.jorge.flipX = false;
			this.jorge_saltar.pause();
      this.jorgeJump.setVisible(0);
			this.jorge.setVisible(1);
			
			if(this.cursor.left.isDown){
				walk_left(this.jorge);
			}else{
				if(this.cursor.right.isDown){
					walk_right(this.jorge);
				}else{
					if(this.cursor.up.isDown) {
						walk_up(this.jorge);
					} else {
						if(this.cursor.down.isDown) {
							walk_down(this.jorge);
						} else {
							idle_anim(this.jorge);
						}
					}
				}
			}
		});
		
	}

	update(time, delta) {
    //actualizar minimapa
    this.registry.events.emit('posC', this.jorge.x, this.jorge.y);
	    this.jorge.body.setVelocity(0);
	    //
	    this.caja1.body.setVelocity(0);
	    this.caja2.body.setVelocity(0);
	    this.caja3.body.setVelocity(0);
	    this.caja4.body.setVelocity(0);
	    //this.jorge.anims.play("link_idle");
      this.jorgeJump.x=this.jorge.x;
		  this.jorgeJump.y=this.jorge.y-30;//23
    
		// movimiento horizontal
		if (this.cursor.left.isDown) {

      //entra en diagonal inferior izquierda
			if(this.cursor.down.isDown){
				this.jorge.body.setVelocityX(-this.velocidad/1.5);
			}else //entra en diagonal superior izquierda
			if(this.cursor.up.isDown){
				this.jorge.body.setVelocityX(-this.velocidad/1.5);

			
			}else{

      
			// Si está empujando cualquiera de las cajas
			var isPushing = false;
			if(this.caja1.body.touching.right) {
				this.caja1.body.setVelocityX(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja2.body.touching.right) {
				this.caja2.body.setVelocityX(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja3.body.touching.right) {
				this.caja3.body.setVelocityX(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja4.body.touching.right) {
				this.caja4.body.setVelocityX(-this.velocidadCaja);
				isPushing = true;
			}
			if (isPushing) {
				this.jorge.body.setVelocityX(-(this.velocidadCaja+1));
			} else {
				if(this.cursor.shift.isDown) // Correr
					this.jorge.body.setVelocityX(-1.5*this.velocidad); 
				else
					this.jorge.body.setVelocityX(-this.velocidad);
			}

      }
		}
      
		else if(this.cursor.right.isDown) {

      //entra en diagonal inferior Derecha
			if(this.cursor.down.isDown){
				this.jorge.body.setVelocityX(this.velocidad/1.5);
			}else //entra en diagonal superior Derecha
			if(this.cursor.up.isDown){
				
				//console.log("Entra en diagonal");
				this.jorge.body.setVelocityX(this.velocidad/1.5);

			
			}else{

      
			var isPushing = false;
			if(this.caja1.body.touching.left) {
				this.caja1.body.setVelocityX(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja2.body.touching.left) {
				this.caja2.body.setVelocityX(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja3.body.touching.left) {
				this.caja3.body.setVelocityX(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja4.body.touching.left) {
				this.caja4.body.setVelocityX(this.velocidadCaja);
				isPushing = true;
			}
			if (isPushing) {
				this.jorge.body.setVelocityX(this.velocidadCaja+1);
			} else {
				if(this.cursor.shift.isDown)
					this.jorge.body.setVelocityX(1.5*this.velocidad);
				else
					this.jorge.body.setVelocityX(this.velocidad);
			}
    }
		
    }
    
		// movimiento vertical
		if (this.cursor.up.isDown) {

      //entra en diagonal superior Derecha
			if(this.cursor.right.isDown){
				this.jorge.body.setVelocityY(-this.velocidad/1.5);
			}else //entra en diagonal superior Izquierda
			if(this.cursor.left.isDown){
				
				this.jorge.body.setVelocityY(-this.velocidad/1.5);

			
			}else{
      
      
			var isPushing = false;
			if(this.caja1.body.touching.down) {
				this.caja1.body.setVelocityY(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja2.body.touching.down) {
				this.caja2.body.setVelocityY(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja3.body.touching.down) {
				this.caja3.body.setVelocityY(-this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja4.body.touching.down) {
				this.caja4.body.setVelocityY(-this.velocidadCaja);
				isPushing = true;
			}
			if (isPushing) {
				this.jorge.body.setVelocityY(-(this.velocidadCaja+1));
			} else {
				if(this.cursor.shift.isDown)
					this.jorge.body.setVelocityY(-1.5*this.velocidad); 
				else
					this.jorge.body.setVelocityY(-this.velocidad);
			}

      }
		
    }
      
		else if (this.cursor.down.isDown) {

    //entra en diagonal Inferior Derecha
			if(this.cursor.right.isDown){
				this.jorge.body.setVelocityY(this.velocidad/1.5);
			}else //entra en diagonal Inferior Izquierda
			if(this.cursor.left.isDown){
				
		
				this.jorge.body.setVelocityY(this.velocidad/1.5);

			
			}else{

      
			var isPushing = false;
			if(this.caja1.body.touching.up) {
				this.caja1.body.setVelocityY(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja2.body.touching.up) {
				this.caja2.body.setVelocityY(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja3.body.touching.up) {
				this.caja3.body.setVelocityY(this.velocidadCaja);
				isPushing = true;
			}
			if(this.caja4.body.touching.up) {
				this.caja4.body.setVelocityY(this.velocidadCaja);
				isPushing = true;
			}
			if (isPushing) {
				this.jorge.body.setVelocityY(this.velocidadCaja+1);
			} else {
				if(this.cursor.shift.isDown)
					this.jorge.body.setVelocityY(1.5*this.velocidad);
				else
					this.jorge.body.setVelocityY(this.velocidad);
			}

    }
		
    }

        

    //Caida de cajas en los hoyos

		//Cae caja 4 en el lugar correcto (hole 4)
		if(this.physics.world.intersects(this.caja4.body,this.hole4.body)){
			this.caja4.x = this.hole4.x;
			this.caja4.y = this.hole4.y;
			if(this.contCajas==0 && this.contCajasError == 0){
				this.contCajas++;
				this.caja4Band = true;
				console.log(this.contCajas);
        	//se registra caja 4 correcta
				this.scene.stop('CajasS');
				this.scene.launch('CajasS',1);
			// cae la estatua 4
				this.statue4.anims.play('statue4_fall');
			}else if(this.contCajas!=0 && !this.caja4Band){
				this.contCajasError = 1;
				//console.log(this.contCajasError);
			}
			if(this.caja4.alpha >= 0){
				this.caja4.alpha -= 0.01;
			}
			if(this.caja4.scale >= 0){
				this.caja4.scale -= 0.01;
			}
		}

		//Cae caja 4 en un hoyo incorrecto
		if(this.physics.world.intersects(this.caja4.body,this.hole1.body)){
			this.caja4.x = this.hole1.x;
			this.caja4.y = this.hole1.y;
			this.caja4Band = true;
			this.contCajasError = 1;

			if(this.caja4.alpha >= 0){
				this.caja4.alpha -= 0.01;
			}
			if(this.caja4.scale >= 0){
				this.caja4.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja4.body,this.hole2.body)){
			this.caja4.x = this.hole2.x;
			this.caja4.y = this.hole2.y;
			this.caja4Band = true;
			this.contCajasError = 1;

			if(this.caja4.alpha >= 0){
				this.caja4.alpha -= 0.01;
			}
			if(this.caja4.scale >= 0){
				this.caja4.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja4.body,this.hole3.body)){
			this.caja4.x = this.hole3.x;
			this.caja4.y = this.hole3.y;
			this.caja4Band = true;
			this.contCajasError = 1;

			if(this.caja4.alpha >= 0){
				this.caja4.alpha -= 0.01;
			}
			if(this.caja4.scale >= 0){
				this.caja4.scale -= 0.01;
			}
		}

		//Cae caja 1 en el lugar correcto (hole 1)
		if(this.physics.world.intersects(this.caja1.body,this.hole1.body)){
			this.caja1.x = this.hole1.x;
			this.caja1.y = this.hole1.y;
			if(this.contCajas==1 && this.contCajasError == 0){
				this.contCajas++;
				this.caja1Band = true;
				console.log(this.contCajas);
        	//se registra caja 1 correcta
				this.scene.stop('CajasS');
				this.scene.launch('CajasS',2);
			// cae la estatua 1
				this.statue1.anims.play('statue1_fall');
			}else if(this.contCajas!=1 && !this.caja1Band){
				this.contCajasError = 1;
				//console.log(this.contCajasError);
			}
			if(this.caja1.alpha >= 0){
				this.caja1.alpha -= 0.01;
			}
			if(this.caja1.scale >= 0){
				this.caja1.scale -= 0.01;
			}
		}

		//Cae caja 1 en un hoyo incorrecto
		if(this.physics.world.intersects(this.caja1.body,this.hole2.body)){
			this.caja1.x = this.hole2.x;
			this.caja1.y = this.hole2.y;
			this.caja1Band = true;
			this.contCajasError = 1;

			if(this.caja1.alpha >= 0){
				this.caja1.alpha -= 0.01;
			}
			if(this.caja1.scale >= 0){
				this.caja1.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja1.body,this.hole3.body)){
			this.caja1.x = this.hole3.x;
			this.caja1.y = this.hole3.y;
			this.caja1Band = true;
			this.contCajasError = 1;

			if(this.caja1.alpha >= 0){
				this.caja1.alpha -= 0.01;
			}
			if(this.caja1.scale >= 0){
				this.caja1.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja1.body,this.hole4.body)){
			this.caja1.x = this.hole4.x;
			this.caja1.y = this.hole4.y;
			this.caja1Band = true;
			this.contCajasError = 1;

			if(this.caja1.alpha >= 0){
				this.caja1.alpha -= 0.01;
			}
			if(this.caja1.scale >= 0){
				this.caja1.scale -= 0.01;
			}
		}
    
		//Cae caja 3 en el lugar correcto (hole 3)
		if(this.physics.world.intersects(this.caja3.body,this.hole3.body)){
			this.caja3.x = this.hole3.x;
			this.caja3.y = this.hole3.y;
			if(this.contCajas==2 && this.contCajasError == 0){
				this.contCajas++;
				this.caja3Band = true;
				console.log(this.contCajas);
        	//se registra caja 3 correcta
				this.scene.stop('CajasS');
				this.scene.launch('CajasS', 3);
			// cae la estatua 3
				this.statue3.anims.play('statue3_fall');
			}else if(this.contCajas!=2 && !this.caja3Band){
				this.contCajasError = 1;
				//console.log(this.contCajasError);
			}
			if(this.caja3.alpha >= 0){
				this.caja3.alpha -= 0.01;
			}
			if(this.caja3.scale >= 0){
				this.caja3.scale -= 0.01;
			}
		}

		//Cae caja 3 en un hoyo incorrecto
		if(this.physics.world.intersects(this.caja3.body,this.hole1.body)){
			this.caja3.x = this.hole1.x;
			this.caja3.y = this.hole1.y;
			this.caja3Band = true;
			this.contCajasError = 1;

			if(this.caja3.alpha >= 0){
				this.caja3.alpha -= 0.01;
			}
			if(this.caja3.scale >= 0){
				this.caja3.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja3.body,this.hole2.body)){
			this.caja3.x = this.hole2.x;
			this.caja3.y = this.hole2.y;
			this.caja3Band = true;
			this.contCajasError = 1;

			if(this.caja3.alpha >= 0){
				this.caja3.alpha -= 0.01;
			}
			if(this.caja3.scale >= 0){
				this.caja3.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja3.body,this.hole4.body)){
			this.caja3.x = this.hole4.x;
			this.caja3.y = this.hole4.y;
			this.caja3Band = true;
			this.contCajasError = 1;

			if(this.caja3.alpha >= 0){
				this.caja3.alpha -= 0.01;
			}
			if(this.caja3.scale >= 0){
				this.caja3.scale -= 0.01;
			}
		}

		//Cae caja 2 en el lugar correcto (hole 2)
		if(this.physics.world.intersects(this.caja2.body,this.hole2.body)){
			this.caja2.x = this.hole2.x;
			this.caja2.y = this.hole2.y;
			if(this.contCajas==3 && this.contCajasError == 0){
				this.contCajas++;
				this.caja2Band = true;
				console.log(this.contCajas);
        	//se registra caja 2 correcta
				this.scene.stop('CajasS');
				this.scene.launch('CajasS', 4);
			// cae la estatua 2
				this.statue2.anims.play('statue2_fall');
				setTimeout( () => {
					this.statue1.destroy();
					this.statue2.destroy();
					this.statue3.destroy();
					this.statue4.destroy();
		        }, 1800);
			}else if(this.contCajas!=3 && !this.caja2Band){
				this.contCajasError = 1;
				//console.log(this.contCajasError);
			}
			if(this.caja2.alpha >= 0){
				this.caja2.alpha -= 0.01;
			}
			if(this.caja2.scale >= 0){
				this.caja2.scale -= 0.01;
			}
		}

		//Cae caja 2 en un hoyo incorrecto
		if(this.physics.world.intersects(this.caja2.body,this.hole1.body)){
			this.caja2.x = this.hole1.x;
			this.caja2.y = this.hole1.y;
			this.caja2Band = true;
			this.contCajasError = 1;

			if(this.caja2.alpha >= 0){
				this.caja2.alpha -= 0.01;
			}
			if(this.caja2.scale >= 0){
				this.caja2.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja2.body,this.hole3.body)){
			this.caja2.x = this.hole3.x;
			this.caja2.y = this.hole3.y;
			this.caja2Band = true;
			this.contCajasError = 1;

			if(this.caja2.alpha >= 0){
				this.caja2.alpha -= 0.01;
			}
			if(this.caja2.scale >= 0){
				this.caja2.scale -= 0.01;
			}
		}

		if(this.physics.world.intersects(this.caja2.body,this.hole4.body)){
			this.caja2.x = this.hole4.x;
			this.caja2.y = this.hole4.y;
			this.caja2Band = true;
			this.contCajasError = 1;

			if(this.caja2.alpha >= 0){
				this.caja2.alpha -= 0.01;
			}
			if(this.caja2.scale >= 0){
				this.caja2.scale -= 0.01;
			}
		}

    	if(this.contCajas == 4){
			console.log('Puzzle de cajas resuelto');
        	//se revela todo el mapa
			this.scene.stop('MinimapS');
			this.scene.launch('MinimapS', 1);
			this.blockedMap.destroy();
		}else if(this.contCajasError==1){
			console.log('TIRASTE UNA CAJA EN UN HOYO INCORRECTO...');
		}

	//Reaparición de cajas
	if(this.physics.world.intersects(this.jorge.body,this.redButtonUnpressed.body)&&this.contCajas!=4){
		this.redButtonUnpressed.setVisible(false);
		this.contCajas = 0;
		this.contCajasError = 0;
		this.caja1.x = 450;
		this.caja1.y = 300;
		this.caja1.setAlpha(1);
		this.caja1.setScale(1.5);
		this.caja1Band = false;

		this.caja2.x = 710;
		this.caja2.y = 210;
		this.caja2.setAlpha(1);
		this.caja2.setScale(1.5);
		this.caja2Band = false;

		this.caja3.x = 1090;
		this.caja3.y = 596;
		this.caja3.setAlpha(1);
		this.caja3.setScale(1.5);
		this.caja3Band = false;

		this.caja4.x = 1400;
		this.caja4.y = 540;
		this.caja4.setAlpha(1);
		this.caja4.setScale(1.5);
		this.caja4Band = false;

		// las estatuas vuelven a aparecer
		this.statue1.anims.play("statue1_idle");
		this.statue2.anims.play("statue2_idle");
		this.statue3.anims.play("statue3_idle");
		this.statue4.anims.play("statue4_idle");
		
    //se reinicia el contador
		this.scene.stop('CajasS');
		this.scene.launch('CajasS', 10);
    
	}else{
		this.redButtonUnpressed.setVisible(true);
	}	

		// Pista
		if(this.physics.world.intersects(this.jorge.body,this.hojita.body)){
			this.pista1.setVisible(true);
		} else {
			this.pista1.setVisible(false);
		}
		
//Si Jorge cae en un hueco no debería poder saltar o salir de el, ¿verdad?

	if(this.Banhue1==1||this.Banhue2==1||this.Banhue3==1||this.Banhue4==1||this.BanBH1==1||this.BanBH2==1){
		this.bandSalto=false;
		this.jorge_pasos.pause();
		this.jorge_saltar.pause();
		this.jorgeJump.setVisible(0);
		this.jorge.setVisible(1);
	}else{
		this.bandSalto=this.cursor.space.isDown;
	}

	//Si Jorge se cae en un hueco...
	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.hole1.body)){
		this.jorge.x=this.hole1.x;
		this.jorge.y=this.hole1.y;

		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;

		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;
			this.bandCaida=true;
			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
			//this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut');

			//console.log(this.cameras.main.zoomTo);
			
		}
		//this.cameras.main.zoomTo(3, 1000, 'Sine.easeInOut');
		//this.cameras.main.fadeOut(2000);
		
		
		
		this.Banhue1 = 1 ;
	}else{
		if (this.Banhue1==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.Banhue1=0;
			this.bandCaida=false;
			//this.cameras.main.zoomTo(-1, 'Sine.easeInOut');
			//this.cameras.main.fadeOut(2000);
			//this.cameras.main.zoomTo(-3, 1000, 'Sine.easeInOut'); 
			//this.cameras.fadeOut(2000);
			//this.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => { 
				 //proporción, duración, interpolación 
			//	this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut'); 
			//});
		}
	}

	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.hole2.body)){
		this.jorge.x=this.hole2.x;
		this.jorge.y=this.hole2.y;
		this.bandCaida=true;
		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;
      
		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;

			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
		}
	this.Banhue2=1;
	}else{
		if (this.Banhue2==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.Banhue2=0;
			this.bandCaida=false;
		}
	}
    
	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.hole3.body)){
		this.jorge.x=this.hole3.x;
		this.jorge.y=this.hole3.y;
		this.bandCaida=true;
		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;
		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;
			this.bandCaida=true;
			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
		}
	this.Banhue3=1;
	}else{
		if (this.Banhue3==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.Banhue3=0;
			this.bandCaida=false;
		}
	}


	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.hole4.body)){
		this.jorge.x=this.hole4.x;
		this.jorge.y=this.hole4.y;

		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;
		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;
			this.bandCaida=true;
			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
		}
	this.Banhue4=1;
	}else{
		if (this.Banhue4==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.Banhue4=0;
			this.bandCaida=false;
		}
	}  

	//Si Jorge cae en un hoyo grande...
	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.bigHole1.body)){
		this.jorge.x=this.bigHole1.x;
		this.jorge.y=this.bigHole1.y;

		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;
		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;
			this.bandCaida=true;
			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
		}
	this.BanBH1=1;
	}else{
		if (this.BanBH1==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.BanBH1=0;
			this.bandCaida=false;
		}
	}

	if(!this.bandSalto&&this.physics.world.intersects(this.jorge.body,this.bigHole2.body)){
		this.jorge.x=this.bigHole2.x;
		this.jorge.y=this.bigHole2.y;

		if(this.jorge.alpha >= 0){
			this.jorge.alpha -= 0.01;
      this.jorgeJump.alpha -= 0.01;
		}
		if(this.jorge.scale >= 0){
			this.jorge.scale -= 0.04;
      this.jorgeJump.scale -= 0.04;
		}

		if(this.jorge.alpha <= 0 && this.jorge.scale <= 0){
			this.jorge.x=200;
			this.jorge.y=150;
			this.bandCaida=true;
			this.jorge.setAlpha(1);
			this.jorge.setDisplaySize(40,44);
      this.jorgeJump.setAlpha(1);
			this.jorgeJump.setScale(3.2);
		}
	this.BanBH2=1;
	}else{
		if (this.BanBH2==1&&this.bandCaida){
			//pierde vida
			if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
			this.BanBH2=0;
			this.bandCaida=false;
		}
	} 
	
	//Efecto de camara jugador se acaba sus vidas
	if(this.VidasJugador<=1 && this.BanMuert<=1){

		this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut');
		this.BanMuert=1;

	}

  if(this.VidasJugador<=0 && this.BanMuert==1){
		
		//this.cameras.main.fadeOut(2000);
		
		this.BanMuert=2;
		this.scene.pause('Cueva1S');
		this.corazonS.pause();
		setTimeout(() => {
            this.musicaF.pause();
            this.scene.launch('Muerte');
        }, 3000);
	}
    
	   
  }
}

export default Cueva1S;