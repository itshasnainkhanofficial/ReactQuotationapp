import { AppBar, Container, Typography, Grid} from '@material-ui/core';
import quoteimg from '../src/assets/images/img1.jpg'
import Form from './components/form/Form';
import Quotes from './components/quotes/Quotes';
import useStyle from './style'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {getQuotes} from './redux/action/quotes'



function App() {
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuotes())
  }, [dispatch])


  return (
    <div>
      <Container maxWidth="lg">
          <AppBar position="static" color="inherit" className={classes.appBar}>
              <Typography variant="h2" align="center" className={classes.heading}>Quotations App</Typography>
              <img src={quoteimg} alt="quote one" height={60} className={classes.image} />
          </AppBar>
          {/* <Grow in={true}> */}
              <Container>
              <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Quotes/>
              </Grid>
              <Grid item xs={12} sm={4}>
                  <Form/>
              </Grid>
          </Grid>
              </Container>
          {/* </Grow> */}
      </Container>
    </div>
  )
}

export default App
