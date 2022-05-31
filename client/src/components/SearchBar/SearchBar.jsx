import {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {getVideogamesSearch, setLoadingVideogames, setSearch, setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating} from "../../redux/actions";
import './SearchBar.css'

const SearchBar = () => {

  const sortName = useSelector(state => state.sortName)
  const sortRating = useSelector(state => state.sortRating)
  const filterGenre = useSelector(state => state.filterGenre)
  const filterType = useSelector(state => state.filterType)
  const currentPage = useSelector(state => state.currentPage)
  const search = useSelector(state => state.search)

  const [videogame, setVideogame] = useState("");

  const dispatch = useDispatch()

  const handleInputChange = e => {
    setVideogame(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (videogame) {
      dispatch(getVideogamesSearch(videogame))
      dispatch(setLoadingVideogames(true))
      if (!search) dispatch(setSearch(true))
      if (sortName !== "") dispatch(setSortName(""))
      if (sortRating !== "") dispatch(setSortRating(""))
      if (filterGenre !== "all") dispatch(setFilterGenre("all"))
      if (filterType !== "all") dispatch(setFilterType("all"))
      if (currentPage !== "1") dispatch(setCurrentPage(1))
      setVideogame("")
    }
  }

  return (
    <form className='containerForm' onSubmit={handleSubmit}>
      <input
        placeholder="Search videogame..."
        value={videogame}
        onChange={handleInputChange}
        className='search'
      />
      <button type="submit" className='search'>Search</button>
    </form>
  );
}

export default SearchBar;