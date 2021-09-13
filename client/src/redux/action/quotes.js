import * as api from '../../api'
import {FETCH_QUOTES , CREATE_QUOTES } from '../actiontypes/quotes'
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


// // action creaters
export const getQuotes = () => async (dispatch ) => {
    try {
        const response = await api.fetchAllQuotes() 
        const data = response.data
        dispatch(fetchQuotesAction(data))
    } catch (error) {
        console.log("error" , error.message)
    }
    
}




export const createQuotes = (quote) => async (dispatch) => {
    try {

        const response = await api.createNewQuote(quote) 
        const data = response.data
        dispatch(createQuotesAction(data))

    } catch (error) {

        console.log("error" , error.message)
    }
    
}

