import { useState, useEffect, useRef } from "react";
import type { MusicPlayerProps, Song } from "../interfaces/types";

const MusicPlayer = ({ canciones, cancionInicial = null }: MusicPlayerProps) => {
  const [cancionActual, setCancionActual] = useState<Song | null>(cancionInicial);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCancionActual(cancionInicial);
    setTiempoActual(0);
    setReproduciendo(false);
  }, [cancionInicial]);

  const duracionEnSegundos = (duracion: string) => {
    const [min, seg] = duracion.split(":").map(Number);
    return min * 60 + seg;
  };

  const formatearTiempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg < 10 ? "0" : ""}${seg}`;
  };

  useEffect(() => {
    if (reproduciendo && cancionActual) {
      intervaloRef.current = setInterval(() => {
        setTiempoActual(prev => {
          if (prev >= duracionEnSegundos(cancionActual.duracion)) {
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
    setReproduciendo(prev => !prev);
  };

  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}`:"";

  return (
    <div className="musicPlayer">

      <div className="leftSection">
        <img
          src={getImageUrl(cancionActual?.artistaCompleto.imagen)}
          className="albumCover"
          alt={cancionActual?.albumCompleto.titulo || "Album"}
        />
        <div className="songInfo">
          <div className="songTitle">{cancionActual?.titulo || "Selecciona una canción"}</div>
          <div className="artistName">{cancionActual?.artista || ""}</div>
        </div>
      </div>

      <div className="centerSection">
        <div className="controls">
          <button className="controlBtn" onClick={() => {

            if (!cancionActual) return;
            const idx = canciones.findIndex(c => c.id === cancionActual.id);
            const prevIdx = idx > 0 ? idx - 1 : canciones.length - 1;
            setCancionActual(canciones[prevIdx]);
          }}>⏮</button>

          <button className="controlBtn" onClick={togglePlay}>
            {reproduciendo ? "⏸" : "▶"}
          </button>

          <button className="controlBtn" onClick={() => {
            if (!cancionActual) return;
            const idx = canciones.findIndex(c => c.id === cancionActual.id);
            const nextIdx = idx < canciones.length - 1 ? idx + 1 : 0;
            setCancionActual(canciones[nextIdx]);
          }}>⏭</button>
        </div>

        <div className="progressBarContainer">
          <span className="currentTime">{formatearTiempo(tiempoActual)}</span>
          <progress
            id="progressBar"
            value={tiempoActual}
            max={cancionActual ? duracionEnSegundos(cancionActual.duracion) : 100}
          />
          <span className="duration">{cancionActual?.duracion || "0:00"}</span>
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
