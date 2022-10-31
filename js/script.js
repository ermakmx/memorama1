var doc = document.querySelector("div#tablero");

var cartasTodas = _.sampleSize(
  [
    "./assets/ags.png",
    "./assets/bcn.png",
    "./assets/bcs.png",
    "./assets/campeche.png",
    "./assets/cdmx.png",
    "./assets/chiapas.png",
    "./assets/chihuahua.png",
    "./assets/coahuila.png",
    "./assets/colima.png",
    "./assets/durango.png",
    "./assets/edomx.png",
    "./assets/guanajuato.png",
    "./assets/guerrero.png",
    "./assets/hidalgo.png",
    "./assets/jalisco.png",
    "./assets/michoacan.png",
    "./assets/morelos.png",
    "./assets/nayarit.png",
    "./assets/nuevoleon.png",
    "./assets/oaxaca.png",
    "./assets/puebla.png",
    "./assets/queretaro.png",
    "./assets/quintanaroo.png",
    "./assets/sanluis.png",
    "./assets/sinaloa.png",
    "./assets/sonora.png",
    "./assets/tabasco.png",
    "./assets/tamaulipas.png",
    "./assets/tlaxcala.png",
    "./assets/veracruz.png",
    "./assets/yucatan.png",
    "./assets/zacatecas.png",
  ],
  8
);

Array.prototype.mezclar = function () {
  var i = this.length;
  var indiceAleatorio;
  var valorTemporal;

  while (--i > 0) {
    indiceAleatorio = Math.floor(Math.random() * (i + 1));
    valorTemporal = this[indiceAleatorio];
    this[indiceAleatorio] = this[i];
    this[i] = valorTemporal;
  }
};

var valoresCartas = [];
var idCartas = [];
var contadorIntento = 0;
var cartasAdivinadas = 0;
var pares = 0;
var cartas = [];

var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("button-start");
var buttonStop = document.getElementById("button-stop");
var buttonReset = document.getElementById("button-reset");
var Interval;

buttonStart.onclick = function () {
  nuevoTablero();
};

function startTimer() {
  tens++;

  if (tens <= 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

function nuevoTablero() {
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
  contadorIntento = 0;
  pares = 0;
  document.getElementById("intentos").innerHTML = 0;
  document.getElementById("puntuacion").innerHTML = `<h3>Puntuacion: ${pares}`;
  cartasAdivinadas = 0;

  startTimer();
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  cartas = cartasTodas.concat(...cartasTodas);
  cartas.mezclar();

  var codhtml = "";
  valoresCartas = [];
  idCartas = [];
  contadorIntento = 0;
  cartasAdivinadas = 0;

  for (let index = 0; index < cartas.length; index++) {
    codhtml += `<div  id="carta_${index}" car=${cartas[index]} onclick="girarCarta(this)" class="carta"><Image id="imagen"  src="./assets/icon.png"></Image></div>`;
  }
  doc.innerHTML = codhtml;
}

function girarCarta(carta) {
  console.log(carta.firstChild.attributes.src.value);
  if (
    valoresCartas.length < 2 &&
    carta.firstChild.attributes.src.value == "./assets/icon.png"
  ) {
    carta.children.imagen.src = carta.attributes.car.value;

    if (valoresCartas.length === 0) {
      valoresCartas.push(carta.attributes.car.value);
      idCartas.push(carta.id);
      // Código a ejecutar al dar vuelta la segunda carta
    } else if (valoresCartas.length === 1) {
      valoresCartas.push(carta.attributes.car.value);
      idCartas.push(carta.id);

      // Comprobamos si las cartas son iguales
      contadorIntento++;
      if (valoresCartas[0] === valoresCartas[1]) {
        cartasAdivinadas += 2;
        pares = cartasAdivinadas / 2;
        document.getElementById(
          "puntuacion"
        ).innerHTML = `<h3>Puntuacion:${pares}</h3>`;
        var carta_1 = document.getElementById(idCartas[0]);
        var carta_2 = document.getElementById(idCartas[1]);
        carta_1.style.border = "2px solid green";
        carta_2.style.border = "2px solid green";

        // Limpiamos las variables (arrays)
        valoresCartas = [];
        idCartas = [];

        // Comprobamos si terminamos el juego
        if (cartasAdivinadas === cartas.length) {
          alert("Ganaste");
          document.getElementById("tablero").innerHTML = "";
          contadorIntento = 0;
          pares = 0;
          document.getElementById("intentos").innerHTML = 0;
          document.getElementById(
            "puntuacion"
          ).innerHTML = `<h3>Puntuacion: ${pares}`;
          clearInterval(Interval);
        }
      } else {
        var carta_1 = document.getElementById(idCartas[0]);
        var carta_2 = document.getElementById(idCartas[1]);
        console.log((carta_1.style.border = "2px solid red"));
        console.log((carta_2.style.border = "2px solid red"));
        function ocultarCarta() {
          // Girar la carta y volver a mostrar la imagen
          // Ocultamos carta 1 y carta 2

          var carta_1 = document.getElementById(idCartas[0]);
          var carta_2 = document.getElementById(idCartas[1]);

          carta_1.style.border = "";
          carta_2.style.border = "";
          carta_1.firstChild.src = "./assets/icon.png";
          carta_2.firstChild.src = "./assets/icon.png";

          // Limpiamos las variables (arrays)
          valoresCartas = [];
          idCartas = [];
        }
        setTimeout(ocultarCarta, 1500);
      }
    }
    document.getElementById("intentos").innerHTML = `${contadorIntento}`;
  }
}
