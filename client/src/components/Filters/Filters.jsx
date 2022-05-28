import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getGenres, setFilterGenre, setFilterType, setSort} from "../../redux/actions";
import {sortNameAZ} from "../../controllers/controllers";
import './Filters.css';

function Filters() {
    
    const genres = useSelector(state => state.genres)

    genres.sort(sortNameAZ)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    function handleSortChange(e) {
        dispatch(setSort(e.target.value))
    }

    function handleFilterGenreChange(e) {
        dispatch(setFilterGenre(e.target.value))
    }

    function handleFilterTypeChange(e) {
        dispatch(setFilterType(e.target.value))
    }

    return (
        <div className='containerFil'>
            <div className='filters'>
                <label>Order:</label>
                <select defaultValue="" onChange={handleSortChange}>
                    <option value="" disabled>None</option>
                    <option value="nameAZ">A-Z</option>
                    <option value="nameZA">Z-A</option>
                </select>
            </div>
            <div className='filters'>
                <label>Rating:</label>
                <select defaultValue="" onChange={handleSortChange}>
                    <option value="" disabled>None</option>
                    <option value="ratingBW">Best to worst</option>
                    <option value="ratingWB">Worst to best</option>
                </select>
            </div>
            <div className='filters'>
                <label>Genres:</label>
                <select defaultValue="all" onChange={handleFilterGenreChange}>
                    <option value="all">All</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className='filters'>
                <label>Type:</label>
                <select defaultValue="all" onChange={handleFilterTypeChange}>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="existing">Existing</option>
                </select>
            </div>
        </div>
    )
}

export default Filters