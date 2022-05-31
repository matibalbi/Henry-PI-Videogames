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
        <img src={image} alt={name} />
        <p>Genres: {genres.join(", ")}</p>
        <p>Rating: {rating}</p>
    </div>
  );
};

export default VideogameCard;