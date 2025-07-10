import type { AlbumSectionProps } from '../interfaces/types';

const AlbumSection = ({ albums, canciones, onSelectSong }: AlbumSectionProps) => {
  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}` : 'https://via.placeholder.com/40';

  return (
    <div className="albumForm">
      <p className="albumlastes">Album latest</p>
      <ol id="albumList">
        {albums.slice(0, 4).map(album => {
          const primeraCancion = canciones.find(c => c.albumCompleto.id === album.id);
          return (
            <li
              key={album.id}
              className="albums"
              style={{ cursor: "pointer" }}
              onClick={() => primeraCancion && onSelectSong(primeraCancion)}
            >
              ▶ <img src={getImageUrl(album.portada)} alt={album.titulo} />
              {album.titulo} ({album.añoLanzamiento})
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AlbumSection;
