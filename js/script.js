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
        codigoHtml += '<div id="carta_' + i + '" onclick="girarCarta(this,\'' + arrayOpciones[i] + '\')"></div>';
        console.log(codigoHtml);
    }

    document.getElementById('tablero').innerHTML = codigoHtml;
};
