//npm install react-router-dom
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const [abierto, setAbierto] = useState(true);
  const toggleMenu = () => setAbierto(!abierto);

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`sideMenu ${abierto ? 'abierto' : 'cerrado'}`}>
        <p className="browserMenu">App Music</p>
        <ol>
          <li className="discoverButton">
            <img src="/images/search.png" alt="" />
            <Link to="/">Home</Link>
          </li>
          <li className="genreButton">
            <img src="/images/genre.png" alt="" />
            <Link to="/genres">Genre</Link>
          </li>
          <li className="topchartsButton">
            <img src="/images/heartphones.png" alt="" />
            <Link to="/topcharts">Top Charts</Link>
          </li>
          <li className="podcastButton">
            <img src="/images/mic.png" alt="" />
            <Link to="/podcast">Podcast</Link>
          </li>
        </ol>

        <p className="libraryMenu">Library</p>
        <ol>
          <li className="favorites">
            <img src="/images/start.png" alt="" />
            <Link to="/favorites">Favorites</Link>
          </li>
          <li className="playlist">
            <img src="/images/playlist.png" alt="" />
            <Link to="/playlist">Playlist</Link>
          </li>
        </ol>
      </div>
    </>
  );
};

export default SideMenu;
