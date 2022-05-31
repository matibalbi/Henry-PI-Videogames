import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getVideogameDetail } from "../../redux/actions"
import DefaultImage from '../../img/controller.png'
import './VideogameDetail.css'
import Loader from "../Loader/Loader"

const VideogameDetail = (props) => {

    const videogameDetail = useSelector(state => state.videogameDetail)

    const id = props.match.params.id
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogameDetail(id))
    }, [dispatch, id])
    
    if (!videogameDetail.image) videogameDetail.image = DefaultImage

    if (videogameDetail.id?.toString() !== id) return <Loader/>

    return (
        <div>
            <h3>{videogameDetail?.name}</h3>
            <img src={videogameDetail?.image} alt={videogameDetail?.name} />
            <h5>Genres: {videogameDetail.genres?.join(", ")}</h5>
            <h5>Description: {videogameDetail?.description}</h5>
            <h5>Released: {videogameDetail?.released}</h5>
            <h5>Rating: {videogameDetail?.rating}</h5>
            <h5>Platforms: {videogameDetail.platforms?.join(", ")}</h5>
        </div>
    )
}

export default VideogameDetail;