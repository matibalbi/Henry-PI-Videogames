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
    
    const modifyDescription = () => {
        return {__html: videogameDetail?.description};
      }

    return (
        <div className='backgroundDetail'>
            <br></br>
            <NavBar />
            {loadingDetail && <div><br></br><br></br><br></br><Loader /></div>}
            {!loadingDetail &&
            <div className='containerDetail'>
                <div className='containerDetailTitle'>
                    <h3 className='titleDetail'>{videogameDetail?.name}</h3>
                </div>
                <div className='containerDetailBody'>
                    <div>
                        <img src={videogameDetail.image || DefaultImage} alt={videogameDetail?.name} className='imgDetail'/>
                    </div>
                    <div className='containerDetailInfo'>
                        <div className="ratingDetail fontBodyDetail">
                            <span>Rating <span className="arrowRating">&#129146;</span><span className="fontWeightDetail"> {videogameDetail?.rating}</span></span>
                            <span className="star">&#11088;</span>
                        </div>
                        <div className='releasedDetail fontBodyDetail'>
                            <span>Released <span className="arrowRating">&#129146;</span><span className="fontWeightDetail"> {videogameDetail?.released}</span></span>
                        </div>
                        <div className="genresDetail fontBodyDetail">
                            <span>Genres </span>
                            <span className="arrowGenre">&#129146; </span>
                            {
                                videogameDetail.genres?.map((genre, i) => {
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