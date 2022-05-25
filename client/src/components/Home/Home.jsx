import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getVideogames} from "../../redux/actions"
import VideogameCard from "../VideogameCard/VideogameCard"

function Home() {

    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames)

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    return (
        <div>
            {
                videogames?.map(vg =>
                    <VideogameCard 
                      key={vg.id}
                      id={vg.id}
                      name={vg.name}
                      image={vg.image}
                      genres={vg.genres}
                    />
                )
            }
        </div>
    )
}

export default Home