import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import QuoteRoute from './routes/quotes.js'
import UserRoute from './routes/users.js'
import dotenv from 'dotenv'

// initiation
const app = express()
dotenv.config()
// middlewares
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());





// routes
app.get("/", (req, res) => {
    res.send("Welcome to Quotations app")
})

app.use('/quotes', QuoteRoute)
app.use('/user', UserRoute)



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
const PORT = process.env.PORT || 5000
const URL = process.env.CONNECTION_URL_OFFLINE


mongoose.connect(URL, {useNewUrlParser : true})
.then( () => app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)))
.catch( (err) => console.log("error occured", err.message))

// mongoose.set("useFindAndModify",true)