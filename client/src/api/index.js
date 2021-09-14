import axios from 'axios'
const url = "http://localhost:5000/quotes"

// fetching all Quotes
export const fetchAllQuotes = () => axios.get(url)

// creating new Quote
export const createNewQuote = (newQuote) => axios.post(url,newQuote)

// updating Quote
export const updateQuote = (id, QuoteData) => axios.patch(`${url}/${id}`, QuoteData)

// deleting Quote
export const deleteQuote = (id) => axios.delete(`${url}/${id}`)

// liking Quote
export const likeQuote = (id) => axios.patch(`${url}/${id}/likequote`)

// disliking Quote
export const disLikeQuote = (id) => axios.patch(`${url}/${id}/dislikequote`)