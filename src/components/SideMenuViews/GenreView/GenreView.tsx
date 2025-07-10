import { useState } from "react";
import type { GenreViewProps } from "../../../interfaces/types";
import "./GenreView.css";

function GenreView({ genres, volverAEscuchar, escuchadoRecientemente, canciones }: GenreViewProps) {
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string | null>(null);
  const baseUrl = "https://api-musica.netlify.app/";

  const cancionesFiltradas = generoSeleccionado ? canciones.filter((c) =>
    c.albumCompleto.genero?.toLowerCase() === generoSeleccionado.toLowerCase()
  ) : [];

  const buildImageUrl = (path: string | undefined) => {
    if (!path) return undefined;
    return `${baseUrl}${path}`.replace(/'/g, "%27").replace(/ /g, "%20");
  };

  return (
    <div className="genre-view-container">
      <section className="genres-section">
        <h2>Géneros</h2>
        <ul className="genres-list">
          {genres.map((genre, i) => (
            <li
              key={i}
              className="genre-item"
              onClick={() =>
                setGeneroSeleccionado(prev => (prev === genre ? null : genre))
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
                <li key={c.id}>
                  🎵 {c.titulo} — {c.duracion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay canciones para este género.</p>
          )}
        </section>
      )}

      <section className="album-section">
        <h2>Volver a Escuchar</h2>
        <div className="album-grid">
          {volverAEscuchar.map((album) => {
            const imageUrl = buildImageUrl(album.portada);
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
                title={album.titulo}
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
                  <p
                    className="album-title"
                    style={{ margin: 0, fontWeight: "600" }}
                  >
                    {album.titulo}
                  </p>
                  <p
                    className="album-year"
                    style={{ margin: 0, fontSize: "13px" }}
                  >
                    {album.añoLanzamiento}
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
            const imageUrl = buildImageUrl(album.portada);
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
                title={album.titulo}
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
                  <p
                    className="album-title"
                    style={{ margin: 0, fontWeight: "600" }}
                  >
                    {album.titulo}
                  </p>
                  <p
                    className="album-year"
                    style={{ margin: 0, fontSize: "13px" }}
                  >
                    {album.añoLanzamiento}
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
