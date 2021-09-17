import express from 'express'
import {getQuote , createQuote, updateQuote, deleteQuote, likeQuote, disLikeQuote} from '../controllers/quotes.js'
import auth from '../middleware/auth.js'

// initilize
const router = express.Router()

// read all quotes
router.get("/", getQuote )


// add a quote
router.post("/", auth, createQuote )

// updating quote using patch (for low bandwidh)
router.patch("/:id", auth, updateQuote)

// deleting quote
router.delete("/:id",auth, deleteQuote)

// liking quote
router.patch("/:id/likequote",auth, likeQuote)

// disLiking quote
router.patch("/:id/dislikequote",auth, disLikeQuote)

export default router