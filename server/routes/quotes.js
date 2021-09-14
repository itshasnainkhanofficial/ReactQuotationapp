import express from 'express'
import {getQuote , createQuote, updateQuote, deleteQuote, likeQuote, disLikeQuote} from '../controllers/quotes.js'

// initilize
const router = express.Router()

// read all quotes
router.get("/", getQuote )


// add a quote
router.post("/", createQuote )

// updating quote using patch (for low bandwidh)
router.patch("/:id", updateQuote)

// deleting quote
router.delete("/:id", deleteQuote)

// liking quote
router.patch("/:id/likequote", likeQuote)

// disLiking quote
router.patch("/:id/dislikequote", disLikeQuote)

export default router