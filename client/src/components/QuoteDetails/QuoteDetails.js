import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getSingleQuote, getQuotesBySearch } from '../../redux/action/quotes';
import useStyles from './styles';
import Comments from './Comments'
const QuoteDetails = () => {
  const {quote, quotes , isLoading} = useSelector((state) => state.quotes);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  
  const { id } = useParams();


  useEffect(() => {
    dispatch(getSingleQuote(id));
  }, [id]);

  useEffect(() => {
    if (quote) {
      dispatch(getQuotesBySearch({ search: 'none', tags: quote?.quote?.tags.join(',') }));
    }
  }, [quote]);

  if (!quote) return null;

  const openQuoteById = (_id) => history.push(`/quotes/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedquotes = quotes.filter(({ _id }) => _id !== quote._id);
  

  return (
      
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{quote.quote.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{quote.quote.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{quote.quote.message}</Typography>
          <Typography variant="h6">Created by: {quote.name}</Typography>
          <Typography variant="body1">{moment(quote.quote.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />


          <Comments quote={quote} />


          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={quote.quote.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={quote.title} />
        </div>
      </div>
      
     
       { recommendedquotes.length ? 
      <div className={classes.section}>
        <Typography gutterBottom variant="h5">You might also like:</Typography>
        <Divider />
        <div className={classes.recommendedquotes}>
          {recommendedquotes.map(({ title, name, message, likeCount, selectedFile, _id }) => (

            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openQuoteById(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likeCount.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
          ))}
        </div>
        </div> : "No Recomended Quotes for this Quote"} 

    </Paper>
  );
}

export default QuoteDetails;