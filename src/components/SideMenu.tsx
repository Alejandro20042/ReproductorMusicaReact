const SideMenu = () => {
  return (
    <div className="sideMenu">
      <p className="browserMenu">Browser</p>
      <ol>
        <li className="discoverButton">
          <img src="/images/search.png" alt="" /> Discover
        </li>
        <li className="genreButton">
          <img src="/images/genre.png" alt="" /> Genre
        </li>
        <li className="topchartsButton">
          <img src="/images/heartphones.png" alt="" /> Top Charts
        </li>
        <li className="podcastButton">
          <img src="/images/mic.png" alt="" /> Podcast
        </li>
      </ol>

      <p className="libraryMenu">Library</p>
      <ol>
        <li className="favorites">
          <img src="/images/start.png" alt="" /> Favorites
        </li>
        <li className="playlist">
          <img src="/images/playlist.png" alt="" /> Playlist
        </li>
      </ol>
    </div>
  );
}

export default SideMenu;
