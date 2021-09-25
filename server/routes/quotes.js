import express from 'express'
import * as Controllers from '../controllers/quotes.js'
import auth from '../middleware/auth.js'

// initilize
const router = express.Router()

// read all quotes by search
router.get("/search", Controllers.getQuotesBySearch)

// read all quotes
router.get("/", Controllers.getQuotes)

// read single quote
router.get("/:id", Controllers.getQuote)

// add a quote
router.post("/", auth, Controllers.createQuote)

// updating quote using patch (for low bandwidh
router.patch("/:id", auth, Controllers.updateQuote)

// deleting quote
router.delete("/:id",auth, Controllers.deleteQuote)

// liking quote
router.patch("/:id/likequote",auth, Controllers.likeQuote)

// comment quotes
router.post("/:id/commentQuote",auth, Controllers.commentQuote)


export default router