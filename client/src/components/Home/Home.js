import { Container, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Form from '../form/Form';
import Quotes from '../quotes/Quotes';
import { useEffect , useState } from 'react';
import {getQuotes} from '../../redux/action/quotes'
import Pagination from '../pagination/Pagination'
import useStyles from './styles'
import ChipInput from 'material-ui-chip-input';
import { useHistory, useLocation } from 'react-router-dom';
import {getQuotesBySearch} from '../../redux/action/quotes'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');


  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchQuote = () => {


    if (search || tags) {
      const searchTerm = search.trim()
      dispatch(getQuotesBySearch({ search : searchTerm, tags: tags.join(',') }));
      history.push(`/Quotes/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log("Enter pressed")
      searchQuote();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  

  return (
    // <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Quotes setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Quotation" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
                newChipKeys={['Enter' ,'Tab']}
              />
              <Button onClick={searchQuote} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
                {(!searchQuery && !tags.length) && (
                  <Pagination page={page} classname={classes.pagination}/>
                )}
              </Paper>
          </Grid>
        </Grid>
      </Container>
    // </Grow>
  );
};

export default Home;