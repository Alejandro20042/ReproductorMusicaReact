import type { AlbumSectionProps } from '../interfaces/types';

const AlbumSection = ({ albums }: AlbumSectionProps) => {
  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}` : 'https://via.placeholder.com/40';

  return (
    <div className="albumForm">
      <p className="albumlastes">Album latest</p>
      <ol id="albumList">
        {albums.slice(0, 4).map(album => (
          <li key={album.id} className="albums">
            ▶ <img src={getImageUrl(album.portada)} alt={album.titulo} />
            {album.titulo} ({album.añoLanzamiento})
          </li>
        ))}
      </ol>
    </div>
  );
};
export default AlbumSection;
