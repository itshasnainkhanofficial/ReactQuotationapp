import {combineReducers} from 'redux'
import quotes from './quotes'
import auth from './auth'

export default combineReducers({
    quotes : quotes,
    authReducer: auth
})