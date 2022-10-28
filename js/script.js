

var arrNombres = ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png'];

var arryImg = [];
var img = new Image(20,20);

arrNombres.forEach((item)=>{
arryImg.push(item)
})

console.log(arryImg);

var arrayOpciones = ['A','A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var valoresCartas = [];
var idCartas = [];
var cartasAdivinadas = 0;
var contadorIntento=0;





// Método Fisher-Yates para mezclar un array
Array.prototype.mezclar = function () {
    var i = this.length;
    var indiceAleatorio;
    var valorTemporal;

    while (--i > 0) {
        indiceAleatorio = Math.floor(Math.random() * (i + 1));
        valorTemporal = this[indiceAleatorio];
        this[indiceAleatorio] = this[i];
        this[i] = valorTemporal;
    };
};

// Función para crear un nuevo tablero
function nuevoTablero() {
    cartasAdivinadas = 0;
    var codigoHtml = '';
    arrayOpciones.mezclar();

    for (var i = 0; i < arrayOpciones.length; i++) {
        //codigoHtml += '<div id="carta_' + i + '" onclick="girarCarta(this,\'' + arrayOpciones[i] + '\')"></div>';
        codigoHtml += `<div id="carta_${i}" onclick="girarCarta(this,'${arrayOpciones[i]}')"></div>`;
        
        console.log(codigoHtml);
    }

    document.getElementById('tablero').innerHTML = codigoHtml;
};
function girarCarta(carta, val) {
    if (carta.innerHTML == "" && valoresCartas.length < 2) {
        carta.style.background = '#FFF';
        carta.style.border = 'inset #2af21f thick'
        carta.innerHTML = val;
        // Código a ejecutar al dar vuelta la primer carta
        if (valoresCartas.length === 0) {
            valoresCartas.push(val);
            idCartas.push(carta.id);
            // Código a ejecutar al dar vuelta la segunda carta
        } else if (valoresCartas.length === 1) {
            valoresCartas.push(val);
            idCartas.push(carta.id);
            
            // Comprobamos si las cartas son iguales
            contadorIntento++;
            if (valoresCartas[0] === valoresCartas[1]) {
                cartasAdivinadas += 2;
                // Limpiamos las variables (arrays)
                valoresCartas = [];
                idCartas = []

                // Comprobamos si terminamos el juego
                if (cartasAdivinadas === arrayOpciones.length) {
                    alert("Ganaste");
                    document.getElementById('tablero').innerHTML = "";
                    nuevoTablero();
                }
            } else {
                function ocultarCarta() {
                    // Grirar la carta y volver a mostrar la imagen
                    var carta_1 = document.getElementById(idCartas[0]);
                    var carta_2 = document.getElementById(idCartas[1]);

                    // Añadimos estilos para ocular la carta 1
                    carta_1.style.backgroundColor = "#EEE"
                    carta_1.style.backgroundImage = "url(../assets/icon.png)";
                    carta_1.style.backgroundSize = "cover";
                    carta_1.style.border = '';
                    carta_1.innerHTML = "";

                    // Añadimos estilos para ocular la carta 2
                    carta_2.style.backgroundColor = "#EEE"
                    carta_2.style.backgroundImage = "url(../assets/icon.png)";
                    carta_2.style.backgroundSize = "cover";
                    carta_2.style.border = '';
                    carta_2.innerHTML = "";

                    // Limpiamos las variables (arrays)
                    valoresCartas = [];
                    idCartas = []
                }
                setTimeout(ocultarCarta, 700);
            }
        }
    }
};