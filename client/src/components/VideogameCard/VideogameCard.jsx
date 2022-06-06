import { Link } from 'react-router-dom';
import DefaultImage from '../../img/control.png'
import './VideogameCard.css';

const VideogameCard = ({id, name, image, genres, rating}) => {
  
  if (!image) image = DefaultImage

  return (
    <div className="containerCard">
        <Link to={`/videogame/${id}`} className="cardTitle">
          {name}
        </Link>
        <Link to={`/videogame/${id}`}>
          <img src={image} alt={name} className="cardImg"/>
        </Link>
        <div className="containerRating">
          <span>Rating <span className="arrowRating">&#129146;</span> {rating}</span>
          <span className="star">&#11088;</span>
        </div>
        <div className="cardGenres">
          <span>Genres </span>
          <span className="arrowGenre">&#129146; </span>
          {
            genres?.map((genre, i) => {
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
        </div>
    </div>
  );
};

export default VideogameCard;