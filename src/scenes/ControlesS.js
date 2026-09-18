class ControlesS extends Phaser.Scene{pausar 
    constructor(){
        super({
            key: 'ControlesS'
        });
    }

    init() {
            console.log('Start Menu Scene');
        }
        
        preload() {
    		this.load.path = './assets/StartScreen/';
    		this.load.image(['logoPFG', 'bg_menu', 'btJugar', 'btCreditos', 'seleccion', 'logoG', 'controlesStartScreen', 'controlesT']);
    		// musica de fondo
    		this.load.audio('sonidof',['musicaFondoStart.mp3']);
    		//this.load.audio('sboton',['SBoton.wav']);
    		this.load.audio('selsfx','selsfx.mp3');
    		this.load.audio('chgsfx','chgsfx.mp3');
    		
        }

        create(){
            //this.scene.start('JuyoS');
            this.colorGris = 0xa9a9a9;
            this.escalaBtChico = 0.8;
            this.escalaBtFull = 0.95;
          
            this.btJugarSeleccionado = true;
            this.btControlesSeleccionado = false;

            //Efectos de sonido

            //Menu
          
            const keyCodes = Phaser.Input.Keyboard.KeyCodes;
            this.enterKey = this.input.keyboard.addKey(keyCodes.ENTER);
    
            this.bg_menu0 = this.add.image(0,722, 'bg_menu').setOrigin(0,1);
            this.bg_menu1 = this.add.image(0,720, 'bg_menu').setOrigin(0,0);
            this.bg_menu2 = this.add.image(0,720, 'bg_menu').setOrigin(0,0);

            this.add.image(0,0,"controlesT").setOrigin(0,0);


            
            // --------------- CAMBIAR DE ESCENA   ---------------
            this.enterKey.on('down', () => {
                console.log("Pasa a la escena de intro");
                // this.scene.start('IntroS');
                this.scene.start('Cueva0S');
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

export default ControlesS;