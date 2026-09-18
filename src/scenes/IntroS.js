class IntroS extends Phaser.Scene{
    constructor(){
        super({
            key: 'IntroS'
        });
    }

    init() {
        console.log('Escena IntroS');
    }
    
    preload() {
        this.load.path = './assets/IntroS/';
        //this.load.image(["laboratorio","sismografo","confundidos","casita2","comida","ganbatte"]);
        this.load.image("laboratorio","laboratorio.jpg");
        this.load.image("sismografo","sismografo.jpg");
        this.load.image("confundidos","confundidos.jpg");
        this.load.image("casita2","casita2.jpg");
        this.load.image("comida","comida.jpg");
        this.load.image("ganbatte","ganbatte.jpg");
    }

    create() {
        this.add.text(100,100,'Usted esta en IntroS',{color:'#000'});

        this.intro1 = this.add.image(0,0,"laboratorio").setOrigin(0,0);
        this.intro2 = this.add.image(0,0,"sismografo").setOrigin(0,0);
        this.intro3 = this.add.image(0,0,"confundidos").setOrigin(0,0);
        this.intro4 = this.add.image(0,0,"casita2").setOrigin(0,0);
        this.intro5 = this.add.image(0,0,"comida").setOrigin(0,0);
        this.intro6 = this.add.image(0,0,"ganbatte").setOrigin(0,0);

        const camera1 = this.cameras.add(0,0,1280,720);
        camera1.ignore([this.intro2,this.intro3,this.intro4,this.intro5,this.intro6]);

        const camera2 = this.cameras.add(0,0,1280,720);
        camera2.ignore([this.intro1,this.intro3,this.intro4,this.intro5,this.intro6]);
        camera2.setVisible(false);

        const camera3 = this.cameras.add(0,0,1280,720);
        camera3.ignore([this.intro1,this.intro2,this.intro4,this.intro5,this.intro6]);
        camera3.setVisible(false);

        const camera4 = this.cameras.add(0,0,1280,720);
        camera4.ignore([this.intro1,this.intro2,this.intro3,this.intro5,this.intro6]);
        camera4.setVisible(false);

        const camera5 = this.cameras.add(0,0,1280,720);
        camera5.ignore([this.intro1,this.intro2,this.intro3,this.intro4,this.intro6]);
        camera5.setVisible(false);

        const camera6 = this.cameras.add(0,0,1280,720);
        camera6.ignore([this.intro1,this.intro2,this.intro3,this.intro4,this.intro5]);
        camera6.setVisible(false);

        camera1.fadeIn(2000).shake(7000,0.005);
        camera1.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera1.fadeOut(2000);
            }, 3000);
        });

        camera1.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            camera2.setVisible(true);
            camera2.fadeIn(2000);
        });

        camera2.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera2.fadeOut(2000);
            }, 3000);
        });

        camera2.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            camera3.setVisible(true);
            camera3.fadeIn(2000);
        });

        camera3.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera3.fadeOut(2000);
            }, 3000);
        });

        camera3.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            camera4.setVisible(true);
            camera4.fadeIn(2000);
        });

        camera4.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera4.fadeOut(2000);
            }, 3000);
        });

        camera4.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            camera5.setVisible(true);
            camera5.fadeIn(2000);
        });

        camera5.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera5.fadeOut(2000);
            }, 3000);
        });

        camera5.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            camera6.setVisible(true);
            camera6.fadeIn(2000);
        });

        camera6.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera6.fadeOut(2000);
            }, 3000);
        });

        camera6.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.cameras.main.cameraManager.remove(camera1);
            //console.log("fin de las cámaras");
            /*camera1.setVisible(false);
            camera2.setVisible(false);
            camera3.setVisible(false);
            camera4.setVisible(false);
            camera5.setVisible(false);
            camera6.setVisible(false);*/
            // Cambia a la siguiente escena
            console.log("Pasa a la escena de Cueva0S");
            this.scene.start('Cueva0S');
        });

        /*const camera1 = this.cameras.add(0,0,1280,720).fadeIn(2000);
        camera1.ignore([this.intro2,this.intro3,this.intro4,this.intro5,this.intro6]);

        camera1.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout( () => {
                camera1.fadeOut(2000);
            }, 3000);
        });*/



        /*setTimeout(() => {
            // Cambia a la siguiente escena
            console.log("Pasa a la escena de Cueva0S");
            this.scene.start('Cueva0S');
        }, 3000); */
    }

    update(time, delta) {
        
    }
}

export default IntroS;