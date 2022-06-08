import { Link } from 'react-router-dom';
import './Error404.css'

const Error404 = () => {

    return (
        <div className='backgroundError404'>
            <div className='containerError404'>
                <Link to="/home">
                    <button type="button" className='buttonError404'>RETURN TO HOME</button>
                </Link>
            </div>
        </div>
    );
}

export default Error404;