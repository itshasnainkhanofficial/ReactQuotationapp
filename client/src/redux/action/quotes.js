import * as api from '../../api'
import {FETCH_QUOTES , CREATE_QUOTES, UPDATE_QUOTES, DELETE_QUOTES} from '../actiontypes/quotes'
// import axios from 'axios'



const fetchQuotesAction = (quotes) => {
    return {
        type : FETCH_QUOTES,
        payload : quotes
    }
}
const createQuotesAction = (quotes) => {
    return {
        type : CREATE_QUOTES,
        payload : quotes
    }
}
const updateQuoteAction = (quotes) => {
    return {
        type : UPDATE_QUOTES,
        payload : quotes
    }
}
const deleteQuoteAction = (quotes) => {
    return {
        type : DELETE_QUOTES,
        payload : quotes
    }
}



// action creaters

// Getting all quotes
export const getQuotes = () => async (dispatch ) => {
    try {
        const response = await api.fetchAllQuotes() 
        const data = response.data
        dispatch(fetchQuotesAction(data))
    } catch (error) {
        console.log("error" , error.message)
    }
    
}



// Adding new Quote
export const createQuotes = (quote) => async (dispatch) => {
    try {

        const response = await api.createNewQuote(quote) 
        const data = response.data
        dispatch(createQuotesAction(data))

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
