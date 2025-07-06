import type { CreatedForUsersProps } from '../interfaces/types';

const CreatedForAlejandro = ({ songs }: CreatedForUsersProps) => {
  const uniqueAlbums = songs
    .map(song => song.albumCompleto)
    .filter((album, index, self) => index === self.findIndex(a => a.id === album.id));

  return (
    <div className="created-section">
      <h2 className="section-title">Created for Alejandro</h2>
      <div className="grid-container">
        {uniqueAlbums.map((album) => (
          <div
            key={album.id}
            className="album-card"
            style={{
              backgroundImage: `url(${encodeURI(`https://api-musica.netlify.app/${album.portada}`)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="album-title-overlay">
              <strong>{album.titulo}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedForAlejandro;

