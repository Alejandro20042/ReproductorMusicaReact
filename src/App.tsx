import { useState, useEffect } from 'react';
import MainContent from './components/MainContent';
import SideMenu from './components/SideMenu';
import "./styles/style.css"
import type { Song } from './interfaces/types';

const App = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<{ id: string | number; titulo: string; añoLanzamiento: number }[]>([]);
  const [singles, setSingles] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api-musica.netlify.app/api/canciones');
        const data = await res.json();
        console.log(data);
        setAllSongs(data.data);

        const uniqueAlbumsMap = new Map();
        data.data.forEach((song: Song) => {
          if (!uniqueAlbumsMap.has(song.albumCompleto.id)) {
            uniqueAlbumsMap.set(song.albumCompleto.id, song.albumCompleto);
          }
        });
        setAlbums(Array.from(uniqueAlbumsMap.values()));

        setSingles(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowClearBtn(false);
    } else {
      const filtered = allSongs.filter(
        song =>
          song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artistaCompleto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowClearBtn(true);
    }
  }, [searchTerm, allSongs]);

  const handleSearchChange = (value: string) => setSearchTerm(value);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowClearBtn(false);
  };

  return (
    <div className="containerPrincipal">
      <SideMenu />
      <MainContent
        albums={albums}
        singles={singles}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        showClearBtn={showClearBtn}
        searchResults={searchResults}
        allSongs={allSongs} 
        albumCovers={[]}  />
    </div>
  );
};

export default App;
