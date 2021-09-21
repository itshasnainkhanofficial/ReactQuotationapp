// import axios from 'axios'
// const url = "http://localhost:5000/quotes"
// // const url = "https://greatquotations.herokuapp.com/quotes"

// // fetching all Quotes
// export const fetchAllQuotes = () => axios.get(url)

// // creating new Quote
// export const createNewQuote = (newQuote) => axios.post(url,newQuote)

// // updating Quote
// export const updateQuote = (id, QuoteData) => axios.patch(`${url}/${id}`, QuoteData)

// // deleting Quote
// export const deleteQuote = (id) => axios.delete(`${url}/${id}`)

// // liking Quote
// export const likeQuote = (id) => axios.patch(`${url}/${id}/likequote`)

// // disliking Quote
// export const disLikeQuote = (id) => axios.patch(`${url}/${id}/dislikequote`)

// // signIn
// export const signIn = (formData) => axios.post('/user/signin', formData);

// // signUp
// export const signUp = (formData) => axios.post('/user/signup', formData);


import axios from 'axios'

// base URL
const API = axios.create({baseURL: "http://localhost:5000"})

// sending token with every request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


// fetch signle Quote
export const fetchSingleQuote = (id) => axios.get(`/quotes/${id}`)
// fetching all Quotes
export const fetchAllQuotes = (page) => API.get(`/quotes?page=${page}`)

// fetch Quotes by Search
export const fetchAllQuotesBySearch = (searchQuery) => API.get(`/quotes/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

// creating new Quote
export const createNewQuote = (newQuote) => API.post("/quotes",newQuote)

// updating Quote
export const updateQuote = (id, QuoteData) => API.patch(`/quotes/${id}`, QuoteData)

// deleting Quote
export const deleteQuote = (id) => API.delete(`/quotes/${id}`)

// liking Quote
export const likeQuote = (id) => API.patch(`/quotes/${id}/likequote`)


// signIn
export const signIn = (formData) => API.post('/user/signin', formData);

// signUp
export const signUp = (formData) => API.post('/user/signup', formData);