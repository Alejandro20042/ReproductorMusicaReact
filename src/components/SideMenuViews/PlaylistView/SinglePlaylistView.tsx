import { useParams } from "react-router-dom";
import { usePlaylists } from "../../../contexts/PlaylistContext";
import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../../../interfaces/types";
import "./SinglePlaylistView.css";

const SinglePlaylistView = () => {
  const { id } = useParams();
  const { playlists } = usePlaylists();
  const { setCancionSeleccionada } = useOutletContext<OutletContextType>();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return <div className="playlist-notfound">🎧 Playlist no encontrada</div>;
  }

  const handlePlayAll = () => {
    if (playlist.canciones.length > 0) {
      setCancionSeleccionada(playlist.canciones[0]);
    }
  };

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <div className="playlist-cover">
          <img
            src={`https://api-musica.netlify.app/${playlist.canciones[0]?.album.cover}`}
            alt={playlist.nombre}
          />
        </div>
        <div className="playlist-info">
          <h2>{playlist.nombre}</h2>
          <p>{playlist.canciones.length} canciones</p>
          <button className="play-button" onClick={handlePlayAll}>
            ▶ Reproducir todas
          </button>
        </div>
      </div>

      <div className="playlist-content">
        {playlist.canciones.length === 0 ? (
          <p className="playlist-empty">Esta playlist no tiene canciones aún.</p>
        ) : (
          <ul className="song-list">
            {playlist.canciones.map((cancion) => (
              <li
                key={cancion.id}
                className="song-card"
                onClick={() => setCancionSeleccionada(cancion)}
              >
                <img
                  src={`https://api-musica.netlify.app/${cancion.album.cover}`}
                  alt={cancion.title}
                  className="song-thumb"
                />
                <div className="song-info">
                  <p className="song-title">{cancion.title}</p>
                  <p className="song-artist">{cancion.artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SinglePlaylistView;
