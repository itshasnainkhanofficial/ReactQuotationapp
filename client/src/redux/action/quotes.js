import * as api from '../../api'
import * as ActionConstants from '../actiontypes/quotes'



const fetchQuotesAction = (data, currentPage, numberOfPages) => {
    return {
        type : ActionConstants.FETCH_QUOTES,
        payload: { data, currentPage, numberOfPages }
    }
}
const fetchQuoteAction = (data) => {
    return {
        type : ActionConstants.FETCH_QUOTE,
        payload: { quote : data }
    }
}
const fetchQuotesBySearchAction = (quotes) => {
    return {
        type : ActionConstants.FETCH_QUOTES_BY_SEARCH,
        payload : quotes
    }
}
const createQuotesAction = (data) => {
    return {
        type : ActionConstants.CREATE_QUOTES,
        payload : data
    }
}
const updateQuoteAction = (quotes) => {
    return {
        type : ActionConstants.UPDATE_QUOTES,
        payload : quotes
    }
}
const deleteQuoteAction = (quotes) => {
    return {
        type : ActionConstants.DELETE_QUOTES,
        payload : quotes
    }
}

const loadingStartAction = () => {
    return { type: ActionConstants.START_LOADING}
}
const loadingEndAction = () => {
    return { type: ActionConstants.END_LOADING}
}

const commentQuote = (quote) => {
    return {
        type : ActionConstants.COMMENT_QUOTE,
        payload: { quote}
    }
} 

// action creaters

// Getting all quotes
export const getQuotes = (page) => async (dispatch ) => {
    try {
        dispatch(loadingStartAction())
        const {data : { data, currentPage, numberOfPages }}  = await api.fetchAllQuotes(page)
        dispatch(fetchQuotesAction(data , currentPage, numberOfPages))
        dispatch(loadingEndAction())
    } catch (error) {
        console.log("error" , error.message)
    }
    
}
// Getting single quote
export const getSingleQuote = (id) => async (dispatch ) => {
    try {
        dispatch(loadingStartAction())
        const {data }  = await api.fetchSingleQuote(id)
        dispatch(fetchQuoteAction(data))
        dispatch(loadingEndAction())
    } catch (error) {
        console.log("error" , error.message)
    }
    
}
// get Quotes by search
export const getQuotesBySearch = (searchQuery) => async (dispatch ) => {
    try {
        dispatch(loadingStartAction())
        const {data : {data}} = await api.fetchAllQuotesBySearch(searchQuery) 
        dispatch(fetchQuotesBySearchAction(data))
        dispatch(loadingEndAction())
    } catch (error) {
        console.log("error in search quote" , error.message)
    }
    
}



// Adding new Quote
export const createQuotes = (quote, history) => async (dispatch) => {
    
    try {
        dispatch(loadingStartAction())
        const response = await api.createNewQuote(quote) 
        const data = response.data

        
        dispatch(createQuotesAction(data))
        dispatch(loadingEndAction())

        history.push(`/quotes/${data._id}`)
    } catch (error) {

        console.log("error" , error)
    }
    
}

// Updating existing Quote
export const updateQuote = (id, quote) => async (dispatch) => {

    try {

        const response = await api.updateQuote(id, quote) 
        const data = response.data
        dispatch(updateQuoteAction(data))

    } catch (error) {

        console.log("error" , error)
    }
    
}
// Deleting existing Quote
export const deleteQuote = (id) => async (dispatch) => {

    try {

        await api.deleteQuote(id) 
        
        dispatch(deleteQuoteAction(id))

    } catch (error) {

        console.log("error" , error)
    }
    
}

// like Quote
export const likeQuote = (id) => async (dispatch) => {

    try {

        const response = await api.likeQuote(id) 
        const data = response.data
        dispatch(updateQuoteAction(data))

    } catch (error) {

        console.log("error" , error)
    }
    
}


export const commentQuoteAction = (value , id) => async (dispatch) => {
    try {
        const {data} = await api.commentQuote(value , id)

        dispatch(commentQuote(data))
        return data.commentQuote
    }catch (error){
        console.log("error" , error)
    }
}