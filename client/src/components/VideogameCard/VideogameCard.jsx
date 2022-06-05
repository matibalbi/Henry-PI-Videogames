import { Link } from 'react-router-dom';
import DefaultImage from '../../img/control.png'
import './VideogameCard.css';

const VideogameCard = ({id, name, image, genres, rating}) => {
  
  if (!image) image = DefaultImage

  return (
    <div className="container">
        <Link to={`/videogame/${id}`}>
          <h4>{name}</h4>
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
          <span className="arrowGenre">&#129146;</span>
          <span> {genres.join(" | ")}</span>
        </div>
    </div>
  );
};

export default VideogameCard;