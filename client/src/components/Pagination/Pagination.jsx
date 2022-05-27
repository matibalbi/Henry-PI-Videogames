import {useDispatch} from "react-redux"
import {setCurrentPage} from '../../redux/actions';
import './Pagination.css';

function Pagination({gamesPerPage, totalGames, paginate}) {

    const dispatch = useDispatch()

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='containerPag'>
            {
                pageNumbers.map(number =>
                    <button key={number} className='numbers' onClick={() => dispatch(setCurrentPage(number))}>
                        {number}
                    </button>
                )
            }
        </div>
    )
}

export default Pagination