import { Link } from 'react-router-dom';
import './IdNotFound.css'
import KirbySad from "../../img/kirby-sad.jpg"

const IdNotFound = ({id}) => {

    return (
        <div className='containerIdNotFound'>
            <div className='containerTextIdNotFound'>
                <div className='textIdNotFound'>ERROR 404:</div>
                <div className='textIdNotFound'>NO VIDEO GAME FOUND</div>
                <div className='textIdNotFound'>WITH ID <span className='colorID'>{`"${id}"`}</span></div>
            </div>
            <div className='containerImgIdNotFound'>
                <img src={KirbySad} alt="idNotFound" className='imgIdNotFound'/>
            </div>
            <div className='containerBtnIdNotFound'>
                <Link to="/home">
                    <button type="button" className='buttonIdNotFound'>RETURN TO HOME</button>
                </Link>
            </div>
        </div>
    );
}

export default IdNotFound;