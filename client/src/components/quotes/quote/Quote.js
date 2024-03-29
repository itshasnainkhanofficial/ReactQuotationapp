import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import moment from 'moment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux'
import { deleteQuote, likeQuote } from '../../../redux/action/quotes'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useHistory } from 'react-router-dom';
import {useState} from 'react'

function Quote({ quote, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [likes , setLikes] = useState(quote?.likeCount);
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedQuote = quote.likeCount.find((like) => like === userId);

  const handleLike = async ()  => {
    dispatch(likeQuote(quote._id))
    if(hasLikedQuote){
      setLikes(quote.likeCount.filter( (id) => id !== userId))
    }else{
      setLikes([...quote.likeCount, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    history.push(`/quotes/${quote._id}`)
  }
  return (
    <Card className={classes.card} raised elevation={6}>



      <CardMedia className={classes.media} image={quote.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={quote.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{quote.name}</Typography>
        <Typography variant="body2">{moment(quote.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === quote?.creator || user?.result?._id === quote?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(quote._id)}><MoreHorizIcon fontSize="medium" /></Button>
        </div>
      )}  
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{quote.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{quote.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{quote.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}> &nbsp; <Likes /> </Button>
        {(user?.result?.googleId === quote?.creator || user?.result?._id === quote?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteQuote(quote._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Quote
