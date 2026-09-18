class Dialogos extends Phaser.Scene{ 
    constructor(){ 
        super({ key: 'Dialogos' 
    }); 
    } 
    init(intervalo) { 
        console.log('Escena dialogos:', intervalo[0], "-",intervalo[1]); 
        this.i = intervalo[0];
        this.ultimoD = intervalo[1]; 
    }
    preload(){
        this.load.path = './assets/dialogos/';
        this.load.image(['I', 'S', 'M', 'J', 'A', 'cuadro']);
    }

    mostrarTexto(texto, pos) {
        const debug = false;

        const textStyle = {
            fontSize: 32,
            lineSpacing: 4,
            fontFamily: "serif",
            color: "#000"
        };
        this.texto = texto;
        const text = this.add.text(pos, 470, this.texto, textStyle);
        const {
            lineHeight,
            lineSpacing,
            lineWidths
        } = Phaser.GameObjects.GetTextSize(
            text,
            text.getTextMetrics(),
            this.texto.split("\n")
        );
        const totalLineHeight = lineHeight + lineSpacing;
        this.add
            .grid(
                text.x,
                text.y,
                text.width,
                text.height,
                lineHeight,
                totalLineHeight,
                0,
                0,
                0x00ffff,
                0.2
            )
            .setOrigin(0, 0)
            .setVisible(debug);

        const maskImage = this.add
            .graphics({
                fillStyle: { color: 0xff0000, alpha: 0.5 }
            })
            .setVisible(debug);

        const mask = maskImage.createGeometryMask();
        text.setMask(mask);
        const path = new Phaser.Curves.Path();

        for (let i = 0, len = lineWidths.length; i < len; i++) {
            const lineWidth = lineWidths[i];
            const y = text.y + i * totalLineHeight;
            path.moveTo(text.x, y).lineTo(text.x + lineWidth, y);
        }

        const pathDisplay = this.add
            .graphics({ lineStyle: { color: 0xffff00, alpha: 0.5, width: 2 } })
            .setVisible(debug);

        path.draw(pathDisplay);

        this.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 40 * this.texto.length,
            onUpdate: (counter) => {
                const { x, y } = path.getPoint(counter.getValue());

                maskImage.clear();

                if (y > 0) {
                    maskImage.fillRect(text.x, text.y, text.width, y - text.y);
                }
                maskImage.fillRect(text.x, y, x - text.x, totalLineHeight);
            }
        });
    }
    

    create() { 

        class Dialogo{
            constructor(personaje, linea, lado){
                this.personaje = personaje;
                this.linea = linea;
                this.lado = lado;
            }
        }

        //Guion de hisatoria, el primer caracter indica el personaje, seguido de la linea, y finalmente la direccion
        this.historia =  [];

        this.historia.push(new Dialogo("S","…tienes razón, debemos ir. Algo raro está ocurriendo bajo\nlas profundidades.","I"));
        this.historia.push(new Dialogo("J", "El equipo está intacto y funciona a la perfección.","D"));
        this.historia.push(new Dialogo("A", "Parece que no ha sido alterado."));
        this.historia.push(new Dialogo("I", "Desde aquí sí se registró el terremoto de ayer. Fue de…\n¡7.4 grados!","I"));
        this.historia.push(new Dialogo("J", "Me sorprende que este lugar no se haya derrumbado aún.","D"));
        this.historia.push(new Dialogo("A","Pues así muy conservado tampoco está, pero está aguantando.","I"));
        this.historia.push(new Dialogo("A","¡EY! ¿QUIÉN ANDA AHÍ?","I"));
        this.historia.push(new Dialogo("J","¿Anselmo? ¿Qué pasó?","D"));
        this.historia.push(new Dialogo("A","¿Eh? ¿A dónde fue?","I"));
        this.historia.push(new Dialogo("I","¿Estás bien?","D"));
        this.historia.push(new Dialogo("A","¡Había alguien espiándonos!","I"));
        this.historia.push(new Dialogo("J","Y ese espía que viste, ¿está en este cuarto con nosotros?","D"));
        this.historia.push(new Dialogo("A","Les juro que vi una sombra","I"));
        this.historia.push(new Dialogo("J","Eso sí lo tiene que haber detectado","D"));
        this.historia.push(new Dialogo("I","Parece que el epicentro fue...\n¿¡justo abajo de nosotros!?","I"));
        this.historia.push(new Dialogo("J","Esto no me gusta nada.","D"));
        this.historia.push(new Dialogo("I","Lo sé, pero tenemos que explorar la mina","I"));
        this.historia.push(new Dialogo("J","…tienes razón, debemos ir. Algo raro está ocurriendo bajo\nlas profundidades.","D"));
        this.historia.push(new Dialogo("I","No me sorprende que esté averiado.","I"));
        this.historia.push(new Dialogo("A","Le daré un ojo...","D"));
        this.historia.push(new Dialogo("A","Parece que alguien olvidó cambiar los fusibles, yo me encargo.","I"));
        this.historia.push(new Dialogo("J","No se acerquen mucho al borde, se ve muy inestable.","D"));
        this.historia.push(new Dialogo("I","Eso es...","I"));
        this.historia.push(new Dialogo("A","¿Cómo llegó un esqueleto de dinosaurio aquí?","D"));
        this.historia.push(new Dialogo("I","Más importante; está intacto, y parece ser reciente...","I"));
        this.historia.push(new Dialogo("I","No sé qué sea esa piedrota, pero no se ve muy amable…","D"));
        this.historia.push(new Dialogo("J","Creo que podemos ayudarnos a enfrentarla.","I"));
        this.historia.push(new Dialogo("A", "¡El espía debe haber desaparecido así! Les dije que había\nvisto algo.","D"));
        this.historia.push(new Dialogo("J", "Pero ¿quién era, y como sabía sobre esas piedritas?","I"));
        this.historia.push(new Dialogo("I", "Parece haber un pasillo aquí atrás, es probable que\ntodo esté conectado.","D"));
        this.historia.push(new Dialogo("A", "Debemos recorrerlos, quizás encontremos al espía.","I"));
        this.historia.push(new Dialogo("J", "Vamos, necesitamos respuestas.","D"));
        this.historia.push(new Dialogo("S", "¡ALTO AHÍ! ¿Quiénes son ustedes?","I"));
        this.historia.push(new Dialogo("A", "¡Épale! ¿¡Quién eres TÚ!? ¿¡QUÉ eres tú!?","D"));
        this.historia.push(new Dialogo("S", "¡Agh! Olvidé el camuflaje…","I"));
        this.historia.push(new Dialogo("A", "Espera, tú eras la sombra que vi, ¿no es cierto?","D"));
        this.historia.push(new Dialogo("S", "Sí, estaba oculta. Pero bueno, eso no importa. Si no saben\nlo que soy, eso significa que no están con Albicorp.","I"));
        this.historia.push(new Dialogo("J", "Espera, ¿dijiste Albicorp? Nuestra familia trabaja ahí.","D"));
        this.historia.push(new Dialogo("S", "¡Lo sabía!","I"));
        this.historia.push(new Dialogo("J", "¡Espera, espera! No confiamos en ellos, así que vinimos\na investigar por nuestra cuenta. Algo raro está sucediendo\ny ellos lo están ocultando.","D"));
        this.historia.push(new Dialogo("S", "En eso no se equivocan. Está bien, les daré el beneficio\nde la duda, quizá podamos ayudarnos mutuamente.","I"));
        this.historia.push(new Dialogo("I", "Estamos dispuestos, necesitamos descubrir la verdad.\nNo le deseamos mal a nadie.","D"));
        this.historia.push(new Dialogo("S", "Está bien, les contaré lo que ha sucedido.","I"));
        this.historia.push(new Dialogo("S", "Verán, mi nombre es Sythua, soy lo que ustedes\nllaman un “reptiliano”.","D"));
        this.historia.push(new Dialogo("S", "Las teorías que los humanos tienen son ciertas,\nnosotros vivimos en una base subterránea.\nNosotros somos una raza pacífica, pero ella\n“tiene otros datos”, y cree que planeamos dominar el mundo.","I"));
        this.historia.push(new Dialogo("I", "Entonces está haciendo algo para intentar\ndestruirlos, ¿no es así?","I"));
        this.historia.push(new Dialogo("S", "Así es. Me parece que ya conocieron a nuestros\nvecinos los juyos, son aquellas piedras que los ayudaron,\ncontrolando la tierra.","D"));
        this.historia.push(new Dialogo("A", "Conque así se llaman…","I"));
        this.historia.push(new Dialogo("S", "La Dra. ha estado realizando experimentos sobre\nellos para volverlos malignos y usarlos en nuestra contra.","D"));
        this.historia.push(new Dialogo("J", "Aquella piedrota era uno de esos experimentos\n¿cierto?","I"));
        this.historia.push(new Dialogo("S", "Así es. Están secuestrando a los juyos para llevarlos\na su base subterránea. Pero si colaboramos reptilianos,\njuyos y humanos, sé que podremos ir allí y detenerla antes de\nque cabe con todos.","D"));
        this.historia.push(new Dialogo("S", "Tenemos una tregua. Pueden ayudarnos con\nnuestra situación.","I"));
        this.historia.push(new Dialogo("J", "¿Cómo podemos llegar hasta su laboratorio?","D"));
        this.historia.push(new Dialogo("S", "Solía haber una salida hacia la jungla, pero\nla cerraron porque se volvió muy peligrosa. Si logran encontrarla\nlos llevaré. Mientras tanto iré por refuerzos.","I"));
        this.historia.push(new Dialogo("S", "Este camino debería llevarnos directamente al\nlaboratorio de Mara.","D"));
        this.historia.push(new Dialogo("J", "¿Qué haremos cuando lleguemos?","I"));
        this.historia.push(new Dialogo("A", "¿Podrán volver a ayudarnos los juyos?","D"));
        this.historia.push(new Dialogo("I", "Eso espero. Somos muchos, entre todos deberíamos\npoder acabar con ella y su ejército de piedras.","I"));
        this.historia.push(new Dialogo("S", "Tenemos que liberar a los juyos y de paso salvar\nla Tierra.","D"));



        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const teclado = Phaser.Input.Keyboard; 
        this.bcontinuar = this.input.keyboard.addKey(teclado.KeyCodes.ENTER);

        this.auxPos = 0;


        this.retrato = this.add.image(640, 360, this.historia[this.i].personaje).setDepth(3);
        this.retrato.flipX = false;
        this.add.image(640, 360, 'cuadro');
        this.mostrarTexto(this.historia[this.i].linea, 50);
        this.i++;

        this.bcontinuar.on('down', () => {
            if(this.i >= this.ultimoD){
                if(this.i >= 4 && this.i <= 18){
                    this.scene.resume('Cueva0S');
                }
                if(this.i ==21 ){
                    this.scene.resume('Cueva1S');
                }
                if(this.i >= 22 && this.i <= 44){
                    this.scene.resume('Cueva2S');
                }
                this.scene.stop('Dialogos');
            }
            console.log("continuar..");
            this.retrato.setTexture(this.historia[this.i].personaje);
            if(this.historia[this.i].lado == 'I'){
                this.retrato.flipX = false;
                this.auxPos = 50;

            }else{
                this.retrato.flipX = true;
                this.auxPos = 450;
            }
            this.add.image(640, 360, 'cuadro');
            this.mostrarTexto(this.historia[this.i].linea, this.auxPos);
            this.i++;
        }); 
    } 

    update(time, delta) {
    } 
} 

export default Dialogos;