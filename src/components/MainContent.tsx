import SearchBar from "./SearchBar";
import AlbumSection from "./AlbumSection";
import MusicPlayer from "./MusicPlayer";

const MainContent = () => {
  return (
    <div className="mainContent">
      <div className="centralView">
        <SearchBar />
        <div className="titleGroup">
          <h1 className="centralText">WHAT'S NEW?</h1>
          <p className="textdescription">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            suscipit corrupti...
          </p>
        </div>
      </div>
      <AlbumSection />
      <MusicPlayer />
    </div>
  );
}

export default MainContent;
