import mongoose from 'mongoose'

const quoteSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile: String,
    likeCount: {
        type : Number,
        default : 0,
    },
    disLikeCount: {
        type : Number,
        default : 0,
    },
    created : {
        type : Date,
        default: new Date()
    }
})

const QuoteModel = mongoose.model("quotemsg", quoteSchema)

export default QuoteModel