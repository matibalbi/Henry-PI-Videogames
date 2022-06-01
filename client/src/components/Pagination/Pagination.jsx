import {useDispatch, useSelector} from "react-redux"
import {setCurrentPage} from '../../redux/actions';
import './Pagination.css';

const Pagination = ({gamesPerPage, totalGames}) => {

    const currentPage = useSelector(state => state.currentPage)

    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    const dispatch = useDispatch()
    
    const handleClickPage = number => {
        if (currentPage !== number) dispatch(setCurrentPage(number))
    }

    const handleClickPrevious = () => {
        if (currentPage !== 1) dispatch(setCurrentPage(currentPage - 1))
    }

    const handleClickNext = () => {
        if (currentPage !== pageNumbers.length) dispatch(setCurrentPage(currentPage + 1))
    }

    return (
        <div className='containerPag'>
            {pageNumbers.length > 1 && <button className='numbers' onClick={handleClickPrevious}>Previous</button>}
            {
                pageNumbers.map(number =>
                    <button key={number} className='numbers' onClick={() => handleClickPage(number)}>
                        {number}
                    </button>
                )
            }
            {pageNumbers.length > 1 && <button className='numbers' onClick={handleClickNext}>Next</button>}
        </div>
    )
}

export default Pagination