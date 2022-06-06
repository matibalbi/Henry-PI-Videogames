import { Link } from 'react-router-dom';
import DeadLink from "../../img/dead-link.png"
import './Error404.css'

const Error404 = () => {

    return (
        <div className='containerError404'>
            <img src={DeadLink} alt={"error 404"} className='imgError404'/>
            <Link to="/home">
                <button type="button" className='buttonError404'>RETURN TO HOME</button>
            </Link>
        </div>
    );
}

export default Error404;