import {useDispatch, useSelector} from "react-redux"
import {setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating} from "../../redux/actions";
import './Reset.css'

const Reset = () => {

  const sortName = useSelector(state => state.sortName)
  const sortRating = useSelector(state => state.sortRating)
  const filterGenre = useSelector(state => state.filterGenre)
  const filterType = useSelector(state => state.filterType)
  const currentPage = useSelector(state => state.currentPage)
  const loadingVideogames = useSelector(state => state.loadingVideogames)
  const loadingGenres = useSelector(state => state.loadingGenres)
  const loadingSearch = useSelector(state => state.loadingSearch)

  const loading = loadingVideogames || loadingGenres || loadingSearch

  const dispatch = useDispatch()

  const handleClick = () => {
    if (sortName !== "") dispatch(setSortName(""))
    if (sortRating !== "") dispatch(setSortRating(""))
    if (filterGenre !== "") dispatch(setFilterGenre(""))
    if (filterType !== "") dispatch(setFilterType(""))
    if (currentPage !== 1) dispatch(setCurrentPage(1))
  }

  return (
    <button type="button" className={loading ? 'resetDisabled' : 'resetActive'} disabled={loading} onClick={handleClick}>Reset filters</button>
  );
}

export default Reset;