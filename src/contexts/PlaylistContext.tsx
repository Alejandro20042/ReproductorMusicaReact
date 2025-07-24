import { createContext, useContext, useState, type ReactNode } from "react";
import type { Song } from "../interfaces/types";

export type Playlist = {
  id: string;
  nombre: string;
  canciones: Song[];
};

type PlaylistContextType = {
  playlists: Playlist[];
  crearPlaylist: (nombre: string) => void;
  agregarAPlaylist: (playlistId: string, cancion: Song) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "playlistguardados",
      nombre: "Playlist",
      canciones: [],
    },
  ]);

  const crearPlaylist = (nombre: string) => {
    const nueva: Playlist = {
      id: crypto.randomUUID(),
      nombre,
      canciones: [],
    };
    setPlaylists((prev) => [...prev, nueva]);
  };

  const agregarAPlaylist = (playlistId: string, cancion: Song) => {
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
