document.addEventListener('DOMContentLoaded', () => {
  const canciones = document.querySelectorAll('.song-list li');
  
  canciones.forEach((cancion) => {
    cancion.addEventListener('click', () => {
      const titulo = cancion.dataset.titulo;
      const artista = cancion.dataset.artista;
      const archivo = cancion.dataset.archivo;
      
      // Redirigir al reproductor con parámetros
      const url = `/reproductor/reproductor.html?titulo=${encodeURIComponent(titulo)}&artista=${encodeURIComponent(artista)}&archivo=${encodeURIComponent(archivo)}`;
      window.location.href = url;
    });
  });
});