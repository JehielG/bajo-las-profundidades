import StartScreen from "./scenes/StartScreen.js"
import IntroS from "./scenes/IntroS.js";
import Cueva0S from "./scenes/Cueva0S.js";
import Cueva1S from "./scenes/Cueva1S.js";
import mj_cables from "./scenes/mj_cables.js";
import VidasP from "./scenes/VidasP.js";
import CajasS from "./scenes/CajasS.js";
import ElevadorS from "./scenes/ElevadorS.js";
import Muerte from "./scenes/Muerte.js";
import MinimapS from "./scenes/MinimapS.js";
import Cueva2S from "./scenes/Cueva2S.js";
import Juyos1S from "./scenes/Juyos1S.js";
import BaseS from "./scenes/BaseS.js";
import LavaS from "./scenes/LavaS.js";
import JunglaS from "./scenes/JunglaS.js";
import LaboS from "./scenes/LaboS.js";
import Juyos2S from "./scenes/Juyos2S.js";
import CreditosS from "./scenes/CreditosS.js";
import Dialogos from "./scenes/Dialogos.js";
import ControlesS from "./scenes/ControlesS.js";

const config = {
    title: "Curso Phaser",		    //Nombre del juego (opcional)
    url: "http://google.es",	    //Dirección de la página del juego (opcional)
    version: "0.0.1",		        //Versión alfanumérica (opcional)
    type: Phaser.AUTO,		        //Tipo de renderizado (WEBGL, CANVAS, AUTO)
                                    // AUTO: busca primero WEBGL y si no está disponible eligirá CANVAS
    width: 1280,			            //Ancho de pantalla del juego
    height: 720, 			        //Alto de pantalla del juego
    parent: "contenedor",		    //Nombre del id del elemento <div> en el index.html
                                    // se refiere a dónde se pondrá el canvas o lienzo
    pixelArt: true,		            //Diseño con pixeles definidos (no borrosos)
    backgroundColor: "#34495e", 	//Color de fondo del canvas ()
	//Aquí irá la lista de scenas del juego
    scene: [StartScreen, IntroS, Cueva0S, Cueva1S, mj_cables,Cueva2S,Juyos1S,BaseS,LavaS,JunglaS,LaboS,Juyos2S,ControlesS, CreditosS, VidasP,CajasS, ElevadorS, Muerte, MinimapS, Dialogos],

    physics: { 
        default: 'arcade', 
        arcade: {
            gravity: { 
                y: 800 
            },
            debug: false
        } 
    },

    // scale: {
    //     zoom: 2.5
    // },

    banner:{
        hidePhaser: true,
        text: "#fff00f",
        background: [
                "#16a085",
                "#2ecc71",
                "#e74c3c", 
                "#000000"]
    }
};

const game = new Phaser.Game(config);