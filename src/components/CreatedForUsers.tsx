import type { CreatedForUsersProps } from '../interfaces/types';

const CreatedForUsers = ({ songs }: CreatedForUsersProps) => {
  const grouped = songs.slice(0, 8);
  const getImageUrl = (path: string) => `https://api-musica.netlify.app/${path}`;

  return (
    <div className="created-section">
      <h2 className="section-title">Created for Alejandro</h2>
      <div className="grid-container">
        {grouped.map((song, index) => (
          <div
            className="song-card"
            key={index}
            style={{
              backgroundImage: song.albumCompleto.portada
                ? `url(${getImageUrl(song.albumCompleto.portada)})`
                : 'none'
            }}
          >
            <div className="card-overlay">
              <strong>{song.titulo}</strong>
              <p>{song.artistaCompleto.nombre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedForUsers;
