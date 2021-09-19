import Quote from './quote/Quote'
import useStyles from './style'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
function Quotes({setCurrentId}) {
    const {quotes, isLoading} = useSelector(state => state.quotes)
    const classes = useStyles();

    if(!quotes?.length && !isLoading) return "No quotes available"

    return (
        <>
            
            {
                isLoading ? <CircularProgress /> : (
                    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                        {quotes.map((quote) => (
                            <Grid key={quote._id} item xs={12} sm={12} md={6} lg={3}>
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
