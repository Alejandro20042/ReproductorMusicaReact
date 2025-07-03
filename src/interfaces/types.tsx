//src/interface/types

export interface AlbumCompleto {
  id: number;
  titulo: string;
  artistaId: number;
  añoLanzamiento: number;
  genero: string;
  duracionTotal: string;
  numeroTracks: number;
  portada: string;
  descripcion: string;
  sello: string;
  productor: string;
}

export interface ArtistaCompleto {
  id: number;
  nombre: string;
  nacionalidad: string;
  genero: string;
  añoFormacion: number;
  biografia: string;
  imagen: string;
}

export interface Cancion {
  id: number;
  titulo: string;
  albumId: number;
  artistaId: number;
  duracion: string;
  pista: number;
  letra: string;
  compositor: string;
  año: number;
  artista: string;
  album: string;
  artistaCompleto: ArtistaCompleto;
  albumCompleto: AlbumCompleto;
}

export interface Song {
  id: string | number;
  titulo: string;
  artista: string;
  duracion: string;
  albumCompleto: {
    id: string | number;
    titulo: string;
    añoLanzamiento: number;
  };
  artistaCompleto: {
    nombre: string;
  };
}

export interface Single {
  id: string | number;
  titulo: string;
  artista: string;
  duracion: string;
}

export interface SingleSectionProps {
  singles: Single[];
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  showClear: boolean;
}

export interface MainContentProps {
  albums: {
    id: string | number;
    titulo: string;
    añoLanzamiento: number;
  }[];
  singles: Song[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  showClearBtn: boolean;
  searchResults: Song[];
}


export interface Album {
  id: string | number;
  titulo: string;
  añoLanzamiento: number;
}

export interface AlbumSectionProps {
  albums: Album[];
}