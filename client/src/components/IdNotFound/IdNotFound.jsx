import { Link } from 'react-router-dom';
import './IdNotFound.css'

const IdNotFound = ({id}) => {

    return (
        <div className='backgroundIdNotFound'>
            <div className='containerIdNotFound'>
                <div className='containerTextIdNotFound'>
                    <div className='textIdNotFound'>ERROR 404:</div>
                    <div className='textIdNotFound'>NO VIDEO GAME FOUND</div>
                    <div className='textIdNotFound'>WITH ID <span className='colorID'>{`"${id}"`}</span></div>
                </div>
                <Link to="/home">
                    <button type="button" className='buttonIdNotFound'>RETURN TO HOME</button>
                </Link>
            </div>
        </div>
    );
}

export default IdNotFound;