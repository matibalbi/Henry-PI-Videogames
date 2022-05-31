import {useDispatch} from "react-redux"
import {setCurrentPage} from '../../redux/actions';
import './Pagination.css';

const Pagination = ({gamesPerPage, totalGames}) => {

    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    const dispatch = useDispatch()
    
    const handleClick = number => {
        dispatch(setCurrentPage(number))
    }

    return (
        <div className='containerPag'>
            {
                pageNumbers.map(number =>
                    <button key={number} className='numbers' onClick={() => handleClick(number)}>
                        {number}
                    </button>
                )
            }
        </div>
    )
}

export default Pagination