import {GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAMES_SEARCH, SET_CURRENT_PAGE, SET_FILTER_GENRE, SET_FILTER_TYPE, SET_SORT_NAME, SET_SORT_RATING, SET_LOADING_VIDEOGAMES, SET_LOADING_GENRES, SET_SEARCH, SET_LOADING_SEARCH, SET_INPUT_SEARCH, SET_LOADING_DETAIL, SET_VIDEOGAME_UPDATE, RESET_DETAIL, RESET_UPDATE, GET_VIDEOGAMES_FROM_DB, GET_VIDEOGAMES_SEARCH_FROM_DB, GET_VIDEOGAMES_FROM_API, GET_VIDEOGAMES_SEARCH_FROM_API} from "./actions"
import {sortNameAZ} from "../controllers/controllers";

const initialState = {
    videogames: [],
    videogamesSearch: [],
    videogameDetail: {},
    genres: [],
    videogameUpdate: {},
    search: false,
    inputSearch: "",
    sortName: "",
    sortRating: "",
    filterGenre: "",
    filterType: "",
    currentPage: 1,
    loadingVideogames: true,
    loadingGenres: true,
    loadingSearch: false,
    loadingDetail: true,

    videogamesDB: [],
    videogamesAPI: [],
    searchDB: false,
    searchAPI: false,
    loadingVideogamesDB: true,
    loadingVideogamesAPI: true,
    loadingSearchDB: false,
    loadingSearchAPI: false,
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                loadingVideogames: false
            }
        case GET_VIDEOGAMES_SEARCH:
            return {
                ...state,
                videogamesSearch: payload,
                search: true,
                loadingSearch: false
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
        case SET_SEARCH:
            return {
                ...state,
                search: payload
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
        case SET_LOADING_SEARCH:
            return {
                ...state,
                loadingSearch: payload
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

        case GET_VIDEOGAMES_FROM_DB:
            return {
                ...state,
                videogamesDB: payload,
                videogames: [...payload,...state.videogamesAPI],
                loadingVideogamesDB: false
            }
        case GET_VIDEOGAMES_FROM_API:
            return {
                ...state,
                videogamesAPI: payload,
                videogames: [...state.videogamesDB,...payload],
                loadingVideogamesAPI: false
            }
        case GET_VIDEOGAMES_SEARCH_FROM_DB:
            return {
                ...state,
                videogamesSearch: payload,
                searchDB: true,
                loadingSearchDB: false
            }
        case GET_VIDEOGAMES_SEARCH_FROM_API:
            return {
                ...state,
                videogamesSearch: payload,
                searchAPI: true,
                loadingSearchAPI: false
            }
        default:
            return state
    }
}

export default reducer