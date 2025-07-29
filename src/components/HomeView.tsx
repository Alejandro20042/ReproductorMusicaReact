import { useOutletContext } from 'react-router-dom';
import type { HomeViewProps, OutletContextType } from '../interfaces/types';

import SearchBar from './SearchBar';
import AlbumSection from './AlbumSection';
import SingleSection from './SingleSection';
import BackgroundCarousel from './BackgroundCarousel';
import LoadingScreen from './LoadingScreen/LoadingScreen';

const HomeView = ({
  albums,
  singles,
  searchTerm,
  onSearchChange,
  onClearSearch,
  showClearBtn,
  searchResults,
  allSongs,
  loading = false,
}: HomeViewProps) => {
  const outletContext = useOutletContext<OutletContextType>();
  if (!outletContext) return null;
  const { setCancionSeleccionada } = outletContext;

  if (loading) return <LoadingScreen />;

  return (
    <div className="mainContent">
      <div className="centralView">
        <div className="search-carousel-container">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onClear={onClearSearch}
            showClear={showClearBtn}
            searchResults={searchResults}
            setCancionSeleccionada={setCancionSeleccionada}
          />
          <BackgroundCarousel allSongs={allSongs} />
        </div>
      </div>

      <div className="containeralbumformmain">
        <AlbumSection
          albums={albums}
          canciones={allSongs}
          onSelectSong={setCancionSeleccionada}
        />
        <SingleSection singles={singles} onSelectSong={setCancionSeleccionada} />
      </div>
    </div>
  );
};

export default HomeView;
