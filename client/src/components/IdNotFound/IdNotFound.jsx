import { Link } from 'react-router-dom';
import SadKirby from "../../img/kirby-sad.png"
import './IdNotFound.css'

const IdNotFound = ({id}) => {

    return (
        <div className='containerIdNotFound'>
            <div className='textIdNotFound'>{`Error 404: No video game found with ID "${id}"`}</div>
            {/* <h3 className='textIdNotFound'>{`Error 404: No video game found with ID "${id}"`}</h3> */}
            <img src={SadKirby} alt={"id not found"} className='imgIdNotFound'/>
            <Link to="/home">
                <button type="button" className='buttonIdNotFound'>RETURN TO HOME</button>
            </Link>
        </div>
    );
}

export default IdNotFound;