import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/style.css";

import Layout from './components/Layout';
import MainContent from './components/MainContent';
import GenreView from './components/SideMenuViews/GenreView/GenreView';
import TopChartsView from './components/SideMenuViews/TopChartsView/TopChartsView';

import type { Song } from './interfaces/types';
import { FavoritesProvider } from './contexts/FavoritesContext';
import FavoritosView from './components/SideMenuViews/FavoritesView/FavoritesView';
import PageNotReady from './components/PageNotReady';

const App = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<{ id: string | number; titulo: string; añoLanzamiento: number }[]>([]);
  const [singles, setSingles] = useState<Song[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [albumCovers, setAlbumCovers] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resSongs = await fetch('https://api-musica.netlify.app/api/canciones');
        const dataSongs = await resSongs.json();
        setAllSongs(dataSongs.data);

        const uniqueAlbumsMap = new Map();
        dataSongs.data.forEach((song: Song) => {
          if (!uniqueAlbumsMap.has(song.albumCompleto.id)) {
            uniqueAlbumsMap.set(song.albumCompleto.id, song.albumCompleto);
          }
        });
        setAlbums(Array.from(uniqueAlbumsMap.values()));
        setSingles(dataSongs.data);

        const resGenres = await fetch('https://api-musica.netlify.app/api/generos');
        const dataGenres = await resGenres.json();
        setGenres(dataGenres.data);

        const covers = Array.from(uniqueAlbumsMap.values()).map(album => album.portada || '');
        setAlbumCovers(covers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
    <FavoritesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout canciones={allSongs} />}>
          <Route
            index
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
                albumCovers={albumCovers}
                genres={genres}
                loading={loading}
              />
            }
          />
          <Route
            path="genres"
            element={
              <GenreView
                genres={genres}
                volverAEscuchar={albums.slice(0, 5)}
                escuchadoRecientemente={albums.slice(5, 10)}
                canciones={allSongs}
                loading= {loading}
              />
            }
          />
          <Route path="topcharts" element={<TopChartsView songs={allSongs}/>}/>
          <Route path="/favorites" element={<FavoritosView/>}/>
          <Route path='/podcast' element={<PageNotReady/>}/>
        </Route>
      </Routes>
    </Router>
    </FavoritesProvider>
  );
};

export default App;

