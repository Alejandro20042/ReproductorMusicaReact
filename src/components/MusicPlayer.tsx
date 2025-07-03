const MusicPlayer = () => {
  return (
    <div className="musicPlayer">
      <img src="/images/regida.webp" className="albumCover" alt="" />
      <div className="songInfo">
        <div className="songTitle">TQM</div>
        <div className="artistName">Fuerza Regida</div>
      </div>
      <div className="controlsMusic">
        <div className="controlPrev">◀</div>
        <div className="controlPlay">⏵</div>
        <div className="controlNext">▶</div>
      </div>

      <progress
        id="progressBar"
        value={0}
        max={100}
        style={{ width: '60%', height: '6px' }}
      ></progress>
      <span id="currentTime" style={{ padding: 10 }}>
        0:00
      </span>

      <audio
        id="audioPlayer"
        src="/music/Fuerza Regida - TQM [Official Video].mp3"
      ></audio>
      <label style={{ fontSize: 14, padding: 10 }}>Volumen</label>
      <input type="range" id="volumeSlider" min={0} max={1} step={0.01} defaultValue={1} style={{ width: '10%' }}
      />
    </div>
  );
};


export default MusicPlayer;
