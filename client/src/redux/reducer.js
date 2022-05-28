import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, SET_CURRENT_PAGE, SET_FILTER_GENRE, SET_FILTER_TYPE, SET_SORT } from "./actions"

const initialState = {
    videogames: [],
    videogameDetail: {},
    currentPage: 1,
    sort: "",
    genres: [],
    filterGenre: "all",
    filterType: "all"
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
        case SET_SORT:
            return {
                ...state,
                sort: payload
            }
        case GET_GENRES:
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
        default:
            return state
    }
}

export default reducer