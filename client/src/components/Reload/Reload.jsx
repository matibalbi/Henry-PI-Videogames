import {useDispatch, useSelector} from "react-redux"
import {setLoadingGenres, setLoadingVideogames, setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating} from "../../redux/actions";
import './Reload.css'

const Reload = () => {

  const sortName = useSelector(state => state.sortName)
  const sortRating = useSelector(state => state.sortRating)
  const filterGenre = useSelector(state => state.filterGenre)
  const filterType = useSelector(state => state.filterType)
  const currentPage = useSelector(state => state.currentPage)
  const search = useSelector(state => state.search)

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLoadingVideogames(true))
    dispatch(setLoadingGenres(true))
    if (sortName !== "") dispatch(setSortName(""))
    if (sortRating !== "") dispatch(setSortRating(""))
    if (filterGenre !== "all") dispatch(setFilterGenre("all"))
    if (filterType !== "all") dispatch(setFilterType("all"))
    if (currentPage !== "1") dispatch(setCurrentPage(1))
  }

  return (
    <button type="button" className='reload' disabled={search} onClick={handleClick}>Reload videogames</button>
  );
}

export default Reload;