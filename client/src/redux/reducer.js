import {GET_GENRES, GET_VIDEOGAME_DETAIL, SET_CURRENT_PAGE, SET_FILTER_GENRE, SET_FILTER_TYPE, SET_SORT_NAME, SET_SORT_RATING, SET_LOADING_GENRES, SET_INPUT_SEARCH, SET_LOADING_DETAIL, SET_VIDEOGAME_UPDATE, RESET_DETAIL, RESET_UPDATE, GET_VIDEOGAMES_FROM_DB, GET_VIDEOGAMES_SEARCH_FROM_DB, GET_VIDEOGAMES_FROM_API, GET_VIDEOGAMES_SEARCH_FROM_API, SET_LOADING_VIDEOGAMES_DB, SET_LOADING_VIDEOGAMES_API, SET_LOADING_SEARCH_DB, SET_LOADING_SEARCH_API, SET_SEARCH_DB, SET_SEARCH_API} from "./actions"
import {sortNameAZ} from "../controllers/controllers";

const initialState = {
    videogamesDB: [],
    videogamesAPI: [],
    videogamesSearchDB: [],
    videogamesSearchAPI: [],
    videogameDetail: {},
    genres: [],
    videogameUpdate: {},
    searchDB: false,
    searchAPI: false,
    inputSearch: "",
    sortName: "",
    sortRating: "",
    filterGenre: "",
    filterType: "",
    currentPage: 1,
    loadingVideogamesDB: true,
    loadingVideogamesAPI: true,
    loadingGenres: true,
    loadingDetail: true,
    loadingSearchDB: false,
    loadingSearchAPI: false,
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES_FROM_DB:
            return {
                ...state,
                videogamesDB: payload,
                loadingVideogamesDB: false
            }
        case GET_VIDEOGAMES_FROM_API:
            return {
                ...state,
                videogamesAPI: payload,
                loadingVideogamesAPI: false
            }
        case GET_VIDEOGAMES_SEARCH_FROM_DB:
            return {
                ...state,
                videogamesSearchDB: payload,
                searchDB: true,
                loadingSearchDB: false
            }
        case GET_VIDEOGAMES_SEARCH_FROM_API:
            return {
                ...state,
                videogamesSearchAPI: payload,
                searchAPI: true,
                loadingSearchAPI: false
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: payload,
                loadingDetail: false
            }
        case GET_GENRES:
            payload.sort(sortNameAZ)
            return {
                ...state,
                genres: payload,
                loadingGenres: false
            }
        case SET_VIDEOGAME_UPDATE:
            return {
                ...state,
                videogameUpdate: payload
            }
        case SET_SEARCH_DB:
            return {
                ...state,
                searchDB: payload
            }
        case SET_SEARCH_API:
            return {
                ...state,
                searchAPI: payload
            }
        case SET_INPUT_SEARCH:
            return {
                ...state,
                inputSearch: payload
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            }
        case SET_LOADING_VIDEOGAMES_DB:
            return {
                ...state,
                loadingVideogamesDB: payload,
            }
        case SET_LOADING_VIDEOGAMES_API:
            return {
                ...state,
                loadingVideogamesAPI: payload,
            }
        case SET_LOADING_GENRES:
            return {
                ...state,
                loadingGenres: payload
            }
        case SET_LOADING_SEARCH_DB:
            return {
                ...state,
                loadingSearchDB: payload
            }
        case SET_LOADING_SEARCH_API:
            return {
                ...state,
                loadingSearchAPI: payload
            }
        case SET_LOADING_DETAIL:
            return {
                ...state,
                loadingDetail: payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                videogameDetail: payload
            }
        case RESET_UPDATE:
            return {
                ...state,
                videogameUpdate: payload
            }
        default:
            return state
    }
}

export default reducer