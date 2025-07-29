import { useState, useEffect, useRef } from "react";
import type { MusicPlayerProps } from "../interfaces/types";
import { useFavorites } from "../contexts/FavoritesContext";
import type { ISong } from "../interfaces/ISong";

const MusicPlayer = ({ canciones, cancionInicial = null }: MusicPlayerProps) => {
  const [cancionActual, setCancionActual] = useState<ISong | null>(cancionInicial);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { toggleFavorito, isFavorito } = useFavorites();
  const favorito = cancionActual ? isFavorito(cancionActual.id.toString()) : false;

  useEffect(() => {
    setCancionActual(cancionInicial);
    setTiempoActual(0);
    setReproduciendo(false);
  }, [cancionInicial]);

  useEffect(() => {
    setTiempoActual(0);
  }, [cancionActual]);

  const duracionEnSegundos = (duracion: string | number): number => {
    if (typeof duracion === "number") return duracion;
    const [min, seg] = duracion.split(":").map(Number);
    return min * 60 + seg;
  };

  const formatearTiempo = (segundos: number): string => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg < 10 ? "0" : ""}${seg}`;
  };

  useEffect(() => {
    if (reproduciendo && cancionActual) {
      intervaloRef.current = setInterval(() => {
        setTiempoActual((prev) => {
          const durSeg = duracionEnSegundos(cancionActual.duration);
          if (prev >= durSeg) {
            clearInterval(intervaloRef.current!);
            setReproduciendo(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [reproduciendo, cancionActual]);

  const togglePlay = () => {
    if (!cancionActual) return;
    setReproduciendo((prev) => !prev);
  };

  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}` : "localhost";

  const duracionSegundos = cancionActual
    ? duracionEnSegundos(cancionActual.duration)
    : 0;

  return (
    <div className="musicPlayer">
      <div className="leftSection" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={getImageUrl(cancionActual?.artist.image_url)}
          className="albumCover"
          alt={cancionActual?.album.title || "Album"}
        />
        <div className="songInfo" style={{ flex: 1 }}>
          <div className="songTitle">
            {cancionActual?.title || "Selecciona una canción"}
          </div>
          <div className="artistName">{cancionActual?.artist.name || ""}</div>
        </div>

        <button
          onClick={() =>
            cancionActual &&
            toggleFavorito({
              id: cancionActual.id.toString(),
              title: cancionActual.title,
              artist: cancionActual.artist.name,
              cover: cancionActual.album.cover || "",
            })
          }
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: favorito ? "red" : "white",
            padding: 0,
            marginLeft: "10px",
          }}
          aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorito ? "❤️" : "🤍"}
        </button>

      </div>

      <div className="centerSection">
        <div className="controls">
          <button
            className="controlBtn"
            onClick={() => {
              if (!cancionActual) return;
              const idx = canciones.findIndex((c) => c.id === cancionActual.id);
              const prevIdx = idx > 0 ? idx - 1 : canciones.length - 1;
              setCancionActual(canciones[prevIdx]);
            }}
          >
            ⏮
          </button>

          <button className="controlBtn" onClick={togglePlay}>
            {reproduciendo ? "⏸" : "▶"}
          </button>

          <button
            className="controlBtn"
            onClick={() => {
              if (!cancionActual) return;
              const idx = canciones.findIndex((c) => c.id === cancionActual.id);
              const nextIdx = idx < canciones.length - 1 ? idx + 1 : 0;
              setCancionActual(canciones[nextIdx]);
            }}
          >
            ⏭
          </button>
        </div>

        <div className="progressBarContainer">
          <span className="currentTime">{formatearTiempo(tiempoActual)}</span>
          <progress
            id="progressBar"
            value={tiempoActual}
            max={duracionSegundos}
          />
          <span className="duration">{formatearTiempo(duracionSegundos)}</span>
        </div>
      </div>

      <div className="rightSection">
        <label htmlFor="volumeSlider">🔊</label>
        <input
          type="range"
          id="volumeSlider"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
