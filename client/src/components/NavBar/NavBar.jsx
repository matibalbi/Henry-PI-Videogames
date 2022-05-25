import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <Link to="/home">Home</Link>
            <Link to="/createVideogame">Create Videogame</Link>
        </div>
    )
}

export default NavBar