import {Link} from 'react-router-dom';
import DefaultImage from '../../img/controller.jpg'
import './VideogameCard.css';

const VideogameCard = ({id, name, image, genres, rating}) => {

  return (
    <div className="containerCard">
      <Link to={`/videogame/${id}`} className="linksCard">
        <div className="containerTitleCard">
            <div className="cardTitle">{name}</div>
        </div>
          <img src={image || DefaultImage} alt={name} className="cardImg"/>
        <div className="containerRating">
          <span className="fontBoldCard">Rating </span>
          <span className="arrowRating">&#129146;</span>
          {!!rating && <span><span> {rating}</span><span className="star">&#11088;</span></span>}
          {!rating && <span className="orangeHome"> (not rated)</span>}
        </div>
        <div className="containerGenresCard">
          <div className="cardGenres">
            <span className="fontBoldCard">Genres </span>
            <span className="arrowGenre">&#129146; </span>
            {!!genres.length && 
              genres.map((genre, i) => {
                if (i === 0) {
                  return <span key={i}>{genre}</span>
                }
                return (
                  <span key={i}>
                    <span className="arrowRating"> | </span>
                    <span>{genre}</span>
                  </span>
                )
              })
            }
            {!genres.length && <span className="orangeHome">(no genres assigned)</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideogameCard;