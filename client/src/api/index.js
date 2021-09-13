import axios from 'axios'
const url = "http://localhost:5000/quotes"


export const fetchAllQuotes = () => axios.get(url)
// export const fetchAllQuotes = () => axios.get("https://jsonplaceholder.typicode.com/posts")
export const createNewQuote = (newQuote) => axios.post(url,newQuote)