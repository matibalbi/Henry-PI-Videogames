import {NavLink} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    return (
        <ul className="nav">
            <li><NavLink to="/home" className="navLinks" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/createVideogame" className="navLinks" activeClassName="active">Create Video game</NavLink></li>
        </ul>
    )
}

export default NavBar