class Muerte extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'Muerte' 
        }); 
    } 
    init() { 
        console.log('Escena de muerte'); 
    } 

    preload() {
        this.load.path = './assets/Muerte/';
        this.load.image(['Pantallademuerte']);
        this.load.path = './assets/LavaS/';
        this.load.image(['BotonReintentar']);
    }


    create() {
        const eventos = Phaser.Input.Events;

        this.fM = this.add.image(640, 360, 'Pantallademuerte');
        this.botonReintentar = this.add.image(640, 490, 'BotonReintentar').setInteractive();
		this.botonReintentar.name='reintentar';
		this.botonReintentar.setScale(.3);

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

        this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject)=>{
            //oprime reintentar
			if(gameObject.name == "reintentar"){
                console.log("El jugador iniciara desde el principio");
                this.scene.stop('IntroS');
                this.scene.stop('Cueva0S');
                this.scene.stop('Cueva1S');
                this.scene.stop('Cueva2S');
                this.scene.stop('Juyos1S');
                this.scene.stop('BaseS');
                this.scene.stop('MinimapS');
                this.scene.stop('mj_cables');
                this.scene.stop('VidasP');
                this.scene.stop('CajasS');
                this.scene.stop('ElevadorS');
                this.scene.stop('LavaS');
                this.scene.start('StartScreen');
                this.scene.bringToTop('StartScreen');

			}

        });
        
 
    } 

    update(time, delta) { 

    } 
} 
export default Muerte;