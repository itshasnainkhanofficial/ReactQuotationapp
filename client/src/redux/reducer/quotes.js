
import {FETCH_QUOTES , CREATE_QUOTES, UPDATE_QUOTES, DELETE_QUOTES} from '../actiontypes/quotes'


const initialState = []
const reducer =  (states = initialState , action) => {


    switch (action.type) {

        case FETCH_QUOTES:
            return action.payload

        case CREATE_QUOTES:
            return [...states , action.payload]

        case DELETE_QUOTES:
            return states.filter( (state) => state._id !== action.payload )

        case UPDATE_QUOTES:
            return states.map( state => state._id === action.payload._id ? action.payload : state)

        default:
            return states
    }
}

export default reducer