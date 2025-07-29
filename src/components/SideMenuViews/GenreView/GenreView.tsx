import { useState, useEffect } from "react";
import type { GenreViewProps, OutletContextType } from "../../../interfaces/types";
import "./GenreView.css";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { useOutletContext } from "react-router-dom";
import AddToPlaylistMenu from "../../ContextMenu/AddToPlaylistMenu";
import type { ISong } from "../../../interfaces/ISong";

function GenreView({
  genres,
  volverAEscuchar,
  escuchadoRecientemente,
  canciones,
  loading = false,
}: GenreViewProps) {
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string | null>(null);
  const { setCancionSeleccionada } = useOutletContext<OutletContextType>();

  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [cancionContextMenu, setCancionContextMenu] = useState<ISong | null>(null);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaMensaje, setAlertaMensaje] = useState("");

  const cancionesFiltradas = generoSeleccionado
    ? canciones.filter(
      (c) =>
        c.album.genere?.toLowerCase() === generoSeleccionado.toLowerCase()
    )
    : [];

  const closeContextMenu = () => {
    setContextMenuPos(null);
    setCancionContextMenu(null);
  };

  const handleContextMenu = (event: React.MouseEvent, cancion: ISong) => {
    event.preventDefault();
    setCancionContextMenu(cancion);
    setContextMenuPos({ x: event.pageX, y: event.pageY });
  };

  const baseUrl = "https://api-musica.netlify.app/";

  const buildImageUrl = (path: string | undefined) => {
    if (!path) return undefined;
    return `${baseUrl}${path}`.replace(/'/g, "%27").replace(/ /g, "%20");
  };

  useEffect(() => {
    if (alertaVisible) {
      const timeout = setTimeout(() => {
        setAlertaVisible(false);
        setAlertaMensaje("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alertaVisible]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="genre-view-container" onClick={closeContextMenu}>
      <section className="genres-section">
        <h2>Géneros</h2>
        <ul className="genres-list">
          {genres.map((genre, i) => (
            <li
              key={i}
              className="genre-item"
              onClick={() =>
                setGeneroSeleccionado((prev) => (prev === genre ? null : genre))
              }
              style={{
                cursor: "pointer",
                fontWeight: generoSeleccionado === genre ? "bold" : "normal",
                color: generoSeleccionado === genre ? "#1db954" : "inherit",
              }}
            >
              {genre}
            </li>
          ))}
        </ul>
      </section>

      {generoSeleccionado && (
        <section className="songs-by-genre">
          <h2>Canciones del género: {generoSeleccionado}</h2>
          {cancionesFiltradas.length > 0 ? (
            <ul>
              {cancionesFiltradas.map((c) => (
                <li
                  key={c.id}
                  onClick={() => setCancionSeleccionada(c)}
                  onContextMenu={(e) => handleContextMenu(e, c)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  🎵 {c.title} — {c.duration}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay canciones para este género.</p>
          )}
        </section>
      )}

      {contextMenuPos && cancionContextMenu && (
        <AddToPlaylistMenu
          cancion={cancionContextMenu}
          onClose={closeContextMenu}
          position={contextMenuPos}
          onAddSuccess={(playlistName) => {
            setAlertaMensaje(`Canción agregada a la playlist "${playlistName}"`);
            setAlertaVisible(true);
            closeContextMenu();
          }}
        />
      )}

      {alertaVisible && (
        <div className="alerta-emergente">
          {alertaMensaje}
        </div>
      )}

      <section className="album-section">
        <h2>Volver a Escuchar</h2>
        <div className="album-grid">
          {volverAEscuchar.map((album) => {
            const imageUrl = buildImageUrl(album.cover);
            return (
              <div
                key={album.id}
                className="album-card"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "140px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease",
                }}
                title={album.title}
              >
                <div
                  className="album-info"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "10px",
                    position: "relative",
                    top: "calc(100% - 50px)",
                    borderRadius: "0 0 10px 10px",
                    textAlign: "center",
                  }}
                >
                  <p className="album-title" style={{ margin: 0, fontWeight: "600" }}>
                    {album.title}
                  </p>
                  <p className="album-year" style={{ margin: 0, fontSize: "13px" }}>
                    {album.launch_year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="album-section">
        <h2>Escuchado Recientemente</h2>
        <div className="album-grid">
          {escuchadoRecientemente.map((album) => {
            const imageUrl = buildImageUrl(album.cover);
            return (
              <div
                key={album.id}
                className="album-card"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "140px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease",
                }}
                title={album.title}
              >
                <div
                  className="album-info"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "10px",
                    position: "relative",
                    top: "calc(100% - 50px)",
                    borderRadius: "0 0 10px 10px",
                    textAlign: "center",
                  }}
                >
                  <p className="album-title" style={{ margin: 0, fontWeight: "600" }}>
                    {album.title}
                  </p>
                  <p className="album-year" style={{ margin: 0, fontSize: "13px" }}>
                    {album.launch_year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default GenreView;
