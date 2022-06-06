import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getVideogameDetail, resetDetail, setLoadingDetail } from "../../redux/actions"
import DefaultImage from '../../img/control.png'
import './VideogameDetail.css'
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar";
import IdNotFound from "../IdNotFound/IdNotFound"

const VideogameDetail = (props) => {

    const videogameDetail = useSelector(state => state.videogameDetail)
    const loadingDetail = useSelector(state => state.loadingDetail)

    const id = props.match.params.id
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => {
            dispatch(resetDetail())
            dispatch(setLoadingDetail(true))
        }
    }, [dispatch, id])

    if (videogameDetail.error) return <IdNotFound id={id} />
    
    return (
        <div className='containerDetail'>
            <br></br>
            <NavBar />
            {loadingDetail && <div><br></br><br></br><br></br><Loader /></div>}
            {!loadingDetail &&
            <div>
                <h3>{videogameDetail?.name}</h3>
                <img src={videogameDetail.image || DefaultImage} alt={videogameDetail?.name} className='imgDetail'/>
                <h5>Genres: {videogameDetail.genres?.join(", ")}</h5>
                <h5>Description: {videogameDetail?.description}</h5>
                <h5>Released: {videogameDetail?.released}</h5>
                <h5>Rating: {videogameDetail?.rating}</h5>
                <h5>Platforms: {videogameDetail.platforms?.join(", ")}</h5>
            </div>
            }
        </div>
    )
}

export default VideogameDetail;