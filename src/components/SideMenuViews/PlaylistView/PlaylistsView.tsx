import { usePlaylists } from "../../../contexts/PlaylistContext";
import { useNavigate } from "react-router-dom";
import "./PlaylistsView.css";

const PlaylistsView = () => {
  const { playlists } = usePlaylists();
  const navigate = useNavigate();

  return (
    <div className="playlists-container">
      <h2 className="playlists-title">Tus Playlists</h2>
      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist-card"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <div className="playlist-image-placeholder">
              🎵
            </div>
            <p className="playlist-name">{playlist.nombre}</p>
            <p className="playlist-count">{playlist.canciones.length} canciones</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsView;
