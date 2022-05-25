import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL } from "./actions"

const initialState = {
    videogames: [],
    videogameDetail: {},

}

function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: payload
            };
        default:
            return state
    }
}

export default reducer