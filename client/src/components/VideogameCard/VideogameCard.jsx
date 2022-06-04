import { Link } from 'react-router-dom';
import DefaultImage from '../../img/controller.png'
import './VideogameCard.css';

const VideogameCard = ({id, name, image, genres, rating}) => {
  
  if (!image) image = DefaultImage

  return (
    <div className="container">
        <Link to={`/videogame/${id}`}>
            <h4>{name}</h4>
        </Link>
        <img src={image} alt={name} className="cardImg"/>
        <div className="containerRating">
          <span>Rating: {rating}</span>
          <span className="star">&#11088;</span>
        </div>
        <div>Genres: {genres.join(", ")}</div>
    </div>
  );
};

export default VideogameCard;