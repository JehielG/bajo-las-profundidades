class LaboS extends Phaser.Scene{
    constructor(){
        super({
            key: 'LaboS'
        });
    }

    init() {
        console.log('Escena LaboS');
    }
    
    preload() {
        this.load.path = './assets/';
    }

    create() {
        this.add.text(100,100,'Usted esta en LaboS',{color:'#000'});
        setTimeout(() => {
            // Cambia a la siguiente escena
            console.log("Pasa a la escena de Juyos2S");
            this.scene.start('Juyos2S');
        }, 3000); 
    }

    update(time, delta) {
        
    }
}

export default LaboS;