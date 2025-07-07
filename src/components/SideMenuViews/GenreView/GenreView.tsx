//npm install react-router-dom
import type { GenreViewProps } from "../../../interfaces/types";
import "./GenreView.css";

const GenreView = ({ genres }: GenreViewProps) => {
  return (
    <div className="genre-view">
      <h2 className="genre-title">Explora por Género</h2>
      <p className="genre-subtitle">
        Descubre música según tus gustos, desde rock clásico hasta los ritmos más actuales.
      </p>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <div key={index} className="genre-card">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreView;
