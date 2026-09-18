class VidasP extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'VidasP' 
        }); 
    } 
    init(VidasT) { 
        console.log('Escena Vidas del Personaje'); 
        this.TotalVidas = VidasT; 
    } 

    preload() {
        this.load.path = './assets/VidasP/';
        this.load.image(['CorazonC','CorazonR','fondoCor']);

    }


    create() { 

        this.fondoV = this.add.image(40, 20, 'fondoCor');
        this.fondoV.setScale(1.1,1)
        this.Vida1 = this.add.image(20, 20, 'CorazonC');
        this.Vida2 = this.add.image(40, 20, 'CorazonC');
        this.Vida3 = this.add.image(60, 20, 'CorazonC');
        //this.Vida3.setVisible(0);

        this.VidaR1 = this.add.image(20, 20, 'CorazonR');
        this.VidaR1.setVisible(0);
        this.VidaR2 = this.add.image(40, 20, 'CorazonR');
        this.VidaR2.setVisible(0);
        this.VidaR3 = this.add.image(60, 20, 'CorazonR');
        this.VidaR3.setVisible(0); 

        console.log("Tiene un total de: ",this.TotalVidas," Vidas");

        //Evalua cuantas vidas se tiene
        switch (this.TotalVidas) {
            case 1:
              //le queda 1 vida
              this.VidaR2.setVisible(1);
              this.VidaR3.setVisible(1);
              break;
            case 2:
              //le queda 2 vida
              this.VidaR3.setVisible(1);
              break;
            case 3:
              //le queda 3 vida
              
              break;
            default:
              this.VidaR1.setVisible(1);
              this.VidaR2.setVisible(1);
              this.VidaR3.setVisible(1);
              this.fondoV.setTint(0xFF0000);
              console.log("Se le acabaron las vidas");
              this.cameras.main.fadeOut(2000);
          } 


    } 

    update(time, delta) { 

    } 
} 
export default VidasP;