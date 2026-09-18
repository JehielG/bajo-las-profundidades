class StartScreen extends Phaser.Scene{
    constructor(){
        super({
            key: 'StartScreen'
        });
    }

    init() {
        console.log('Start Menu Scene');
    }
    
    preload() {
		this.load.path = './assets/StartScreen/';
		this.load.image(['logoPFG', 'bg_menu', 'btJugar', 'btCreditos', 'seleccion', 'logoG', 'controlesStartScreen']);
		// musica de fondo
		this.load.audio('sonidof',['musicaFondoStart.mp3']);
		//this.load.audio('sboton',['SBoton.wav']);
		this.load.audio('selsfx','selsfx.mp3');
		this.load.audio('chgsfx','chgsfx.mp3');
		
		this.load.audio('nope','Nope.mp3');      
    }

    create(){
        //this.scene.start('JuyoS');
        this.colorGris = 0xa9a9a9;
        this.escalaBtChico = 0.8;
        this.escalaBtFull = 0.95;
      
        this.btJugarSeleccionado = true;
        this.btCreditosSeleccionado = false;

        //Efectos de sonido
        //Musica de fondo
        this.sonidof = this.sound.add('sonidof');
        this.sonidof.loop = true;
        this.sonidof.setVolume(.4);
        this.sonidof.play();

		this.selected = this.sound.add('selsfx');
      	this.selected.setVolume(8);

		this.seleccion = this.sound.add('chgsfx');
      	this.seleccion.setVolume(.3);


        //Menu
      
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.cursor = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(keyCodes.ENTER);
      
        this.bg_menu0 = this.add.image(0,722, 'bg_menu').setOrigin(0,1);
        this.bg_menu1 = this.add.image(0,720, 'bg_menu').setOrigin(0,0);
        this.bg_menu2 = this.add.image(0,720, 'bg_menu').setOrigin(0,0);
      
        this.logoPFG = this.add.image(15,705, 'logoPFG')
            .setOrigin(0,1)
            .setScale(0.3);
        this.imgControles = this.add.image(1265,705, 'controlesStartScreen')
            .setOrigin(1,1)
            .setScale(0.6);

        this.logo = this.add.image(640, 240, 'logoG');
        this.imgSeleccion = this.add.image(640,500, 'seleccion');
        this.btJugar = this.add.image(640,500, 'btJugar').setScale(this.escalaBtFull);
        this.btCreditos = this.add.image(640,570, 'btCreditos')
            .setScale(this.escalaBtChico)
            .setTint(this.colorGris);

        
        // --------------- ANIMACION BOTONES ---------------
        this.btJugarPulsa = this.tweens.createTimeline({
            targets: [this.btJugar],
            paused: true,
            loop: -1,
            tweens: [
                {
                    scale: 1,
                    yoyo: true,
                    duration: 500
                }
            ]
        });
        this.btCreditosPulsa = this.tweens.createTimeline({
            targets: [this.btCreditos],
            paused: true,
            loop: -1,
            tweens: [
                {
                    scale: 1,
                    yoyo: true,
                    duration: 500
                }
            ]
        });
        this.imgSeleccionPulsa = this.tweens.createTimeline({
            targets: [this.imgSeleccion],
            paused: true,
            loop: -1,
            tweens: [
                {
                    scaleX: 1.05,
                    yoyo: true,
                    duration: 300,
                }
            ]
        });

        this.btJugarPulsa.play();
        this.tweens.makeActive(this.btJugarPulsa);
        this.imgSeleccionPulsa.play();
        this.tweens.makeActive(this.imgSeleccionPulsa);

        // --------------- MOVERSE ENTRE OPCIONES ---------------
        // al presionar abajo vamos a los creditos
        this.cursor.down.on('down', () => {
            this.imgSeleccion.setY(575);
            this.btJugarPulsa.stop();
            this.seleccion.play();
            this.btJugar.setScale(this.escalaBtChico);
            this.btJugar.setTint(this.colorGris);
            this.btJugarSeleccionado = false;

            this.btCreditos.setScale(this.escalaBtFull);
            this.btCreditos.clearTint();
            this.btCreditosPulsa.play();
            this.tweens.makeActive(this.btCreditosPulsa);
            this.btCreditosSeleccionado = true;
        });
        // al presionar arriba vamos a jugar
        this.cursor.up.on('down', () => {
            this.imgSeleccion.setY(500);
            this.btCreditosPulsa.stop();
            this.seleccion.play();
            this.btCreditos.setScale(this.escalaBtChico);
            this.btCreditos.setTint(this.colorGris);
            this.btCreditosSeleccionado = false;

            this.btJugar.setScale(this.escalaBtFull);
            this.btJugar.clearTint();
            this.btJugarPulsa.play();
            this.tweens.makeActive(this.btJugarPulsa);
            this.btJugarSeleccionado = true;
        });
      
        // --------------- CAMBIAR DE ESCENA   ---------------
        this.enterKey.on('down',() => {
            if(this.btJugarSeleccionado){
                this.sonidof.pause();
                this.selected.play();
                console.log("Pasa a la escena de IntroS");
                this.scene.start('ControlesS');
            }else{
                if(this.btCreditosSeleccionado){
                    this.sonidof.pause();
                    this.selected.play();
                    console.log("Pasa a la escena de creditoS");
                    this.scene.start('CreditosS');
                }

            }
        })

        // --------------- ANIMACIÓN DEL FONDO ---------------
      
        // img inicial, solo se ve un cachito y después se detiene
        this.fondo0Sube = this.tweens.createTimeline({
            targets: [this.bg_menu0],
            paused: true,
            loop: 0,
            tweens: [
                {
                    y: 0,
                    duration: 6020,
                    onStart: () => {
                        this.fondo1Sube.play();
                        this.tweens.makeActive(this.fondo1Sube);
                    }
                }
            ]
        });
        // img 1
        this.fondo1Sube = this.tweens.createTimeline({
            targets: [this.bg_menu1],
            paused: true,
            loop: 0,
            tweens: [
                {
                    y: -1680,
                    duration: 20000,
                    onComplete: () => {
                        this.fondo2Sube.play();
                        this.tweens.makeActive(this.fondo2Sube);
                    }
                },
                {
                    y: -2420,
                    duration: 6015,
                    onComplete: () => {
                        this.bg_menu1.setY(720);
                    }
                }
            ]
        });
        // img 2
        this.fondo2Sube = this.tweens.createTimeline({
            targets: [this.bg_menu2],
            paused: true,
            loop: 0,
            tweens: [
                {
                    y: -1680,
                    duration: 20000,
                    onComplete: () => {
                        this.fondo1Sube.play();
                        this.tweens.makeActive(this.fondo1Sube);
                    }
                },
                {
                    y: -2420,
                    duration: 6015,
                    onComplete: () => {
                        this.bg_menu2.setY(720);
                    }
                }
            ]
        });

        this.fondo0Sube.play();
    }

    update(time, delta) {
        
    }
}

export default StartScreen;