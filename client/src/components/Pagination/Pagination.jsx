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
        <ul className='containerPag'>
            {pageNumbers.length > 1 && <li className='numbers prev' onClick={handleClickPrevious}><span className='centerArrow'>{"<"}</span></li>}
            {
                pageNumbers.map(number =>
                    <li key={number} className={'numbers' + (currentPage === number ? ' active' : '')} onClick={() => handleClickPage(number)}>
                        <span className='centerNumber'>{number}</span>
                    </li>
                )
            }
            {pageNumbers.length > 1 && <li className='numbers next' onClick={handleClickNext}><span className='centerArrow'>{">"}</span></li>}
        </ul>
    )
}

export default Pagination