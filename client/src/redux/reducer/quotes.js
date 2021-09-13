
import {FETCH_QUOTES , CREATE_QUOTES} from '../actiontypes/quotes'


const initialState = []
const reducer =  (state = initialState , action) => {


    switch (action.type) {
        case FETCH_QUOTES:
            return action.payload
        case CREATE_QUOTES:
            return [...state , action.payload]
        default:
            return state
    }
}

export default reducer