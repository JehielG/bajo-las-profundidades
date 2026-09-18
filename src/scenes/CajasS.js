class CajasS extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'CajasS' 
        }); 
    } 
    init(CajasD) { 
        console.log('Escena cajas depositadas'); 
        //console.log('Has agregado', CajasD, 'cajas'); 
        this.total = CajasD;
    } 

    preload() {
        this.load.path = './assets/CajasS/';
        this.load.image(['c0','c1','c2','c3','c4']);
    }


    create() {
        this.c0 = this.add.image(40, 50, 'c0');
        this.c0.setScale(1.1,1);
        
        this.c1 = this.add.image(40, 50, 'c1');
        this.c1.setScale(1.1,1);
        this.c1.setVisible(0);
        this.c2 = this.add.image(40, 50, 'c2');
        this.c2.setScale(1.1,1);
        this.c2.setVisible(0);
        this.c3 = this.add.image(40, 50, 'c3');
        this.c3.setScale(1.1,1);
        this.c3.setVisible(0);
        this.c4 = this.add.image(40, 50, 'c4');
        this.c4.setScale(1.1,1);
        this.c4.setVisible(0);
        
		if(this.total!=10){
			console.log('Tengo', this.total, ' cajas');
		} else console.log('Tengo 0 cajas :c'); 


        //Evalua cuantas cajas de tiene
        switch (this.total) {
            case 1:
              //se deposito caja 4
              this.c1.setVisible(1);
              break;
            case 2:
              //se deposito caja 1
              this.c2.setVisible(1);
              break;
            case 3:
              //se deposito caja 3
              this.c3.setVisible(1);
              break;
            case 4:
              //se deposito caja 2
              this.c4.setVisible(1);
              this.c4.setTint(0x333333);
              break;
            default:
              this.c0.setVisible(1);
          } 

        


    } 

    update(time, delta) { 

    } 
} 
export default CajasS;