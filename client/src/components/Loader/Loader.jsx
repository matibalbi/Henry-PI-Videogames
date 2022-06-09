import MarioLoading from "../../img/loading-mario.gif"
import './Loader.css';

const Loader = () => {


    return (
        <div className='containerLoader'>
            <img src={MarioLoading} alt={"loading"} className='loader'/>
        </div>
    )
}

export default Loader