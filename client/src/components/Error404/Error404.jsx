import { Link } from 'react-router-dom';
import './Error404.css'

const Error404 = () => {

    return (
        <div className='containerError404'>
            <div className='imgError404'></div>
            <Link to="/home">
                <button type="button">RETURN TO HOME</button>
            </Link>
        </div>
    );
}

export default Error404;