import {Link, NavLink} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    return (
        <ul className="nav">
            <li><Link to="/" className="navLinks">Landing</Link></li>
            <li><NavLink to="/home" className="navLinks">Home</NavLink></li>
            <li><NavLink to="/createVideogame" className="navLinks">Create</NavLink></li>
        </ul>
    )
}

export default NavBar