import {GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAMES_SEARCH, SET_CURRENT_PAGE, SET_FILTER_GENRE, SET_FILTER_TYPE, SET_SORT_NAME, SET_SORT_RATING, SET_LOADING_VIDEOGAMES, SET_LOADING_GENRES, SET_SEARCH} from "./actions"
import {sortNameAZ} from "../controllers/controllers";

const initialState = {
    videogames: [],
    videogamesSearch: [],
    videogameDetail: {},
    currentPage: 1,
    sortName: "",
    sortRating: "",
    genres: [],
    filterGenre: "all",
    filterType: "all",
    loadingVideogames: true,
    loadingGenres: true,
    search: false
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                loadingVideogames: false
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
        case SET_SORT_NAME:
            return {
                ...state,
                sortName: payload
            }
        case SET_SORT_RATING:
            return {
                ...state,
                sortRating: payload
            }
        case GET_GENRES:
            payload.sort(sortNameAZ)
            return {
                ...state,
                genres: payload,
                loadingGenres: false
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
                videogamesSearch: payload,
                loadingVideogames: false
            }
        case SET_LOADING_VIDEOGAMES:
            return {
                ...state,
                loadingVideogames: payload,
            }
        case SET_LOADING_GENRES:
            return {
                ...state,
                loadingGenres: payload
            }
        case SET_SEARCH:
            return {
                ...state,
                search: payload
            }
        default:
            return state
    }
}

export default reducer