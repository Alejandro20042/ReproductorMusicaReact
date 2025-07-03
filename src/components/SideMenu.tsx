import { useState } from 'react';

const SideMenu = () => {
  const [abierto, setAbierto] = useState(true);
  const toggleMenu = () => setAbierto(!abierto);

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`sideMenu ${abierto ? 'abierto' : 'cerrado'}`}>
        <p className="browserMenu">Browser</p>
        <ol>
          <li className="discoverButton">
            <img src="/images/search.png" alt="" />
            Discover
          </li>
          <li className="genreButton">
            <img src="/images/genre.png" alt="" />
            Genre
          </li>
          <li className="topchartsButton">
            <img src="/images/heartphones.png" alt="" />
            Top Charts
          </li>
          <li className="podcastButton">
            <img src="/images/mic.png" alt="" />
            Podcast
          </li>
        </ol>

        <p className="libraryMenu">Library</p>
        <ol>
          <li className="favorites">
            <img src="/images/start.png" alt="" />
            Favorites
          </li>
          <li className="playlist">
            <img src="/images/playlist.png" alt="" />
            Playlist
          </li>
        </ol>
      </div>
    </>
  );
};

export default SideMenu;
