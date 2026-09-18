class MinimapS extends Phaser.Scene{ 
    constructor(){ 
        super({ 
            key: 'MinimapS' 
        }); 
    } 
    init(eMapa) { 
        console.log('Escena con el minimapa'); 
        this.EstadoM = eMapa;
    } 

    preload() {
        this.load.path = './assets/MinimapS/';
        this.load.image('mapa_old', 'cave_floor1_mini_map.png');
        this.load.image('mapa_cut', 'cave_floor1_mini_map_cut.png');
        this.load.image('mapa_full', 'cave_floor1_mini_map_full.png');
       this.load.image('mp', 'ping.png')
    }


    create() { 

       this.mp = this.add.image(50, 640, 'mp').setDepth(3);

        this.registry.events.on('posC', (posx,posy) => { 
            //console.log('La posicion cambio, nueva posicion: ', posx, "," , posy); 
            this.mp.x = posx/11 + 33;
            this.mp.y = posy/12 + 630;
        });

      
        this.minimap_cut = this.add.image(20, 700, 'mapa_cut').setOrigin(0,1);
        this.minimap_full = this.add.image(20, 700, 'mapa_full').setOrigin(0,1).setVisible(false);
        //this.fondoV.setScale(1.1,1)

		// evento:
      if(this.EstadoM==1){
            this.minimap_full.setVisible(1);
        }
		// minimap_cut false
		// minimap_full true visible
    } 

    update(time, delta) { 

    } 
} 
export default MinimapS;