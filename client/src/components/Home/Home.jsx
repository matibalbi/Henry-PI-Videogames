import {useDispatch, useSelector} from "react-redux"
import {sortNameAZ, sortNameZA, sortRatingBW, sortRatingWB} from "../../controllers/controllers";
import {getGenres, getVideogamesFromAPI, getVideogamesFromDB} from "../../redux/actions"
import BackToAllGames from "../BackToAllGames/BackToAllGames";
import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import Reload from "../Reload/Reload";
import Reset from "../Reset/Reset";
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import VideogameNotFound from "../VideogameNotFound/VideogameNotFound";
import './Home.css';

const Home = () => {

    // Define global states from store
    const videogamesDB = useSelector(state => state.videogamesDB)
    const videogamesAPI = useSelector(state => state.videogamesAPI)
    const genres = useSelector(state => state.genres)
    const videogamesSearchDB = useSelector(state => state.videogamesSearchDB)
    const videogamesSearchAPI = useSelector(state => state.videogamesSearchAPI)
    const searchDB = useSelector(state => state.searchDB)
    const searchAPI = useSelector(state => state.searchAPI)
    const loadingVideogamesDB = useSelector(state => state.loadingVideogamesDB)
    const loadingVideogamesAPI = useSelector(state => state.loadingVideogamesAPI)
    const loadingGenres = useSelector(state => state.loadingGenres)
    const loadingSearchDB = useSelector(state => state.loadingSearchDB)
    const loadingSearchAPI = useSelector(state => state.loadingSearchAPI)
    const currentPage = useSelector(state => state.currentPage)
    const sortName = useSelector(state => state.sortName)
    const sortRating = useSelector(state => state.sortRating)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)

    const dispatch = useDispatch()

    // Define loading
    const loading = loadingVideogamesDB || loadingVideogamesAPI || loadingGenres || loadingSearchDB || loadingSearchAPI

    let videogames = []
    if (!loading) videogames = (searchDB && searchAPI)
        ? [...videogamesSearchDB, ...videogamesSearchAPI].slice(0, 15)
        : [...videogamesDB, ...videogamesAPI].slice()

    // Sort videogames
    switch (sortName) {
        case "nameAZ":
            videogames.sort(sortNameAZ)
            break
        case "nameZA":
            videogames.sort(sortNameZA)
            break
        default:
            break
    }

    switch (sortRating) {
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
    if (filterGenre !== "" && filterGenre !== "all") videogames = videogames.filter(e => e.genres.includes(filterGenre))
    
    if (filterType === "created") videogames = videogames.filter(e => e.id.length === 36)
    if (filterType === "existing") videogames = videogames.filter(e => e.id.length !== 36)

    // Set current page and games per page
    const gamesPerPage = 15

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame)

    // Get videogames and genres at first rendering
    if (!videogamesDB.length && !videogamesAPI.length && !genres.length) {
        dispatch(getVideogamesFromAPI())
        dispatch(getVideogamesFromDB())
        dispatch(getGenres())
    }

    return (
        <div className='containerHome'>
            <br></br>
            <NavBar />
            <div className='homeSettingsContainer'>
                <div className='homeSettings'>
                    <div className='containerReloadResetSearch'>
                        <Reload />
                        <SearchBar />
                        <Reset />
                    </div>
                    <Filters />
                    <Pagination gamesPerPage={gamesPerPage} totalGames={videogames.length}/>
                    {searchDB && searchAPI && <BackToAllGames/>}
                </div>
            </div>
            {loading && <Loader />}
            {!loading && !currentGames.length && <VideogameNotFound />}
            {!loading && !!currentGames.length &&
                <div className='cards'>
                    {
                        currentGames.map(vg =>
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
            }
            <br></br>
        </div>
    )
}

export default Home