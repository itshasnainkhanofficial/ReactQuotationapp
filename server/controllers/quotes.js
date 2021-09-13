import QuoteModel from '../models/qoutemsg.js'

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
