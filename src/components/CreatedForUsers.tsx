import type { CreatedForUsersProps } from '../interfaces/types';

const CreatedForAlejandro = ({ songs }: CreatedForUsersProps) => {
  const uniqueAlbums = songs
    .map(song => song.album)
    .filter((album, index, self) => index === self.findIndex(a => a.id === album.id));

  const buildImageUrl = (path: string | undefined) => {
    if (!path) return "";
    return `https://api-musica.netlify.app/${path}`.replace(/ /g, "%20").replace(/'/g, "%27");
  };

  return (
    <div className="created-section">
      <h2 className="section-title">Created for Alejandro</h2>
      <div className="grid-container">
        {uniqueAlbums.map((album) => (
          <div
            key={album.id}
            className="album-card"
            style={{
              backgroundImage: `url(${buildImageUrl(album.cover)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="album-title-overlay">
              <strong>{album.title}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedForAlejandro;
