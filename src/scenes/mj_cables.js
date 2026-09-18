class mj_cables extends Phaser.Scene{ 
    constructor(){ 
        super({ key: 'mj_cables' 
    }); 
    } 

    preload(){
        this.load.path = './assets/mj_cables/';
        this.load.image(['cajitafinal', 'f3', 'f4', 'f5', 'f6', 'focoE', 'focoA']);
        this.load.audio('ambiente',['ambiente.mp3']);
        this.load.audio('switchfx',['switchfx.mp3']);
        this.load.audio('complete',['complete.mp3']);
    }

    init(dato) { 
        console.log('Escena minijuego reaparar ascensor'); 
    }
    create() { 

        this.sfxAmbiente = this.sound.add('ambiente').setVolume(1.5);
        this.sfxAmbiente.loop = true;
        this.sfxAmbiente.play();

        this.conectsfx = this.sound.add('switchfx');
        this.completefx = this.sound.add('complete');
        
this.VidasJugador = 3;
        this.scene.launch('VidasP', 3);
        //sonido de corazon a 1 de vida
		this.corazonS = this.sound.add('corazons');
        this.corazonS.pause();
		this.corazonS.loop = true;
		this.corazonS.setVolume(.5);

        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE, () => { 
            console.log("Se ha completado el Zoom"); 
			//this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut');
			this.cameras.main.fadeOut(2000);
      		this.corazonS.play();
        });


        this.fondo = this.add.image(440, 340, 'cajitafinal');
        this.foco1 = this.add.image(290, 410, 'focoE').setTint('0xCF0E0E');
        this.foco2 = this.add.image(390, 410, 'focoE').setTint('0xCF0E0E');
        this.foco3 = this.add.image(490, 410, 'focoE').setTint('0xCF0E0E');
        this.foco4 = this.add.image(590, 410, 'focoE').setTint('0xCF0E0E');
        this.add.image(290, 410, 'focoA');
        this.add.image(390, 410, 'focoA');
        this.add.image(490, 410, 'focoA');
        this.add.image(590, 410, 'focoA');
        this.fd5 = this.add.image(285, 322, 'f5').setInteractive();
        this.fd5.setAlpha(0.01);
        this.fd5.input.dropZone = true;
        this.fd4 = this.add.image(382, 320, 'f4').setInteractive();
        this.fd4.setAlpha(0.001);
        this.fd4.input.dropZone = true;
        this.fd3 = this.add.image(480, 315, 'f3').setInteractive();
        this.fd3.setAlpha(0.001);
        this.fd3.input.dropZone = true;
        this.fd6 = this.add.image(585, 315, 'f6').setInteractive();
        this.fd6.setAlpha(0.001);
        this.fd6.input.dropZone = true;
        this.f3 = this.add.image(470, 540, 'f3').setInteractive();
        this.f4 = this.add.image(510, 540, 'f4').setInteractive();
        this.f5 = this.add.image(550, 540, 'f5').setInteractive();
        this.f6 = this.add.image(590, 540, 'f6').setInteractive();

        this.input.setDraggable(this.f3);
        this.input.setDraggable(this.f4);
        this.input.setDraggable(this.f5);
        this.input.setDraggable(this.f6);

        this.puntos = 0;



    const eventos = Phaser.Input.Events;

    this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => { 
        obj.setScale(0.9); 
    });

        this.input.on(eventos.DRAG, (pointer, obj, dragX, dragY) => {
            obj.x = dragX;
            obj.y = dragY;
            });

    this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {
        obj.setScale(1.0);
        if ( !dropzone ) {
            obj.x = obj.input.dragStartX;
            obj.y = obj.input.dragStartY;
          if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
        }
    });


    this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
        this.conectsfx.play();
        if(obj.texture.key == dropzone.texture.key){
        obj.disableInteractive();
        this.puntos++;
        obj.x = dropzone.x;
        obj.y = dropzone.y;
        if(dropzone.texture.key == 'f3'){
            this.foco3.setTint('0x39FF14');
        }
        if(dropzone.texture.key == 'f4'){
            this.foco2.setTint('0x39FF14');
        }
        if(dropzone.texture.key == 'f5'){
            this.foco1.setTint('0x39FF14');
        }
        if(dropzone.texture.key == 'f6'){
            this.foco4.setTint('0x39FF14');
        }
        //condicion de victoria
        if(this.puntos == 4){
            this.sfxAmbiente.stop();
            this.completefx.play();
            this.registry.events.emit('completo', true);
            }
        }else{
            if (this.VidasJugador == 1) {
				this.VidasJugador -=2;	
			}
			this.VidasJugador -=1;
			this.scene.stop('VidasP');
			this.scene.launch('VidasP', this.VidasJugador);
			console.log("Pierde vida en boton, Vidas sobrantes: ",this.VidasJugador);
        }
    });
    }
    update(time, delta) {
       if(this.puntos==4){
            this.corazonS.stop();
        }
      if(this.VidasJugador<=1){

            this.cameras.main.zoomTo(1, 1000, 'Sine.easeInOut');
            //console.log("una vida");
            //this.BanMuert=1;
    
        }
    
      if(this.VidasJugador<=0){
            
            //this.cameras.main.fadeOut(2000);
            
            //this.BanMuert=2;
            this.scene.pause('mj_cables');
            this.corazonS.pause();
            setTimeout(() => { 
                this.scene.launch('Muerte');
            }, 3000);
        }
    }

} 

export default mj_cables;