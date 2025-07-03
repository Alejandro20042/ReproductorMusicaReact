import SearchBar from './SearchBar';
import AlbumSection from './AlbumSection';
import SingleSection from './SingleSection';
import MusicPlayer from './MusicPlayer';
import type { MainContentProps } from '../interfaces/types';


const MainContent = ({
  albums,
  singles,
  searchTerm,
  onSearchChange,
  onClearSearch,
  showClearBtn,
  searchResults,
}: MainContentProps) => {
  return (
    <div className="mainContent">
      <div
        className="centralView"
        style={{ backgroundImage: "url('/images/imagenmusic.jpg')" }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onClear={onClearSearch}
          showClear={showClearBtn}
        />

        <div className="search-results" id="searchResults">
          {searchResults.length === 0 ? (
            <div>No se encontraron resultados.</div>
          ) : (
            searchResults.map(cancion => (
              <div key={cancion.id} className="itmens-search">
                <div className="search-item-info">
                  <strong>{cancion.titulo}</strong>
                  <br />
                  {cancion.artistaCompleto.nombre}
                  <br />
                  <small>{cancion.duracion}</small>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="titleGroup">
          <h1 className="centralText">WHAT'S NEW?</h1>
          <p className="textdescription">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            suscipit corrupti, voluptas reprehenderit cum repellendus
            consectetur eius omnis accusantium dolor maiores necessitatibus nihil
            explicabo est culpa ratione magni ipsum sed?
          </p>
        </div>
      </div>

      <div className="containeralbumformmain">
        <AlbumSection albums={albums} />
        <SingleSection singles={singles} />
      </div>

      <MusicPlayer />
    </div>
  );
};
export default MainContent;
