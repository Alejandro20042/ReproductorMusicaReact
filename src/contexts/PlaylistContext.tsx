import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ISong } from "../interfaces/ISong";

export type Playlist = {
  id: string;
  nombre: string;
  canciones: ISong[];
};

type PlaylistContextType = {
  playlists: Playlist[];
  crearPlaylist: (nombre: string) => void;
  agregarAPlaylist: (playlistId: string, cancion: ISong) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem("playlists");
    if (saved) {
      try {
        return JSON.parse(saved) as Playlist[];
      } catch {
        return [
          {
            id: "playlistguardados",
            nombre: "Playlist",
            canciones: [],
          },
        ];
      }
    }
    return [
      {
        id: "playlistguardados",
        nombre: "Playlist",
        canciones: [],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const crearPlaylist = (nombre: string) => {
    const nueva: Playlist = {
      id: crypto.randomUUID(),
      nombre,
      canciones: [],
    };
    setPlaylists((prev) => [...prev, nueva]);
  };

  const agregarAPlaylist = (playlistId: string, cancion: ISong) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
            ...playlist,
            canciones: playlist.canciones.some((c) => c.id === cancion.id)
              ? playlist.canciones
              : [...playlist.canciones, cancion],
          }
          : playlist
      )
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, crearPlaylist, agregarAPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylists debe usarse dentro de un PlaylistProvider");
  }
  return context;
};
