const MusicPlayer = () => {
  return (
    <div className="musicPlayer">

      <div className="leftSection">
        <img src="/images/regida.webp" className="albumCover" alt="Album" />
        <div className="songInfo">
          <div className="songTitle">TQM</div>
          <div className="artistName">Fuerza Regida</div>
        </div>
      </div>

      <div className="centerSection">
        <div className="controls">
          <button className="controlBtn">⏮</button>
          <button className="controlBtn">⏯</button>
          <button className="controlBtn">⏭</button>
        </div>

        <div className="progressBarContainer">
          <span className="currentTime">0:00</span>
          <progress id="progressBar" value={0} max={100}></progress>
          <span className="duration">3:21</span>
        </div>
      </div>
      <div className="rightSection">
        <label htmlFor="volumeSlider">🔊</label>
        <input
          type="range"
          id="volumeSlider"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
        />
      </div>

      <audio
        id="audioPlayer"
        src="/music/Fuerza Regida - TQM [Official Video].mp3"
      ></audio>
    </div>
  );
};

export default MusicPlayer;
