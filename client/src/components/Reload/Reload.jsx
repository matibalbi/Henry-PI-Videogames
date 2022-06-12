import {useDispatch, useSelector} from "react-redux"
import {setLoadingGenres, setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating, getGenres, setLoadingVideogamesDB, setLoadingVideogamesAPI, getVideogamesFromDB, getVideogamesFromAPI} from "../../redux/actions";
import './Reload.css'

const Reload = () => {

  const sortName = useSelector(state => state.sortName)
  const sortRating = useSelector(state => state.sortRating)
  const filterGenre = useSelector(state => state.filterGenre)
  const filterType = useSelector(state => state.filterType)
  const currentPage = useSelector(state => state.currentPage)

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLoadingVideogamesAPI(true))
    dispatch(setLoadingVideogamesDB(true))
    dispatch(setLoadingGenres(true))
    dispatch(getVideogamesFromAPI())
    dispatch(getVideogamesFromDB())
    dispatch(getGenres())
    if (sortName !== "") dispatch(setSortName(""))
    if (sortRating !== "") dispatch(setSortRating(""))
    if (filterGenre !== "") dispatch(setFilterGenre(""))
    if (filterType !== "") dispatch(setFilterType(""))
    if (currentPage !== 1) dispatch(setCurrentPage(1))
  }

  return (
    <button type="button" className='reloadActive' onClick={handleClick}>Reload video games</button>
  );
}

export default Reload;