import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import SideMenu from './components/SideMenu';
import "./styles/style.css"
import type { Song } from './interfaces/types';
import GenreView from './components/SideMenuViews/GenreView/GenreView';

const App = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<{ id: string | number; titulo: string; añoLanzamiento: number }[]>([]);
  const [singles, setSingles] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api-musica.netlify.app/api/canciones');
        const data = await res.json();
        setAllSongs(data.data);

        fetch('https://api-musica.netlify.app/api/generos')
          .then(res => res.json())
          .then(data => setGenres(data.data))
          .catch(err => console.error('Error fetching genres:', err));

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
    <Router>
      <div className="containerPrincipal">
        <SideMenu />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                albums={albums}
                singles={singles}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                showClearBtn={showClearBtn}
                searchResults={searchResults}
                allSongs={allSongs}
                albumCovers={[]}
              />
            }
          />
          <Route
            path="/genres"
            element={<GenreView genres={genres} />}
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
