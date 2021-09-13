import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


// initiation
const app = express()
// middlewares
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());





// routes
import QuoteRoute from './routes/quotes.js'
app.use('/quotes', QuoteRoute)




// // routes error handling
// // 404 Error
// app.use((req, res, next) => {
//     next(createError(404));
//   });
  
// app.use( (err, req, res, next) => {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });





// constants
const CONNECTION_URL = "mongodb+srv://hasnain:hasnain123@cluster0.xa0yd.mongodb.net/quotationdb?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000



mongoose.connect(CONNECTION_URL, {useNewUrlParser : true})
.then( () => app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)))
.catch( (err) => console.log("error occured", err.message))

// mongoose.set("useFindAndModify",true)