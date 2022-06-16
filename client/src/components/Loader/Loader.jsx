import MarioLoading from "../../img/loading-mario.gif"
import './Loader.css';

const Loader = () => {

    return (
        <div className='containerLoader'>
            <div className='backgroundLoader'>
                <img src={MarioLoading} alt={"loading"} className='loader'/>
            </div>
        </div>
    )
}

export default Loader