import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="backgroundImage">
            <Link to="/home">
                <button className="center">Ingresar</button>
            </Link>
        </div>
    )
}

export default Landing