export interface Album {
  id: string | number;
  titulo: string;
  añoLanzamiento: number;
  portada?: string;
  descripcion?: string;
  genero?: string;
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
  genres: string[];
  loading?: boolean;
}

export interface CreatedForUsersProps {
  songs: Song[];
}

export interface AlbumSectionProps {
  albums: Album[];
  canciones: Song[];
  onSelectSong: (song: Song) => void;
}

export interface SingleSectionProps {
  singles: Song[];
  onSelectSong: (song: Song) => void;
}

export interface GenreViewProps {
  genres: string[];
  volverAEscuchar: Album[];
  escuchadoRecientemente: Album[];
  canciones: Song[];
  loading?: boolean;
}

export interface MusicPlayerProps {
  canciones: Song[];
  cancionInicial?: Song | null;
}

export interface TopChartsViewProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

export interface LayoutProps {
  canciones: Song[];
  cancionInicial?: Song | null;
  setCancionSeleccionada?: (cancion: Song | null) => void;
}

export type OutletContextType = {
  canciones: Song[];
  cancionSeleccionada: Song | null;
  setCancionSeleccionada: (song: Song | null) => void;
};

export interface Favorito {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

export interface FavoritesContextType {
  favoritos: Favorito[];
  toggleFavorito: (item: Favorito) => void;
  isFavorito: (id: string) => boolean;
}