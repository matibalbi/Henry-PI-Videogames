const initialState = {
    videogames: []
}

function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case "GET_VIDEOGAMES": //ponerlo en una constante
            return {
                ...state,
                videogames: payload
            }
        default: return state
    }
}

export default reducer