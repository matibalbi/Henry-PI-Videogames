import { Link } from 'react-router-dom';
import './IdNotFound.css'

const IdNotFound = ({id}) => {

    return (
        <div className='containerIdNotFound'>
            <h3>{`Error 404: No video game found with ID "${id}"`}</h3>
            <div className='imgIdNotFound'></div>
            <Link to="/home">
                <button type="button" className='buttonIdNotFound'>RETURN TO HOME</button>
            </Link>
        </div>
    );
}

export default IdNotFound;