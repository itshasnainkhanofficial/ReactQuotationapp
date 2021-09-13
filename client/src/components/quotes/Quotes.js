import Quote from './quote/Quote'
// import useStyle from './style'
import {useSelector} from 'react-redux'
function Quotes() {
    const quotes = useSelector(state => state.quotes)


    console.log("from quotes component",quotes)


    return (
        <>
            <h1 >Quotes component</h1>
           
            <Quote/>
            <Quote/>
        </>
    )
}

export default Quotes
