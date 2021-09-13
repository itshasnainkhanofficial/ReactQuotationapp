import express from 'express'
import {getQuote , createQuote} from '../controllers/quotes.js'

// initilize
const router = express.Router()

// get request
router.get("/", getQuote )


// post request
router.post("/", createQuote )


export default router