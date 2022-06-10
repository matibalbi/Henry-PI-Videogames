import {useDispatch, useSelector} from "react-redux"
import {sortNameAZ, sortNameZA, sortRatingBW, sortRatingWB} from "../../controllers/controllers";
import {getGenres, getVideogames} from "../../redux/actions"
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
    const videogamesAll = useSelector(state => state.videogames)
    const videogamesSearch = useSelector(state => state.videogamesSearch)
    const genres = useSelector(state => state.genres)
    const search = useSelector(state => state.search)
    const currentPage = useSelector(state => state.currentPage)
    const sortName = useSelector(state => state.sortName)
    const sortRating = useSelector(state => state.sortRating)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)
    const loadingVideogames = useSelector(state => state.loadingVideogames)
    const loadingGenres = useSelector(state => state.loadingGenres)
    const loadingSearch = useSelector(state => state.loadingSearch)

    const dispatch = useDispatch()

    let videogames = search ? videogamesSearch.slice() : videogamesAll.slice()

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

    if (!videogamesAll.length && !genres.length) {
        dispatch(getVideogames())
        dispatch(getGenres())
    }

    // Define loading
    const loading = loadingVideogames || loadingGenres || loadingSearch

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
                    {search && <BackToAllGames/>}
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