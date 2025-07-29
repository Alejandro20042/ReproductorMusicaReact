import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongsApiService from './data/services/songs_api_service';
import "./styles/style.css";

import Layout from './components/Layout';
import HomeView from './components/HomeView';
import GenreView from './components/SideMenuViews/GenreView/GenreView';
import TopChartsView from './components/SideMenuViews/TopChartsView/TopChartsView';

import type { IAlbum, ISong } from './interfaces/ISong';
import { FavoritesProvider } from './contexts/FavoritesContext';
import FavoritosView from './components/SideMenuViews/FavoritesView/FavoritesView';
import PageNotReady from './components/PageNotReady';
import { PlaylistProvider } from './contexts/PlaylistContext';
import SinglePlaylistView from './components/SideMenuViews/PlaylistView/SinglePlaylistView';
import PlaylistsView from './components/SideMenuViews/PlaylistView/PlaylistsView';

import _ from "lodash";

const App = () => {
  const [allSongs, setAllSongs] = useState<ISong[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [singles, setSingles] = useState<ISong[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [albumCovers, setAlbumCovers] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ISong[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowClearBtn(false);
    } else {
      const filtered = allSongs.filter(
        song =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowClearBtn(true);
    }
  }, [searchTerm, allSongs]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const songsResponse = await SongsApiService.getSongs();
      loadData(songsResponse);
      setAllSongs(songsResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (songs: ISong[]) => {
    const albumsList: IAlbum[] = [];
    songs.forEach((song: ISong) => {
      albumsList.push(song.album);
    });
    const albumsUniqList = _.uniqBy(albumsList, "id");
    setAlbums(albumsUniqList);
    setSingles(songs);
    const genresList = albumsUniqList.map(album => album.genere);
    const genreUniqList = _.uniq(genresList); 
    setGenres(genreUniqList);

    const covers = Array.from(albumsList.values()).map(album => album.cover || '');
    setAlbumCovers(covers);
  };

  const handleSearchChange = (value: string) => setSearchTerm(value);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowClearBtn(false);
  };

  return (
    <FavoritesProvider>
      <PlaylistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout canciones={allSongs} />}>
              <Route
                index
                element={
                  <HomeView
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
                    loading={loading}
                  />
                }
              />
              <Route path="topcharts" element={<TopChartsView />} />
              <Route path="favorites" element={<FavoritosView />} />
              <Route path="playlist" element={<PlaylistsView />} />
              <Route path="playlist/:id" element={<SinglePlaylistView />} />
              <Route path='podcast' element={<PageNotReady />} />
            </Route>
          </Routes>
        </Router>
      </PlaylistProvider>
    </FavoritesProvider>
  );
};

export default App;

