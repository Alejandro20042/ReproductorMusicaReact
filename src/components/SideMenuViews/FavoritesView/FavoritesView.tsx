import { useOutletContext } from "react-router-dom";
import { useFavorites } from "../../../contexts/FavoritesContext";
import type { OutletContextType } from "../../../interfaces/types";
import "./FavoritesView.css";

const FavoritosView = () => {
  const { favoritos, toggleFavorito } = useFavorites();
  const { setCancionSeleccionada } = useOutletContext<OutletContextType>();


  return (
    <div className="favoritos-container">
      <h2 className="favoritos-title">Tus Favoritos</h2>
    
      {favoritos.length === 0 ? (
        <p className="favoritos-empty">No has agregado canciones a favoritos.</p>
      ) : (
        <ul className="favoritos-list">
            {favoritos.map((cancion) => (
              <li key={cancion.id} className="favorito-item"
                style={{ cursor: "pointer" }}>
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
                onClick={() => toggleFavorito(cancion)}
                title="Quitar de favoritos"
                aria-label={`Quitar ${cancion.title} de favoritos`}
              >
                ❤️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritosView;

