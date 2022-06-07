import {useDispatch, useSelector} from "react-redux"
import {getVideogamesSearch, setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating, setLoadingSearch, setInputSearch, setValueSearched} from "../../redux/actions";
import './SearchBar.css'

const SearchBar = () => {

  const sortName = useSelector(state => state.sortName)
  const sortRating = useSelector(state => state.sortRating)
  const filterGenre = useSelector(state => state.filterGenre)
  const filterType = useSelector(state => state.filterType)
  const currentPage = useSelector(state => state.currentPage)
  const inputSearch = useSelector(state => state.inputSearch)

  const dispatch = useDispatch()

  const handleInputChange = e => {
    dispatch(setInputSearch(e.target.value))
  }

  const handleEraseInput = () => {
    dispatch(setInputSearch(""))
    document.getElementById('inputSearch').focus()
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch) {
      dispatch(getVideogamesSearch(inputSearch))
      dispatch(setValueSearched(inputSearch))
      dispatch(setLoadingSearch(true))
      if (sortName !== "") dispatch(setSortName(""))
      if (sortRating !== "") dispatch(setSortRating(""))
      if (filterGenre !== "") dispatch(setFilterGenre(""))
      if (filterType !== "") dispatch(setFilterType(""))
      if (currentPage !== 1) dispatch(setCurrentPage(1))
    }
  }

  return (
    <form className='containerFormSearch' onSubmit={handleSubmit}>
      <div className='containerInputSearch'>
        <input
          id="inputSearch"
          placeholder="Search video game..."
          value={inputSearch}
          onChange={handleInputChange}
          className='inputSearch'
          autoComplete="off"
        />
        <button type="button" disabled={!inputSearch} className={'eraseinputSearch' + (inputSearch ? '' : ' eraseDisable')} onClick={handleEraseInput}>X</button>
      </div>
      <button type="submit" className='search'>Search</button>
    </form>
  );
}
export default SearchBar;