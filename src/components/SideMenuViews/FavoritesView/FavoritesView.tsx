import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFavorites } from "../../../contexts/FavoritesContext";
import AddToPlaylistMenu from "../../ContextMenu/AddToPlaylistMenu";
import "./FavoritesView.css";
import type { OutletContextType } from "../../../interfaces/types";

const FavoritosView = () => {
  const { favoritos, toggleFavorito } = useFavorites();
  const { setCancionSeleccionada, canciones } = useOutletContext<OutletContextType>();

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaMensaje, setAlertaMensaje] = useState("");

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    cancion: typeof favoritos[0] | null;
  }>({ visible: false, x: 0, y: 0, cancion: null });

  const handleContextMenu = (
    e: React.MouseEvent,
    cancion: typeof favoritos[0]
  ) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      cancion,
    });
  };

  const handleCloseMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, cancion: null });
  };

  const handleAddSuccess = (playlistName: string) => {
    setAlertaMensaje(`Canción agregada a la playlist "${playlistName}"`);
    setAlertaVisible(true);
    handleCloseMenu();
  };

  useEffect(() => {
    if (alertaVisible) {
      const timer = setTimeout(() => {
        setAlertaVisible(false);
        setAlertaMensaje("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertaVisible]);

  return (
    <div className="favoritos-container">
      <h2 className="favoritos-title">Tus Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="favoritos-empty">No has agregado canciones a favoritos.</p>
      ) : (
        <ul className="favoritos-list">
          {favoritos.map((cancion) => (
            <li
              key={cancion.id}
              className="favorito-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const cancionCompleta = canciones.find(
                  (c) => c.id.toString() === cancion.id.toString()
                );
                if (cancionCompleta) {
                  setCancionSeleccionada(cancionCompleta);
                }
              }}
              onContextMenu={(e) => handleContextMenu(e, cancion)}
            >
              <img
                src={`https://api-musica.netlify.app/${cancion.cover}`}
                alt={cancion.title}
                className="favorito-thumb"
              />
              <div className="favorito-details">
                <p className="favorito-title">{cancion.title}</p>
                <p className="favorito-artist">{cancion.artist}</p>
              </div>
              <button
                className="favorito-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(cancion);
                }}
                title="Quitar de favoritos"
                aria-label={`Quitar ${cancion.title} de favoritos`}
              >
                ❤️
              </button>
            </li>
          ))}
        </ul>
      )}

      {contextMenu.visible && contextMenu.cancion && (
        <AddToPlaylistMenu
          cancion={
            canciones.find(c => c.id.toString() === contextMenu.cancion!.id.toString())!
          }
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={handleCloseMenu}
          onAddSuccess={handleAddSuccess}
        />
      )}

      {alertaVisible && (
        <div className="alerta-emergente">
          {alertaMensaje}
        </div>
      )}
    </div>
  );
};

export default FavoritosView;
