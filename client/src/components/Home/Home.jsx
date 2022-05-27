import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getVideogames} from "../../redux/actions"
import Pagination from "../Pagination/Pagination";
import VideogameCard from "../VideogameCard/VideogameCard";
import './Home.css';

function Home() {

    const videogames = useSelector(state => state.videogames)
    const currentPage = useSelector(state => state.currentPage)

    const dispatch = useDispatch()

    // Get videogames
    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    // Set current page and games per page
    const gamesPerPage = 15

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame)

    return (
        <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={videogames.length}/>
            <div className='cards'>
                {
                    currentGames?.map(vg =>
                        <VideogameCard 
                        key={vg.id}
                        id={vg.id}
                        name={vg.name}
                        image={vg.image}
                        genres={vg.genres}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Home