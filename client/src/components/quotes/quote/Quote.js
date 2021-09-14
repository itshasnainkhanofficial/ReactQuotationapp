import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import moment from 'moment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import {deleteQuote, likeQuote, DisLikeQuote} from '../../../redux/action/quotes'

function Quote({quote , setCurrentId}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <Card className={classes.card}>
      <CardMedia className={classes.media} image={quote.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={quote.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{quote.creator}</Typography>
        <Typography variant="body2">{moment(quote.created).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(quote._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{quote.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{quote.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{quote.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likeQuote(quote._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp; {quote.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(DisLikeQuote(quote._id))}><ThumbDownAltIcon fontSize="small" /> &nbsp; {quote.disLikeCount} </Button>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteQuote(quote._id))}><DeleteIcon fontSize="small" /></Button>
      </CardActions>
    </Card>
    )
}

export default Quote
