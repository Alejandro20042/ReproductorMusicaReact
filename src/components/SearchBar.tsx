import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="input-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <span
          className="clear-icon"
          id="clearSearch"
          onClick={() => setSearch('')}
        >
          ✖
        </span>
      )}
      <div id="searchResults" className="search-results"></div>
    </div>
  );
}

export default SearchBar;
