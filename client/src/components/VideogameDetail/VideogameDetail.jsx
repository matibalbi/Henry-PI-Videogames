import axios from 'axios';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getVideogameDetail, setLoadingDetail, getGenres, getVideogames, setLoadingGenres, setLoadingVideogames, setVideogameUpdate, resetDetail } from "../../redux/actions"
import DefaultImage from '../../img/controller.jpg'
import './VideogameDetail.css'
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar";
import IdNotFound from "../IdNotFound/IdNotFound"

const VideogameDetail = (props) => {

    const videogameDetail = useSelector(state => state.videogameDetail)
    const loadingDetail = useSelector(state => state.loadingDetail)

    const [redirect, setRedirect] = useState(false);
        
    const id = props.match.params.id

    const idFromDB = id.length === 36
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => {
            dispatch(resetDetail())
            dispatch(setLoadingDetail(true))
        }
    }, [dispatch, id])

    const handleClickUpdate = () => {
        dispatch(setVideogameUpdate(videogameDetail))
    }

    const handleClickDelete = () => {
        axios.delete(`http://localhost:3001/videogame/${id}/delete`)
        .then(res => {
         if (res.status === 201) {
            dispatch(setLoadingVideogames(true))
            dispatch(setLoadingGenres(true))
            dispatch(getVideogames())
            dispatch(getGenres())
            alert('Videogame deleted successfully')
            setRedirect(true)
         }
      })
      .catch(error => alert(error.message))
    }

    if (videogameDetail.error) return <IdNotFound id={id} />
    
    const modifyDescription = () => {
        return {__html: videogameDetail?.description};
      }

    if (redirect) return <Redirect to='/home' />
      
    return (
        <div className='backgroundDetail'>
            <br></br>
            <NavBar />
            {idFromDB &&
                <div className='containerButtonsDetail'>
                    <div className='boxButtonsDetail'>
                        <Link to={`/videogame/${id}/update`}>
                            <button type="button" className='buttonDetail updateButton' onClick={handleClickUpdate}>Update</button>
                        </Link>
                        <button type="button" className='buttonDetail deleteButton' onClick={handleClickDelete}>Delete</button>
                    </div>
                </div>
            }
            {loadingDetail && <div><br></br><br></br><br></br><Loader /></div>}
            {!loadingDetail &&
            <div className='containerDetail'>
                <div className='containerDetailTitle'>
                    <h3 className='titleDetail'>{videogameDetail?.name}</h3>
                </div>
                <div className='containerDetailBody'>
                    <div>
                        <img src={videogameDetail?.image || DefaultImage} alt={videogameDetail?.name} className={'imgDetail' + (idFromDB ? ' imgDetailDB' : ' imgDetailApi')}/>
                    </div>
                    <div className='containerDetailInfo'>
                        <div className="ratingDetail fontBodyDetail">
                            <span>Rating </span>
                            <span className="arrowRating">&#129146;</span>
                            {!!videogameDetail.rating && <span><span className="fontWeightDetail"> {videogameDetail.rating}</span><span className="star">&#11088;</span></span>}
                            {!videogameDetail.rating && <span className="orangeDetail"> (not rated)</span>}
                        </div>
                        <div className='releasedDetail fontBodyDetail'>
                            <span>Released </span>
                            <span className="arrowRating">&#129146;</span>
                            {!!videogameDetail.released && <span><span className="fontWeightDetail"> {videogameDetail.released}</span></span>}
                            {!videogameDetail.released && <span className="orangeDetail"> (no release date assigned)</span>}
                        </div>
                        <div className="genresDetail fontBodyDetail">
                            <span>Genres </span>
                            <span className="arrowGenre">&#129146; </span>
                            {!!videogameDetail.genres && 
                                videogameDetail.genres.map((genre, i) => {
                                    if (i === 0) {
                                        return <span key={i} className="fontWeightDetail">{genre}</span>
                                    }
                                    return (
                                        <span key={i}>
                                            <span className="arrowRating"> | </span>
                                            <span className="fontWeightDetail">{genre}</span>
                                        </span>
                                    )
                                })
                            }
                            {!videogameDetail.genres.length && <span className="orangeDetail">(no genres assigned)</span>}
                        </div>
                        <div className="pltaformsDetail fontBodyDetail">
                            <span>Platforms </span>
                            <span className="arrowGenre">&#129146; </span>
                            {
                                videogameDetail.platforms?.map((platform, i) => {
                                    if (i === 0) {
                                        return <span key={i} className="fontWeightDetail">{platform}</span>
                                    }
                                    return (
                                        <span key={i}>
                                            <span className="arrowRating"> | </span>
                                            <span className="fontWeightDetail">{platform}</span>
                                        </span>
                                    )
                                })
                            }
                        </div>
                        <div className='fontBodyDetail'>
                            <span>Description <span className="arrowRating">&#129147;</span></span>
                        </div>
                        <div dangerouslySetInnerHTML={modifyDescription()} className='descriptionDetail fontBodyDetail'/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default VideogameDetail;