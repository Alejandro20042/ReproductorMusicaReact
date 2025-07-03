import type { SearchBarProps } from '../interfaces/types';

const SearchBar = ({searchTerm,onSearchChange, onClear,showClear,}: SearchBarProps) => {
  return (
    <div className="input-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span
        className="clear-icon"
        id="clearSearch"
        onClick={onClear}
        style={{ display: showClear ? 'inline' : 'none' }}
      >
        ✖
      </span>
    </div>
  );
};

export default SearchBar;
