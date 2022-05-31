import {GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAMES_SEARCH, SET_CURRENT_PAGE, SET_FILTER_GENRE, SET_FILTER_TYPE, SET_SORT} from "./actions"
import {sortNameAZ} from "../controllers/controllers";

const initialState = {
    videogames: [],
    videogameDetail: {},
    currentPage: 1,
    sort: "",
    genres: [],
    filterGenre: "all",
    filterType: "all"
}

const reducer = (state = initialState, {type, payload}) => {
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
        case SET_SORT:
            return {
                ...state,
                sort: payload
            }
        case GET_GENRES:
            payload.sort(sortNameAZ)
            return {
                ...state,
                genres: payload
            }
        case SET_FILTER_GENRE:
            return {
                ...state,
                filterGenre: payload
            }
        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: payload
            }
        case GET_VIDEOGAMES_SEARCH:
            return {
                ...state,
                videogames: payload
            }
        default:
            return state
    }
}

export default reducer