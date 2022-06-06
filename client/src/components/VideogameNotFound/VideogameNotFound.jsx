import {useSelector} from "react-redux"
import LuigiLost from "../../img/luigi-lost.png"
import MarioDead from "../../img/mario-dead.png"
import './VideogameNotFound.css'

const VideogameNotFound = () => {

    const search = useSelector(state => state.search)

    return (
        <div className='containerNotFound'>
            {search && <img src={LuigiLost} alt={"search not found"} className='imgSearchNotFound'/>}
            {!search && <img src={MarioDead} alt={"filter not found"} className='imgFilterNotFound'/>}
        </div>
    );
}

export default VideogameNotFound;