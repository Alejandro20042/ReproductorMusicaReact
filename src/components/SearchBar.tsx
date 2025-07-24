import type { SearchBarProps } from '../interfaces/types';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onClear,
  showClear,
  searchResults,
  setCancionSeleccionada,
}: SearchBarProps & {
  searchResults: any[];
  setCancionSeleccionada: (cancion: any) => void;
}) => {
  return (
    <div className="input-container" style={{ position: 'relative' }}>
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        autoComplete="off"
      />
      <span
        className="clear-icon"
        id="clearSearch"
        onClick={onClear}
        style={{ display: showClear ? 'inline' : 'none' }}
      >
        ✖
      </span>

      {/* Resultados justo debajo */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((cancion) => (
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
      )}
    </div>
  );
};

export default SearchBar;
