import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {sortNameAZ, sortNameZA, sortRatingBW, sortRatingWB} from "../../controllers/controllers";
import {getVideogames} from "../../redux/actions"
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import './Home.css';

const Home = () => {

    // Define global states from store
    let videogames = useSelector(state => state.videogames)
    const currentPage = useSelector(state => state.currentPage)
    const sort = useSelector(state => state.sort)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)

    const dispatch = useDispatch()

    // Get videogames
    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    // Sort videogames
    switch (sort) {
        case "nameAZ":
            videogames.sort(sortNameAZ)
            break
        case "nameZA":
            videogames.sort(sortNameZA)
            break
        case "ratingBW":
            videogames.sort(sortRatingBW)
            break
        case "ratingWB":
            videogames.sort(sortRatingWB)
            break
        default:
            break
    }

    // Filter videogames
    if (filterGenre !== "all") videogames = videogames.filter(e => e.genres.includes(filterGenre))
    
    if (filterType === "created") videogames = videogames.filter(e => e.id.length === 36)
    if (filterType === "existing") videogames = videogames.filter(e => e.id.length !== 36)

    // Set current page and games per page
    const gamesPerPage = 15

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame)

    return (
        <div>
            <SearchBar />
            <Filters />
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
                        rating={vg.rating}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Home