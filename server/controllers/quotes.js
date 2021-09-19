import QuoteModel from '../models/qoutemsg.js'
import mongoose from 'mongoose';

export const getQuote = async (req, res ) => {
    // res.send("get quote run")
    const {page} = req.query
    // res.send(page)

    try {
        const LIMIT = 8; // no. of quotes per page
        const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page
        const total = await QuoteModel.countDocuments({})

        const Quotes = await QuoteModel.find().sort({_id : -1}).limit(LIMIT).skip(startIndex)

        res.status(200).json({data : Quotes , currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (error) {
        res.status(404).json({message: error.message})   
    }
}

// Query = /quotes/quotes?page=1 ==> page = 1
// params = /quotes/:123 ==> id = 123

// getQuotesBySearch
export const getQuotesBySearch = async (req, res ) => {
    const {searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const quotes = await QuoteModel.find({$or : [{title}, {tags : {$in : tags.split(",")}}]})
        console.log(quotes)
        res.json({data : quotes})
    } catch (error) {
        res.status(404).json({message: error.message})   
    }
}



export const createQuote = async (req, res) => {
    const quote = req.body
    const newQuote = new QuoteModel({...quote, creator : req.userId, createdAt: new Date().toISOString()})
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


// export const likeQuote = async (req, res) => {
//     const {id : _id} = req.params
//     if(!req.userId){
//         return res.json({message :  Unauthenticated})
//     }

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")

//     const quote = await QuoteModel.findById( _id)

//     const index = quote.likeCount.findIndex( (id) => {
//         id === String(req.userId)
//     })

//     if(index === -1){
//         // like quote
//         quote.likeCount.push(req.userId)
//     }
//     else{
//         // dislike quote
//         quote.likeCount = quote.likeCount.filter((id)=> {
//             id !== String(req.userId)
//         })
//     }
//     const updatedQuote = await QuoteModel.findByIdAndUpdate(_id, quote, {new : true})
//     res.json(updatedQuote)
// }


export const likeQuote = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const quote = await QuoteModel.findById(id);

    const index = quote.likeCount.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      quote.likeCount.push(req.userId);
    } else {
      quote.likeCount = quote.likeCount.filter((id) => id !== String(req.userId));
    }
    const updatedquote = await QuoteModel.findByIdAndUpdate(id, quote, { new: true });
    res.status(200).json(updatedquote);
}




export const disLikeQuote = async (req, res) => {
    const {id : _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No quote with this Id")
    const quote = await QuoteModel.findById( _id)
    const updatedQuote = await QuoteModel.findByIdAndUpdate(_id, {disLikeCount : quote.disLikeCount + 1} , {new : true})
    res.json(updatedQuote)
}