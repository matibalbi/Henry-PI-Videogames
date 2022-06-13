import {Link, NavLink} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    return (
        <ul className="nav">
            <div className="containerHomeCreate">
                <li><NavLink to="/home" className="navLinks">Home</NavLink></li>
                <li><NavLink to="/createVideogame" className="navLinks">Create</NavLink></li>
            </div>
            <li><Link to="/" className="navLinks exitLink">Exit</Link></li>
        </ul>
    )
}

export default NavBar