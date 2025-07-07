// src/interfaces/types.ts

export interface Album {
  id: string | number;
  titulo: string;
  añoLanzamiento: number;
  portada?: string;           
  descripcion?: string;       
  
}

export interface Artist {
  id: string | number;
  nombre: string;
  imagen?: string;
}

export interface Song {
  id: string | number;
  titulo: string;
  duracion: string;
  artista: string;
  albumCompleto: Album;
  artistaCompleto: Artist;  
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
  albumCovers: string[];
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

export interface GenreViewProps {
  genres: string[];
}
