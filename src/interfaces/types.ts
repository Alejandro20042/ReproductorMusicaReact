import type { IAlbum, ISong } from "./ISong";

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  showClear: boolean;
}

export interface HomeViewProps {
  albums: IAlbum[];
  singles: ISong[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  showClearBtn: boolean;
  searchResults: ISong[];
  allSongs: ISong[];
  albumCovers: string[];
  genres: string[];
  loading?: boolean;
}

export interface CreatedForUsersProps {
  songs: ISong[];
}

export interface AlbumSectionProps {
  albums: IAlbum[];
  canciones: ISong[];
  onSelectSong: (song: ISong) => void;
}

export interface SingleSectionProps {
  singles: ISong[];
  onSelectSong: (song: ISong) => void;
}

export interface GenreViewProps {
  genres: string[];
  volverAEscuchar: IAlbum[];
  escuchadoRecientemente: IAlbum[];
  canciones: ISong[];
  loading?: boolean;
}

export interface MusicPlayerProps {
  canciones: ISong[];
  cancionInicial?: ISong | null;
}

export interface TopChartsViewProps {
  songs: ISong[];
  onSelectSong: (song: ISong) => void;
}

export interface LayoutProps {
  canciones: ISong[];
  cancionInicial?: ISong | null;
  setCancionSeleccionada?: (cancion: ISong | null) => void;
}

export type OutletContextType = {
  canciones: ISong[];
  cancionSeleccionada: ISong | null;
  setCancionSeleccionada: (song: ISong | null) => void;
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