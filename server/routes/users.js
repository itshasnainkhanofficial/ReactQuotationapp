import express from 'express'
import {signIn, signUp} from '../controllers/users.js'
// initilize
const router = express.Router()


router.post("/signin", signIn)

router.post("/signup", signUp)


export default router