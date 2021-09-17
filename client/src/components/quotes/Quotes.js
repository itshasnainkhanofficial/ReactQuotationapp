import Quote from './quote/Quote'
import useStyles from './style'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
function Quotes({setCurrentId}) {
    const quotes = useSelector(state => state.quotes)
    const classes = useStyles();



    return (
        <>
            
            {
                !quotes.length ? <CircularProgress /> : (
                    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                        {quotes.map((quote) => (
                            <Grid key={quote._id} item xs={12} sm={6} md={6}>
                                <Quote quote={quote} setCurrentId={setCurrentId}  />
                            </Grid>
                        ))}
                    </Grid>
                    )
            }
            
        </>
    )
}

export default Quotes
