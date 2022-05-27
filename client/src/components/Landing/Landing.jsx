import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
    return (
        <div>
            <Link to={`/home`}>
                <button className="center">Ingresar</button>
            </Link>
        </div>
    )
}

export default Landing