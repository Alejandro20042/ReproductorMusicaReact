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
    return <div className="playlist-notfound">Playlist no encontrada</div>;
  }

  return (
    <div className="playlist-container">
      <h2 className="playlist-title">{playlist.nombre}</h2>

      {playlist.canciones.length === 0 ? (
        <p className="playlist-empty">Esta playlist no tiene canciones aún.</p>
      ) : (
        <ul className="playlist-list">
          {playlist.canciones.map((cancion) => (
            <li
              key={cancion.id}
              className="playlist-item"
              onClick={() => setCancionSeleccionada(cancion)}
            >
              <img
                src={`https://api-musica.netlify.app/${cancion.albumCompleto.portada}`}
                alt={cancion.titulo}
                className="playlist-thumb"
              />
              <div className="playlist-details">
                <p className="playlist-title">{cancion.titulo}</p>
                <p className="playlist-artist">{cancion.artista}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SinglePlaylistView;
