// src/interfaces/types.ts

export interface Album {
  id: string | number;
  titulo: string;
  añoLanzamiento: number;
  portada?: string;           // Opcional si usas portada
  descripcion?: string;       // Opcional
  // otros campos si los usas, sino eliminar
}

export interface Artist {
  id: string | number;
  nombre: string;
  imagen?: string;
  // otros campos opcionales según uso
}

export interface Song {
  id: string | number;
  titulo: string;
  duracion: string;
  artista: string;
  albumCompleto: Album;
  artistaCompleto: Pick<Artist, 'nombre'>;  
  imagen?: string;                          
}

export interface Single extends Song {
  id: string | number;
  titulo: string;
  artista: string;
  duracion: string;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  showClear: boolean;
}

export interface MainContentProps {
  albums: Album[];
  singles: Song[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  showClearBtn: boolean;
  searchResults: Song[];
  allSongs: Song[];
}

export interface AlbumSectionProps {
  albums: Album[];
}

export interface CreatedForUsersProps {
  songs: Song[];
}

export interface SingleSectionProps {
  singles: Song[];
}
