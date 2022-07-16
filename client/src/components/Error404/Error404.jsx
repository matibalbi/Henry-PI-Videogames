import { Link } from 'react-router-dom';
import './Error404.css'
import LinkDead from "../../img/link-dead.jpg"

const Error404 = () => {

    return (
        <div className='containerError404'>
            <div className='containerImgError404'>
                <img src={LinkDead} alt="pageNotFound" className='imgError404'/>
            </div>
            <div className='containerButtonError404'>
                <Link to="/home">
                    <button type="button" className='buttonError404'>RETURN TO HOME</button>
                </Link>
            </div>
        </div>
    );
}

export default Error404;