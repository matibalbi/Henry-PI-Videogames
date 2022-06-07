import MarioLoading from "../../img/loading-mario.gif"
import './Loader.css';

const Loader = () => {
    return (
        <div className='containerLoader'>
            <img src={MarioLoading} alt={"loading"} className='loader2'/>
        </div>
    )
}

export default Loader