import type { SingleSectionProps } from '../interfaces/types';

const SingleSection = ({ singles }: SingleSectionProps) => {
  return (
    <div className="lastestSigle">
      <p className="textlastessigle">Lastest Single</p>
      <ol id="singleList">
        {singles.slice(0, 5).map(single => (
          <li key={single.id} className="albumssingle">
            ▶ <img alt="" />
            <strong>{single.titulo}</strong> - {single.artista}{' '}
            <span style={{ fontSize: 12, color: '#aaa' }}>({single.duracion})</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SingleSection;
