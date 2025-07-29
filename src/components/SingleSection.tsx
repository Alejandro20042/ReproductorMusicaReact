import type { SingleSectionProps } from '../interfaces/types';

const SingleSection = ({ singles, onSelectSong }: SingleSectionProps) => {
  const getImageUrl = (path?: string) =>
    path ? `https://api-musica.netlify.app/${path}` : 'https://via.placeholder.com/40';

  return (
    <div className="lastestSigle">
      <p className="textlastessigle">Lastest Single</p>
      <ol id="singleList">
        {singles.slice(0, 4).map(single => (
          <li
            key={single.id}
            className="albumssingle"
            style={{ cursor: "pointer" }}
            onClick={() => onSelectSong(single)}
          >
            ▶ <img src={getImageUrl(single.artist.image_url)} />
            <strong>{single.title}</strong> - {single.artist.name}{' '}
            <span style={{ fontSize: 12, color: '#aaa' }}>({single.duration})</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SingleSection;
