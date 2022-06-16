import {useSelector} from "react-redux"
import LuigiLost from "../../img/luigi-lost.png"
import MarioDead from "../../img/mario-dead.png"
import './VideogameNotFound.css'

const VideogameNotFound = () => {

    const searchDB = useSelector(state => state.searchDB)
    const searchAPI = useSelector(state => state.searchAPI)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)

    const luigi = searchDB && searchAPI && filterGenre === "" && filterType === ""

    return (
        <div className={'containerNotFound' + ((searchDB && searchAPI) ? ' marginShortNotFound' : ' marginLongNotFound')}>
            <div className='backgroundNotFound'>
                {luigi && <img src={LuigiLost} alt={"search not found"} className='imgSearchNotFound'/>}
                {!luigi && <img src={MarioDead} alt={"filter not found"} className='imgFilterNotFound'/>}
            </div>
        </div>
    );
}

export default VideogameNotFound;