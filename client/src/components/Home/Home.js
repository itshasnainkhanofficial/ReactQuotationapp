import { Container, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Form from '../form/Form';
import Quotes from '../quotes/Quotes';
import { useEffect , useState } from 'react';
import {getQuotes} from '../../redux/action/quotes'

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)
  
    
    useEffect(() => {
      dispatch(getQuotes())
    }, [dispatch])
  
  

  return (
    // <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Quotes setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    // </Grow>
  );
};

export default Home;