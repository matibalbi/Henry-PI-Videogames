import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="backgroundLanding">
            {/* <div className='wordsLuigi'>HEY!</div>
            <div className='wordsYoshi'>WELCOME TO...</div>
            <div className='wordsMario'>...VIDEO GAMES APP!</div> */}
            <div className='containerLanding'>    
                <div className='landingTitle'>WELCOME TO VIDEO GAMES APP!</div>
                <Link to="/home">
                    <button className="landingButton">Enter</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing