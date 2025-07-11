document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const titulo = urlParams.get("titulo");
  const artista = urlParams.get("artista");
  const archivo = urlParams.get("archivo");

  const tituloElemento = document.getElementById("tituloCancion");
  const artistaElemento = document.getElementById("nombreArtista");
  const cancion = document.getElementById("cancion");
  const fuente = document.getElementById("fuenteAudio");
  const progreso = document.getElementById("progreso");
  const iconoControl = document.getElementById("iconoControl");
  const currentTimeElem = document.getElementById("currentTime");
  const durationElem = document.getElementById("duration");
  const volumenSlider = document.getElementById("volume");

  // Cargar datos de la canción desde URL
  if (titulo) tituloElemento.textContent = titulo;
  if (artista) artistaElemento.textContent = artista;
  if (archivo) {
    fuente.src = archivo;
    cancion.load();
  }

  // Reproducción y pausa
  document.querySelector(".boton-reproducir-pausar").addEventListener("click", () => {
    if (cancion.paused) {
      cancion.play();
      iconoControl.classList.replace("bi-play-fill", "bi-pause-fill");
    } else {
      cancion.pause();
      iconoControl.classList.replace("bi-pause-fill", "bi-play-fill");
    }
  });

  // Actualizar barra de progreso y tiempo
  cancion.addEventListener("timeupdate", () => {
    progreso.value = cancion.currentTime;
    progreso.max = cancion.duration || 100;

    currentTimeElem.textContent = formatTime(cancion.currentTime);
    durationElem.textContent = formatTime(cancion.duration);
  });

  // Control manual del progreso
  progreso.addEventListener("input", () => {
    cancion.currentTime = progreso.value;
  });

  // Control de volumen
  volumenSlider.addEventListener("input", () => {
    cancion.volume = volumenSlider.value;
  });

  // Adelantar 10 segundos
  document.querySelector(".adelante").addEventListener("click", () => {
    cancion.currentTime = Math.min(cancion.currentTime + 10, cancion.duration);
  });

  // Retroceder 10 segundos
  document.querySelector(".atras").addEventListener("click", () => {
    cancion.currentTime = Math.max(cancion.currentTime - 10, 0);
  });

  // Función para dar formato mm:ss
  function formatTime(segundos) {
    if (isNaN(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60).toString().padStart(2, '0');
    return `${minutos}:${seg}`;
  }

  // === Modo claro / oscuro ===
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  // Restaurar preferencia si existe
  if (localStorage.getItem("tema") === "claro") {
    body.classList.add("modo-claro");
    themeIcon.classList.replace("bi-toggle2-off", "bi-toggle2-on");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("modo-claro");
    const esClaro = body.classList.contains("modo-claro");
    themeIcon.className = esClaro ? "bi bi-toggle2-on" : "bi bi-toggle2-off";
    localStorage.setItem("tema", esClaro ? "claro" : "oscuro");
  });
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");
  const icon = document.getElementById("themeIcon");
  icon.classList.toggle("bi-toggle2-off");
  icon.classList.toggle("bi-toggle2-on");
});