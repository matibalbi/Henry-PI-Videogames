import {useSelector} from "react-redux"
import LuigiLost from "../../img/luigi-lost.png"
import MarioDead from "../../img/mario-dead.png"
import './VideogameNotFound.css'

const VideogameNotFound = () => {

    const search = useSelector(state => state.search)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)

    const luigi = search && filterGenre === "" && filterType === ""

    return (
        <div className={'containerNotFound' + (search ? ' marginShortNotFound' : ' marginLongNotFound')}>
            {luigi && <img src={LuigiLost} alt={"search not found"} className='imgSearchNotFound'/>}
            {!luigi && <img src={MarioDead} alt={"filter not found"} className='imgFilterNotFound'/>}
        </div>
    );
}

export default VideogameNotFound;