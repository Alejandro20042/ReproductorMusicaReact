import { useState } from 'react';
import type { MainContentProps, Song } from '../interfaces/types';
import SearchBar from './SearchBar';
import AlbumSection from './AlbumSection';
import SingleSection from './SingleSection';
import MusicPlayer from './MusicPlayer';
import CreatedForUsers from './CreatedForUsers';
import BackgroundCarousel from './BackgroundCarousel';


const MainContent = ({
  albums,
  singles,
  searchTerm,
  onSearchChange,
  onClearSearch,
  showClearBtn,
  searchResults,
  allSongs,
}: MainContentProps) => {
  const [cancionSeleccionada, setCancionSeleccionada] = useState<Song | null>(null);
  return (
    <div className="mainContent">
      <div className="centralView">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onClear={onClearSearch}
          showClear={showClearBtn}
        />
        <BackgroundCarousel allSongs={allSongs} />

        <div className="search-results" id="searchResults">
          {searchResults.length === 0 ? (
            <div></div>
          ) : (
            searchResults.map(cancion => (
              <div key={cancion.id} className="itmens-search">
                <div className="search-item-info">
                  <strong>{cancion.titulo}</strong>
                  <br />
                  {cancion.artistaCompleto.nombre}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <div className="containeralbumformmain">
        <AlbumSection albums={albums} canciones={allSongs} onSelectSong={setCancionSeleccionada} />
        <SingleSection singles={singles} onSelectSong={setCancionSeleccionada} />
      </div>
      <CreatedForUsers songs={allSongs} />
      <MusicPlayer canciones={allSongs} cancionInicial={cancionSeleccionada} />
    </div>
  );
};
export default MainContent;
