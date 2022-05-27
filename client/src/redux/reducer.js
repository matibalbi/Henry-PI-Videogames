import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, SET_CURRENT_PAGE } from "./actions"

const initialState = {
    videogames: [],
    videogameDetail: {},
    currentPage: 1
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            }
        default:
            return state
    }
}

export default reducer