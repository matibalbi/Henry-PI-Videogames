import { Link } from 'react-router-dom';

const VideogameCard = ({id, name, image, genres}) => {
  return (
    <div>
        <Link to={`/videogame/${id}`}>
            <h3>{name}</h3>
        </Link>
        <img src={image} alt={name} />
        <p>Genres: {genres.join(", ")}</p>
    </div>
  );
};

export default VideogameCard;