import {useSelector} from "react-redux"
import MarioSadImage from '../../img/mario-sad.png'
import LuigiConfusedImage from '../../img/luigi-confused.png'
import './VideogameNotFound.css'

const VideogameNotFound = () => {

    const search = useSelector(state => state.search)
    const valueSearched = useSelector(state => state.valueSearched)

    const notFoundMessage = search
    ? `No video games found for your search: "${valueSearched}"`
    : "No video games found that match your filters"

    return (
        <div className='containerNotFound'>
            <h5>{notFoundMessage}</h5>
            {search && <img src={LuigiConfusedImage} alt={"Not found"} className='imgSearchNotFound'/>}
            {!search && <img src={MarioSadImage} alt={"Not found"} className='imgFilterNotFound'/>}
        </div>
    );
}

export default VideogameNotFound;