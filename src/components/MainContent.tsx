import SearchBar from './SearchBar';
import AlbumSection from './AlbumSection';
import SingleSection from './SingleSection';
import MusicPlayer from './MusicPlayer';
import type { MainContentProps } from '../interfaces/types';
import CreatedForUsers from './CreatedForUsers';


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
  return (
    <div className="mainContent">
      <div
        className="centralView"
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onClear={onClearSearch}
          showClear={showClearBtn}
        />

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

        <div className="titleGroup">
          <h1 className="centralText">WHAT'S NEW?</h1>
          <p className="textdescription">
            Aquí puedes encontrar los últimos lanzamientos y 
            sencillos más populares del momento.
          </p>
          <ul >
            {albums.slice(0, 2).map(album => (
              <li className='ulMainContent' key={album.id}>{album.titulo} ({album.añoLanzamiento})</li>
            ))}
          </ul>
        </div>

      </div>

      <div className="containeralbumformmain">
        <AlbumSection albums={albums} />
        <SingleSection singles={singles} />
      </div>
      <CreatedForUsers songs={allSongs} />
      <MusicPlayer />
    </div>
  );
};
export default MainContent;
