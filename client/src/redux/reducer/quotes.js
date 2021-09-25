
import * as ActionConstants from '../actiontypes/quotes'


const initialState = {
    isLoading : true,
    quotes: []
}
const reducer =  (state = initialState , action) => {
    
    switch (action.type) {

        case ActionConstants.START_LOADING:
            return {...state, isLoading: true}
        case ActionConstants.END_LOADING:
            return {...state, isLoading: false}

        case ActionConstants.FETCH_QUOTES:
            return {...state , quotes : action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages}
        case ActionConstants.FETCH_QUOTE:
            return {...state , quote : action.payload}
        case ActionConstants.FETCH_QUOTES_BY_SEARCH:
            return {...state, quotes: action.payload}
            
        case ActionConstants.CREATE_QUOTES:
            return {...state, quotes: [...state.quotes , action.payload]}

        case ActionConstants.DELETE_QUOTES:
            return {...state , quotes : state.quotes.filter( (state) => state._id !== action.payload )}

        case ActionConstants.UPDATE_QUOTES:
            return {...state, quotes : state.quotes.map( state => state._id === action.payload._id ? action.payload : state)}
        case ActionConstants.COMMENT_QUOTE:
            return {
                ...state,
                quotes : state.quotes.map( quote => {
                    if(quote._id === action.payload._id){
                        return action.payload
                    }
                    return quote
                })
            }
        default:
            return state
    }
}

export default reducer