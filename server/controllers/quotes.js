import QuoteModel from '../models/qoutemsg.js'
import mongoose from 'mongoose';

export const getQuote = async (req, res , next) => {
    try {
        const allQuote = await QuoteModel.find()
        res.json(allQuote)
    } catch (error) {
        res.json({message: error.message})   
    }
}



export const createQuote = async (req, res) => {
    const quote = req.body
    const newQuote = new QuoteModel(quote)
    try {
        const data = await newQuote.save()
        res.json(data)
        
    } catch (error) {
        res.json({message : error.message})
    }
}



export const updateQuote = async (req, res) => {
    const {id : _id} = req.params // after destructring i rename the id
    const quote = req.body
    // to check if the id is mongoose object id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")
    const updatedQuote = await QuoteModel.findByIdAndUpdate( _id, quote , {new : true} ) // new true means we can see the updated version of the quote
    res.json(updatedQuote)
}


export const deleteQuote = async (req, res) => {

    const {id : _id} = req.params // after destructring i rename the id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")
    const deletedQuote = await QuoteModel.findByIdAndRemove(_id)
    res.json(deletedQuote)
}


export const likeQuote = async (req, res) => {
    const {id : _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")
    const quote = await QuoteModel.findById( _id)
    const updatedQuote = await QuoteModel.findByIdAndUpdate(_id, {likeCount : quote.likeCount + 1}, {new : true})
    res.json(updatedQuote)
}

export const disLikeQuote = async (req, res) => {
    const {id : _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")
    const quote = await QuoteModel.findById( _id)
    const updatedQuote = await QuoteModel.findByIdAndUpdate(_id, {disLikeCount : quote.disLikeCount + 1} , {new : true})
    res.json(updatedQuote)
}