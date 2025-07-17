import { useOutletContext } from 'react-router-dom';
import type { MainContentProps, OutletContextType } from '../interfaces/types';

import SearchBar from './SearchBar';
import AlbumSection from './AlbumSection';
import SingleSection from './SingleSection';
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
  loading = false,
}: MainContentProps) => {
  const outletContext = useOutletContext<OutletContextType>();
  if (!outletContext) return null;
  const { setCancionSeleccionada } = outletContext;

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-content">
          <p>Cargando contenido, por favor espera...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

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
          {searchResults.map(cancion => (
            <div
              key={cancion.id}
              className="itmens-search"
              onClick={() => setCancionSeleccionada(cancion)}
              style={{ cursor: 'pointer' }}
            >
              <div className="search-item-info">
                <strong>{cancion.titulo}</strong>
                <br />
                {cancion.artistaCompleto.nombre}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="containeralbumformmain">
        <AlbumSection albums={albums} canciones={allSongs} onSelectSong={setCancionSeleccionada} />
        <SingleSection singles={singles} onSelectSong={setCancionSeleccionada} />
      </div>
    </div>
  );
};

export default MainContent;
