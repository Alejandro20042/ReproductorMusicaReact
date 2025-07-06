import { useEffect, useState } from 'react';
import type { Song } from '../interfaces/types';

interface BackgroundCarouselProps {
  allSongs: Song[];
}

const BackgroundCarousel = ({ allSongs }: BackgroundCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Albums únicos, para evitar repetidos y tener toda info
  const uniqueAlbums = allSongs
    .map(song => song.albumCompleto)
    .filter((album, index, self) =>
      index === self.findIndex(a => a.id === album.id)
    );

  useEffect(() => {
    if (uniqueAlbums.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % uniqueAlbums.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [uniqueAlbums]);

  if (uniqueAlbums.length === 0) return null;

  const album = uniqueAlbums[currentIndex];
  const imageUrl = encodeURI(`https://api-musica.netlify.app/${album.portada}`);  // <-- aquí
  const artistNombre = allSongs[currentIndex];
  const artist = artistNombre.artistaCompleto.nombre;

  return (
    <div className="carousel-container">
      <div className="carousel-description">
        <h2>{album.titulo}</h2>
        <p>Artista: {artist}</p>
        <p>Año: {album.añoLanzamiento}</p>
        <p>{album.descripcion}</p>
      </div>
      <div className="carousel-image-wrapper">
        <img
          src={imageUrl}
          alt={album.titulo}
          className="carousel-img"
        />
      </div>
    </div>
  );
};

export default BackgroundCarousel;
