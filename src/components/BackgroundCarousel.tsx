import { useEffect, useState } from 'react';
import type { ISong } from '../interfaces/ISong';


interface BackgroundCarouselProps {
  allSongs: ISong[];
}

const BackgroundCarousel = ({ allSongs }: BackgroundCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const uniqueAlbums = allSongs
    .map(song => song.album)
    .filter((album, index, self) =>
      index === self.findIndex(a => a?.id === album?.id)
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
  const imageUrl = encodeURI(`https://api-musica.netlify.app/${album?.cover}`);
  const artistNombre = allSongs[currentIndex];
  const artist = artistNombre.artist?.name;

  return (
    <div className="carousel-container">
      <div className="carousel-description">
        <h2>{album?.title}</h2>
        <p>Artista: {artist}</p>
        <p>Año: {album?.launch_year}</p>
        <p>{album?.description}</p>
      </div>
      <div className="carousel-image-wrapper">
        <img
          src={imageUrl}
          alt={album?.title}
          className="carousel-img"
        />
      </div>
    </div>
  );
};

export default BackgroundCarousel;
