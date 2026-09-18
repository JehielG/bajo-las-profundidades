class Juyos2S extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'Juyos2S' 
        }); 
    } 
	
    init() { 
        console.log('Escena de Juyos 2');
      
    } 

    preload() {
        this.load.path = './assets/JuyoS/';
        this.load.image('jungle_tileset');
		this.load.image(['tablero_borde-abajo', 'cortina', 'tablero', 'fondo-mina','fondo-jungla']);
      
        this.load.tilemapTiledJSON('mapaJuyo', "tablero_juyo.json");
		// Dr Mara
		this.load.atlas("drmara","../anims/DrMara/drmara.png","../anims/DrMara/drmara_atlas.json");
		this.load.animation("drmaraAnim","../anims/DrMara/drmara_anim.json");

		// this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    
		this.load.path = './assets/anims/Juyos/';
		this.load.atlas('rojo', 'rojo.png', 'rojo_atlas.json').atlas('azul', 'azul.png','azul_atlas.json').atlas('amarillo', 'amarillo.png','amarillo_atlas.json').atlas("mega_piedra","mega_piedra.png","mega_piedra_atlas.json");
        this.load.animation('rojoAnim', 'rojo_anim.json' ).animation('azulAnim', 'azul_anim.json').animation('amarilloAnim', 'amarillo_anim.json').animation("mega_piedra_anim","mega_piedra_anim.json");
		

        this.load.audio('mov',['mov2.mp3']);
	}


    create() {
      this.scene.bringToTop('VidasP');
      //Controles
		const keyCodes = Phaser.Input.Keyboard.KeyCodes;
		this.keyA = this.input.keyboard.addKey(keyCodes.A);
		this.keyD = this.input.keyboard.addKey(keyCodes.D);
		this.cursor = this.input.keyboard.createCursorKeys();

		// // TileMap
		// this.mapaJuyo = this.make.tilemap({
		// 	key: "mapaJuyo"
		// });
		// this.tileset = this.mapaJuyo.addTilesetImage("jungle_tileset", "jungle_tileset");

		// this.fondoLayer = this.mapaJuyo.createLayer("Fondo", this.tileset, 0, 0);
		// this.bordeLayer = this.mapaJuyo.createLayer("Borde", this.tileset, 0, 0);
		
  //       // this.sys.animatedTiles.init(this.mapaLava);

		// // Colision del borde
		// this.bordeLayer.setCollisionByProperty({
		// 	collides: true
		// });

		this.fondo = this.add.image(0, 0, 'fondo-jungla').setOrigin(0,0);
		this.tablero = this.add.image(0, 0, 'tablero').setOrigin(0,0);
		this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0,0).setDepth(1);

		this.plataforma = this.add.image(450, 608, 'tablero_borde-abajo');//inicio x=430, fin x=850
		this.physics.add.existing(this.plataforma, false);
		this.plataforma.body.setImmovable(true);
		this.plataforma.body.isStatic = true;
		this.plataforma.body.setAllowGravity(false);

      	this.megaPiedra = this.add.sprite(913,445,"drmara").setScale(5);
		this.megaPiedra.anims.play("drmara_idle");
		
		/*//rojos
		 this.rojosG = this.physics.add.group({ //se modifico para agregarle fisicas
			key: 'rojo', 
			repeat: 1, 
			setXY: { 
				x: 368, 
				y: 96,
				stepX: 32
	
			} 
		}); 
		
		this.rojosG.children.iterate( (rojo_p) => { 
			rojo_p.body.setAllowGravity(true);
		} );
	
		this.rojosG.playAnimation('rojo_p');

		//2
		this.azulesG = this.physics.add.group({ //se modifico para agregarle fisicas
			key: 'azul', 
			repeat: 1, 
			setXY: { 
				x: 432, 
				y: 96,
				stepX: 32
	
			} 
		}); 
		
		this.azulesG.children.iterate( (azul_p) => { 
			azul_p.setScale(1); 
			azul_p.body.setAllowGravity(true);
		} );
	
		this.azulesG.playAnimation('azul_p');
		//3
		this.amarillosG = this.physics.add.group({ //se modifico para agregarle fisicas
			key: 'amarillo', 
			repeat: 1, 
			setXY: { 
				x: 496, 
				y: 96,
				stepX: 32
	
			} 
		}); 
		
		this.amarillosG.children.iterate( (amarillo_p) => { 
			amarillo_p.body.setAllowGravity(true);
		} );
	
		this.amarillosG.playAnimation('amarillo_p');

		
		//---Colisiones
		this.physics.add.collider(this.rojosG, this.plataforma);
		this.physics.add.collider(this.rojosG, this.plataforma, () => {
			console.log("hay colicion entre el grupo 1 y 2")
		});
		this.physics.add.collider(this.azulesG, this.amarillosG, () => {
			console.log("hay colicion entre el grupo 2 y 3")
		});

		this.physics.add.collider(this.azulesG, this.plataforma, () => {
			//console.log("hay colicion entre el grupo 2 y 3")
		});
		this.physics.add.collider(this.amarillosG, this.plataforma);
*/


		//this.physics.add.collider(this.azulG, this.bordeLayer);
		
		//console.log(this.grupojuyos.getChildren());
		
		//this.physics.add.collider(this.grupojuyos, this.bordeLayer);

        /*setTimeout(() => {
            // Cambia a la siguiente escena
            console.log("Pasa a la escena de BaseS");
            this.scene.start('BaseS',this.totalVidas);
        }, 3000);*/
		this.bandCambio = true;

		this.aleatorio = Math.floor(Math.random()*3);
			console.log(this.aleatorio);
			switch (this.aleatorio) {
				case 0:
					this.juyosArray = [this.physics.add.image(432,46,'rojo')];
					break;
				case 1:
					this.juyosArray = [this.physics.add.image(432,46,'azul')];
					break;
				case 2:
					this.juyosArray = [this.physics.add.image(432,46,'amarillo')];
					break;	
			}

		this.aleatorio = Math.floor(Math.random()*3);
			console.log(this.aleatorio);
			switch (this.aleatorio) {
				case 0:
					this.juyosArray.push(this.physics.add.image(432,13,'rojo'));
					break;
				case 1:
					this.juyosArray.push(this.physics.add.image(432,13,'azul'));
					break;
				case 2:
					this.juyosArray.push(this.physics.add.image(432,13,'amarillo'));
					break;	
			}	

		this.juyosArray[0].body.setMaxVelocityY(100);
		this.juyosArray[0].body.setAllowGravity(false);
		this.juyosArray[0].body.setVelocityY(100);
		this.juyosArray[1].body.setMaxVelocityY(100);
		this.juyosArray[1].body.setAllowGravity(false);
		this.juyosArray[1].body.setVelocityY(100);
    } 

    update(time, delta) { 
		//this.rojosG.setVelocityY(100);
		//this.azulesG.setVelocityY(100);
		//this.grupojuyos.y=this.grupojuyos.y-20;		
this.physics.add.collider(this.juyosArray,this.plataforma);
		this.physics.add.collider(this.juyosArray);

		/*
		if(this.juyosArray.length==6){
			if(this.megaPiedra.anims.currentAnim.key != "mega_piedra_enojo"){
				this.megaPiedra.anims.play("mega_piedra_enojo");
			}
		}
		if(this.juyosArray.length==10){
			if(this.megaPiedra.anims.currentAnim.key != "mega_piedra_feliz"){
				this.megaPiedra.anims.play("mega_piedra_feliz");
			}
		}
		if(this.juyosArray.length==16){
			if(this.megaPiedra.anims.currentAnim.key != "mega_piedra_derrota"){
				this.megaPiedra.anims.play("mega_piedra_derrota");
			}
		}*/
		if(this.juyosArray.length==20){
			// Cambia a la siguiente escena
			if(this.bandCambio){
				console.log("Pasa a la escena de creditos");
				this.scene.start('CreditosS');
				this.bandCambio = false;
			} 
		}

		this.juyosArray[this.juyosArray.length-1].body.setMaxVelocityY(100);
		this.juyosArray[this.juyosArray.length-1].body.setAllowGravity(false);
		this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
		this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
		this.juyosArray[this.juyosArray.length-2].body.setAllowGravity(false);
		this.juyosArray[this.juyosArray.length-2].body.setVelocityY(100);

		if(Phaser.Input.Keyboard.JustDown(this.cursor.left)){
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(0);
			this.juyosArray[this.juyosArray.length-1].x -= 32;
			this.juyosArray[this.juyosArray.length-2].x -= 32;
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
		}
		if(Phaser.Input.Keyboard.JustDown(this.cursor.right)){
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(0);
			this.juyosArray[this.juyosArray.length-1].x += 32;
			this.juyosArray[this.juyosArray.length-2].x += 32;
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
		}
		if(Phaser.Input.Keyboard.JustDown(this.keyA)){
			console.log(">:v");
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(0);
			//queda arriba
			if(this.juyosArray[this.juyosArray.length-1].x == this.juyosArray[this.juyosArray.length-2].x && this.juyosArray[this.juyosArray.length-2].y == this.juyosArray[this.juyosArray.length-1].y+33){
				this.juyosArray[this.juyosArray.length-1].x-=32;
				this.juyosArray[this.juyosArray.length-1].y+=33;
				//this.mov.play();
			}else//queda izquierda
			if(this.juyosArray[this.juyosArray.length-2].x == this.juyosArray[this.juyosArray.length-1].x+32 && this.juyosArray[this.juyosArray.length-1].y == this.juyosArray[this.juyosArray.length-2].y){
				this.juyosArray[this.juyosArray.length-1].x+=32;
				this.juyosArray[this.juyosArray.length-1].y+=33;
				//this.mov.play();
			}else//queda abajo
			if(this.juyosArray[this.juyosArray.length-1].x == this.juyosArray[this.juyosArray.length-2].x && this.juyosArray[this.juyosArray.length-2].y == this.juyosArray[this.juyosArray.length-1].y-33){
				this.juyosArray[this.juyosArray.length-1].x+=32;
				this.juyosArray[this.juyosArray.length-1].y-=33;
				//this.mov.play();
			}else//queda derecha
			if(this.juyosArray[this.juyosArray.length-2].x == this.juyosArray[this.juyosArray.length-1].x-32 && this.juyosArray[this.juyosArray.length-1].y == this.juyosArray[this.juyosArray.length-2].y){
				this.juyosArray[this.juyosArray.length-1].x-=32;
				this.juyosArray[this.juyosArray.length-1].y-=33;
				//this.mov.play();
			}
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
		}
		if(Phaser.Input.Keyboard.JustDown(this.keyD)){
			console.log("v:<");
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(0);
			//queda arriba
			if(this.juyosArray[this.juyosArray.length-1].x == this.juyosArray[this.juyosArray.length-2].x && this.juyosArray[this.juyosArray.length-2].y == this.juyosArray[this.juyosArray.length-1].y+33){
				this.juyosArray[this.juyosArray.length-1].x+=32;
				this.juyosArray[this.juyosArray.length-1].y+=33;
				//this.mov.play();
			}else//queda derecha
			if(this.juyosArray[this.juyosArray.length-2].x == this.juyosArray[this.juyosArray.length-1].x-32 && this.juyosArray[this.juyosArray.length-1].y == this.juyosArray[this.juyosArray.length-2].y){
				this.juyosArray[this.juyosArray.length-1].x-=32;
				this.juyosArray[this.juyosArray.length-1].y+=33;
				//this.mov.play();
			}else//queda abajo
			if(this.juyosArray[this.juyosArray.length-1].x == this.juyosArray[this.juyosArray.length-2].x && this.juyosArray[this.juyosArray.length-2].y == this.juyosArray[this.juyosArray.length-1].y-33){
				this.juyosArray[this.juyosArray.length-1].x-=32;
				this.juyosArray[this.juyosArray.length-1].y-=33;
				//this.mov.play();
			}else//queda izquierda
			if(this.juyosArray[this.juyosArray.length-2].x == this.juyosArray[this.juyosArray.length-1].x+32 && this.juyosArray[this.juyosArray.length-1].y == this.juyosArray[this.juyosArray.length-2].y){
				this.juyosArray[this.juyosArray.length-1].x+=32;
				this.juyosArray[this.juyosArray.length-1].y-=33;
				//this.mov.play();
			}
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
		}


		//WARNIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIINNG!!!! DON'T TOUCH IT >>>>>:v
		/*if(this.cursor.down.isDown){
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(200);
			this.juyosArray[this.juyosArray.length-1].body.setMaxVelocityY(200);
			this.juyosArray[this.juyosArray.length-2].body.setVelocityY(200);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(200);
		}else{
			this.juyosArray[this.juyosArray.length-1].body.setMaxVelocityY(100);
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(100);
			this.juyosArray[this.juyosArray.length-2].body.setVelocityY(100);
		}*/

		if(this.juyosArray[this.juyosArray.length-1].body.touching.down&&this.juyosArray[this.juyosArray.length-2].body.touching.down){
			this.juyosArray[this.juyosArray.length-1].body.setMaxVelocityY(0);
			this.juyosArray[this.juyosArray.length-1].body.setAllowGravity(false);
			this.juyosArray[this.juyosArray.length-1].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-1].body.isStatic = true;

			this.juyosArray[this.juyosArray.length-2].body.setMaxVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.setAllowGravity(false);
			this.juyosArray[this.juyosArray.length-2].body.setVelocityY(0);
			this.juyosArray[this.juyosArray.length-2].body.isStatic = true;
			
			this.aleatorio = Math.floor(Math.random()*3);
			console.log(this.aleatorio);
			switch (this.aleatorio) {
				case 0:
					this.juyosArray.push(this.physics.add.image(432,46,'rojo'));
					break;
				case 1:
					this.juyosArray.push(this.physics.add.image(432,46,'azul'));
					break;
				case 2:
					this.juyosArray.push(this.physics.add.image(432,46,'amarillo'));
					break;	
			}

			this.aleatorio = Math.floor(Math.random()*3);
			console.log(this.aleatorio);
			switch (this.aleatorio) {
				case 0:
					this.juyosArray.push(this.physics.add.image(432,13,'rojo'));
					break;
				case 1:
					this.juyosArray.push(this.physics.add.image(432,13,'azul'));
					break;
				case 2:
					this.juyosArray.push(this.physics.add.image(432,13,'amarillo'));
					break;	
			}
			//this.juyosArray.push(this.physics.add.image(432,46,'rojo'));
			//this.juyosArray[this.juyosArray.length-1].body.setMass(0.01);
			//this.juyosArray[this.juyosArray.length-1].body.isStatic = true;
		}
    } 
} 
export default Juyos2S;