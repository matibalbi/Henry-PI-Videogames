import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getGenres, setCurrentPage, setFilterGenre, setFilterType, setSort} from "../../redux/actions";
import './Filters.css';

const Filters = () => {
    
    let genres = useSelector(state => state.genres)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])
        
    const handleSortChange = e => {
        dispatch(setSort(e.target.value))
        if (e.target.id === "alpha") document.getElementById('rating').value = ""
        else document.getElementById('alpha').value = ""
    }

    const handleFilterGenreChange = e => {
        dispatch(setFilterGenre(e.target.value))
        dispatch(setCurrentPage(1))
    }

    const handleFilterTypeChange = e => {
        dispatch(setFilterType(e.target.value))
        dispatch(setCurrentPage(1))
    }

    return (
        <div className='containerFil'>
            <div className='filters'>
                <label>Order:</label>
                <select id="alpha" defaultValue="" onChange={handleSortChange}>
                    <option value="" disabled hidden>None</option>
                    <option value="nameAZ">A-Z</option>
                    <option value="nameZA">Z-A</option>
                </select>
            </div>
            <div className='filters'>
                <label>Rating:</label>
                <select id="rating" defaultValue="" onChange={handleSortChange}>
                    <option value="" disabled hidden>None</option>
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