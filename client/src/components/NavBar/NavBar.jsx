import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    return (
        <div className="links">
            <Link to="/home">Home</Link>
            <Link to="/createVideogame">Create Videogame</Link>
        </div>
    )
}

export default NavBar