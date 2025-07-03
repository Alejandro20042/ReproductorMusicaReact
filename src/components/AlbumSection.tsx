import type { AlbumSectionProps } from '../interfaces/types';

const AlbumSection = ({ albums }: AlbumSectionProps) => {
  return (
    <div className="albumForm">
      <p className="albumlastes">Album latest</p>
      <ol id="albumList">
        {albums.slice(0, 5).map(album => (
          <li key={album.id} className="albums">
            ▶ <img alt="" />
            {album.titulo} ({album.añoLanzamiento})
          </li>
        ))}
      </ol>
    </div>
  );
};
export default AlbumSection;
