import mongoose from 'mongoose'

const quoteSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    name: String,
    tags : [String],
    selectedFile: String,
    likeCount: {
        type : [String],
        default : [],
    },
    disLikeCount: {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default: new Date()
    }
})

const QuoteModel = mongoose.model("Quote", quoteSchema)

export default QuoteModel