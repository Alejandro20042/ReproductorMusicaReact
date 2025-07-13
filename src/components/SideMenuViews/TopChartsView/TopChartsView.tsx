import type { TopChartsViewProps } from '../../../interfaces/types';
import './TopChartsView.css';


const TopChartsView = ({ songs }: TopChartsViewProps) => {
  const topSongs = songs.slice(0, 10);

  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}` : 'https://via.placeholder.com/60';

  return (
    <div className="top-charts-container">
      <h2 className="top-charts-title">🔥 Top Charts</h2>
      <ol className="top-charts-list">
        {topSongs.map((song, index) => (
          <li key={song.id} className="top-chart-item">
            <span className="position">{index + 1}</span>
            <img src={getImageUrl(song.artistaCompleto.imagen)} alt={song.artista} />
            <div className="song-info">
              <strong>{song.titulo}</strong>
              <p>{song.artista}</p>
            </div>
            <span className="duration">{song.duracion}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopChartsView;
