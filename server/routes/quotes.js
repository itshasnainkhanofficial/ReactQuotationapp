import express from 'express'
import {getQuotes , createQuote, updateQuote, deleteQuote, likeQuote,getQuotesBySearch, getQuote} from '../controllers/quotes.js'
import auth from '../middleware/auth.js'

// initilize
const router = express.Router()

// read all quotes by search
router.get("/search", getQuotesBySearch)

// read all quotes
router.get("/", getQuotes )

// read single quote
router.get("/:id", getQuote )

// add a quote
router.post("/", auth, createQuote )

// updating quote using patch (for low bandwidh)
router.patch("/:id", auth, updateQuote)

// deleting quote
router.delete("/:id",auth, deleteQuote)

// liking quote
router.patch("/:id/likequote",auth, likeQuote)



export default router