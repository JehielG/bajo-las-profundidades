class JunglaS extends Phaser.Scene{
    constructor(){
        super({
            key: 'JunglaS'
        });
    }

    init() {
        console.log('Escena JunglaS');
    }
    
    preload() {
        this.load.path = './assets/JunglaS/';
        this.load.image(['jungle_tileset','jungle']);
        this.load.tilemapTiledJSON('jungla',"jungla-tiled.json");

      //jungla
        this.load.audio('SoJungla','../Sound/Jungla.mp3'); 

        this.load.path = './assets/';

        // Animaciones
		// Jorge
		this.load.atlas("jorge","anims/jorge.png","anims/jorge_atlas.json");
		this.load.animation("jorgeAnim","anims/jorge_anim.json");
        // Isabella
        this.load.atlas("isabella","anims/Isabella/isabella.png","anims/Isabella/isabella_atlas.json");
        this.load.animation("isabellaAnim","anims/Isabella/isabella_anim.json");
        // Anselmo
        this.load.atlas("anselmo","anims/Anselmo/anselmo.png","anims/Anselmo/anselmo_atlas.json");
        this.load.animation("anselmoAnim","anims/Anselmo/anselmo_anim.json");
        this.load.audio('pasos',['Sound/pasos.mp3']);
    }

    create() {
      //Musica de fondo jungla
        this.sonidof = this.sound.add('SoJungla');
        this.sonidof.loop = true;
        this.sonidof.setVolume(.2);
        this.sonidof.play();
        //this.add.text(100,100,'Usted esta en JunglaS');
        this.cursor = this.input.keyboard.createCursorKeys();
        this.jungla = this.make.tilemap({
            key: 'jungla'
        });
        this.tileset1 = this.jungla.addTilesetImage('jungle_tileset','jungle_tileset');
        this.tileset2 = this.jungla.addTilesetImage('jungle','jungle');

        this.capa1 = this.jungla.createLayer("Capa de patrones 1",[this.tileset1,this.tileset2],0,0);
        this.capa2 = this.jungla.createLayer("Capa de patrones 2",[this.tileset1,this.tileset2],0,0);
        this.capa3 = this.jungla.createLayer("Capa de patrones 3",[this.tileset1,this.tileset2],0,0);
        this.capa4 = this.jungla.createLayer("Capa de patrones 4",[this.tileset1,this.tileset2],0,0);

        this.capa1.setDisplaySize(1280,720);
        this.capa2.setDisplaySize(1280,720);
        this.capa3.setDisplaySize(1280,720);
        this.capa4.setDisplaySize(1280,720);

        this.jorge = this.add.sprite(-32,240,'jorge').setScale(3);
        //this.jorge.anims.play("jorge_right_walk");
        this.anselmo = this.add.sprite(-64,240,'anselmo').setScale(3);
        //this.anselmo.anims.play("anselmo_walk");
        this.isabella = this.add.sprite(-96,240,'isabella').setScale(3);
        //this.isabella.anims.play("isabella_walk");

        this.jorge_pasos = this.sound.add('pasos');
		this.jorge_pasos.loop = true;
		this.jorge_pasos.setVolume(.7);

        this.cameras.main.setBounds(0,0,1280,720);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.jorge);
        /*const camera1 = this.cameras.add(0,0,1280,720);
        camera1.setZoom(2);
		camera1.startFollow(this.jorge);*/

        this.scene.launch('Dialogos', [54, 59]);

        this.jorgeTimeline = this.tweens.timeline({
            targets: [this.jorge],
            //totalDuration:10000,
            loop: 0,
            tweens:[
                {
                    x: 290,
                    y: 240,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                        this.jorge_pasos.play();
                    }
                    
                },
                {
                    x: 290,
                    y:142,
                    duration: 1500,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_up_walk");
                    }
                },
                {
                    x:425,
                    y: 142,
                    duration: 2500,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                    }
                },
                {
                    x: 425,
                    y:414,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_down_walk");
                    }
                },
                {
                    x:270,
                    y: 414,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_left_walk");
                    }
                },
                {
                    x: 270,
                    y: 626,
                    duration: 7000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_down_walk");
                        
                    }
                },
                {
                    x: 754,
                    y: 626,
                    duration: 10000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                        
                    }
                },
                {
                    x: 754,
                    y: 292,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_up_walk");
                        
                    }
                },
                {
                    x: 655,
                    y: 292,
                    duration: 2000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_left_walk");
                        
                    }
                },
                {
                    x: 655,
                    y: 72,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_up_walk");
                        
                    }
                },
                {
                    x: 770,
                    y:72,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                        
                    }
                },
                {
                    x:770,
                    y: 166,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_down_walk");
                        
                    }
                },
                {
                    x: 908,
                    y:166,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                        
                    }
                },
                {
                    x:908,
                    y: 634,
                    duration: 10000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_down_walk");
                        
                    }
                },
                {
                    x: 1110,
                    y: 634,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                        
                    }
                },
                {
                    x: 1100,
                    y: 338,
                    duration: 5000,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_up_walk");
                        
                    }
                },
                {
                    x: 1186,
                    y: 338,
                    duration: 5000
                    ,
                    onStart: ()=>{
                        this.jorge.anims.play("jorge_right_walk");
                    }
                }
            ],
            onComplete: ()=>{
                this.jorge.anims.play("jorge_down_idle");
            }
        });
        this.anselmoTimeline = this.tweens.timeline({
            targets: [this.anselmo],
            //totalDuration:10000,
            loop: 0,
            tweens:[
                {
                    x: 290,
                    y: 240,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x: 290,
                    y:142,
                    duration: 2000,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_up");
                    }
                },
                {
                    x:425,
                    y: 142,
                    duration: 2500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x: 425,
                    y:414,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_down");
                    }
                },
                {
                    x:270,
                    y: 414,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk_left");
                    }
                },
                {
                    x: 270,
                    y: 626,
                    duration: 7500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_down");
                    }
                },
                {
                    x: 754,
                    y: 626,
                    duration: 8000,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x: 754,
                    y: 292,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_up");
                    }
                },
                {
                    x: 655,
                    y: 292,
                    duration: 2500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk_left");
                    }
                },
                {
                    x: 655,
                    y: 72,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_up");
                    }
                },
                {
                    x: 770,
                    y:72,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x:770,
                    y: 166,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_down");
                    }
                },
                {
                    x: 908,
                    y:166,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x:908,
                    y: 634,
                    duration: 8000,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_down");
                    }
                },
                {
                    x: 1110,
                    y: 634,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                },
                {
                    x: 1100,
                    y: 338,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_up");
                    }
                },
                {
                    x: 1154,
                    y: 338,
                    duration: 5500,
                    onStart: ()=>{
                        this.anselmo.anims.play("anselmo_walk");
                    }
                }
            ],
            onComplete: ()=>{
                this.anselmo.anims.play("anselmo_idle");
            }
        });
        this.isabellaTimeline = this.tweens.timeline({
            targets: [this.isabella],
            //totalDuration:10000,
            loop: 0,
            tweens:[
                {
                    x: 290,
                    y: 240,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x: 290,
                    y:142,
                    duration: 2500,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_up");
                    }
                },
                {
                    x:425,
                    y: 142,
                    duration: 2500,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x: 425,
                    y:414,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_down");
                    }
                },
                {
                    x:270,
                    y: 414,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk_left");
                    }
                },
                {
                    x: 270,
                    y: 626,
                    duration: 8000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_down");
                    }
                },
                {
                    x: 754,
                    y: 626,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x: 754,
                    y: 292,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_up");
                    }
                },
                {
                    x: 655,
                    y: 292,
                    duration: 3000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk_left");
                    }
                },
                {
                    x: 655,
                    y: 72,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_up");
                    }
                },
                {
                    x: 770,
                    y:72,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x:770,
                    y: 166,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_down");
                    }
                },
                {
                    x: 908,
                    y:166,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x:908,
                    y: 634,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_down");
                    }
                },
                {
                    x: 1110,
                    y: 634,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                },
                {
                    x: 1100,
                    y: 338,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_up");
                    }
                },
                {
                    x: 1122,
                    y: 338,
                    duration: 6000,
                    onStart: ()=>{
                        this.isabella.anims.play("isabella_walk");
                    }
                }
            ],
            onComplete: ()=>{
                this.isabella.anims.play("isabella_idle");
                this.jorge_pasos.stop();
                setTimeout(() => {
                    // Cambia a la siguiente escena
                  this.sonidof.stop();
                    console.log("Pasa a la escena de LaboS");
                    this.scene.start('LaboS');
                }, 3000); 
            }
        });
        

        //Para pruebas con coordenadas
        /*this.cursor.space.on('up',()=>{
            console.log("x: "+this.jorge.x+", y: "+this.jorge.y);
        });*/

    }

    update(time, delta) {
        /*Para pruebas con coordenadas
        if(this.cursor.right.isDown){
            this.jorge.x+=1;
        }
        if(this.cursor.left.isDown){
            this.jorge.x-=1;
        }
        if(this.cursor.up.isDown){
            this.jorge.y-=1;
        }
        if(this.cursor.down.isDown){
            this.jorge.y+=1;
        }
        */
    }
}

export default JunglaS;