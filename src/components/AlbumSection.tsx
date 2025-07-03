//UTILIZAR MAP PARA RENDERIZAR ALBUMNES SIGGLES Y LASTEST

const AlbumSection = () => {
  return (
    <div className="containeralbumformmain">
      <div className="albumForm">
        <p className="albumlastes">Album latest</p>
        <ol id="albumList">
          
        </ol>
      </div>

      <div className="lastestSigle">
        <p className="textlastessigle">Lastest Single</p>
        <ol id="singleList">
          
        </ol>
      </div>
    </div>
  );
}

export default AlbumSection;
