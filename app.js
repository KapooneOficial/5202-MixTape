const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const botonRepetir = document.getElementById('repetir');
const repetirApagadoEncendido = document.querySelector('.controles button.boton-repetir');

const canciones = [
  {
    titulo:'Ameri',
    nombre:'DUKI',
    fuente:'music/DUKI - Ameri.mp3'
  },
  {
    titulo:'Barro',
    nombre:'DUKI',
    fuente:'music/DUKI - Barro.mp3'
  },
  {
    titulo:'Imperio',
    nombre:'DUKI Judeline',
    fuente:'music/DUKI Judeline - Imperio.mp3'
  },
];

let indiceCancionActual = 0;

function actualizarInfoCancion() {
  tituloCancion.textContent = canciones[indiceCancionActual].titulo;
  nombreArtista.textContent = canciones[indiceCancionActual].nombre;
  cancion.src = canciones[indiceCancionActual].fuente;
  cancion.addEventListener('loadeddata', function() {});
};

cancion.addEventListener('loadedmetadata', function() {
  progreso.max = cancion.duration;
  progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
  if (cancion.paused) {
    reproducirCancion();
  } else {
    pausarCancion();
  }
};

function reproducirCancion() {
  cancion.play();
  iconoControl.classList.add('bi-pause-fill')
  iconoControl.classList.remove('bi-play-fill')
}

function pausarCancion() {
  cancion.pause();
  iconoControl.classList.remove('bi-pause-fill')
  iconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', function() {
  if (!cancion.paused) {
    progreso.value = cancion.currentTime;
  }
});

progreso.addEventListener('input', function() {
  cancion.currentTime = progreso.value;
});

progreso.addEventListener('change', function() {
  reproducirCancion();
});

botonAdelante.addEventListener('click', function() {
  indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
  actualizarInfoCancion();
});

botonAtras.addEventListener('click', function() {
  indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
  actualizarInfoCancion();
});

botonRepetir.addEventListener('click', repetirCancion);

function repetirCancion() {
  if (repetir.activado) {
    activarRepetir();
  } else {
    desactivarRepetir();
  }
};

function activarRepetir() {
  repetir.activado();
}

actualizarInfoCancion();