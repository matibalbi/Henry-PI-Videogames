import {useDispatch, useSelector} from "react-redux"
import {setCurrentPage, setFilterGenre, setFilterType, setSortName, setSortRating} from "../../redux/actions";
import './Filters.css';

const Filters = () => {
    
    const genres = useSelector(state => state.genres)
    const sortName = useSelector(state => state.sortName)
    const sortRating = useSelector(state => state.sortRating)
    const filterGenre = useSelector(state => state.filterGenre)
    const filterType = useSelector(state => state.filterType)
    const currentPage = useSelector(state => state.currentPage)

    const dispatch = useDispatch()
            
    const handleSortNameChange = e => {
        dispatch(setSortName(e.target.value))
        if (sortRating !== "") dispatch(setSortRating(""))
    }

    const handleSortRatingChange = e => {
        dispatch(setSortRating(e.target.value))
        if (sortName !== "") dispatch(setSortName(""))
    }

    const handleFilterGenreChange = e => {
        dispatch(setFilterGenre(e.target.value))
        if (currentPage !== 1) dispatch(setCurrentPage(1))
    }

    const handleFilterTypeChange = e => {
        dispatch(setFilterType(e.target.value))
        if (currentPage !== 1) dispatch(setCurrentPage(1))
    }

    return (
        <div className='containerFil'>
            <div className='filters'>
                <select value={sortName} onChange={handleSortNameChange}>
                    <option value="" disabled>Name</option>
                    <option value="nameAZ">A-Z</option>
                    <option value="nameZA">Z-A</option>
                </select>
            </div>
            <div className='filters'>
                <select value={sortRating} onChange={handleSortRatingChange}>
                    <option value="" disabled>Rating</option>
                    <option value="ratingBW">Best to worst</option>
                    <option value="ratingWB">Worst to best</option>
                </select>
            </div>
            <div className='filters'>
                <select value={filterGenre} onChange={handleFilterGenreChange}>
                    <option value="" disabled>Genre</option>
                    <option value="all">All</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className='filters'>
                <select value={filterType} onChange={handleFilterTypeChange}>
                    <option value="" disabled>Type</option>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="existing">Existing</option>
                </select>
            </div>
        </div>
    )
}

export default Filters