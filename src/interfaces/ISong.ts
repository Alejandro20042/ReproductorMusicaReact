export interface ISong {
  id: number;
  title: string;
  albumId: number;
  artistId: number;
  duration: string;
  track: number;
  lyrics: string;
  composer: string;
  year: number;
  album: IAlbum;     // relación N:1 con Album
  artist: IArtist;   // relación N:1 con Artist
}

export interface IAlbum {
  id: number;
  title: string;
  artistId: number;
  launch_year: number;
  genere: string;
  total_duration: string;
  tracks_number: number;
  cover: string;
  description: string;
  seal: string;
  producer: string;
  artist: IArtist;   
  songs: ISong[];    
}

export interface IArtist {
  id: number;
  name: string;
  nacionality: string;
  genere: string;
  formation_year: number;
  biography: string;
  image_url: string;
  albums: IAlbum[]; 
  songs: ISong[];   
}