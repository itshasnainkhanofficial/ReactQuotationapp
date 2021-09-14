import useStyle from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import {createQuotes, updateQuote} from '../../redux/action/quotes'
import { useSelector } from 'react-redux'

function Form({currentId , setCurrentId}) {
 
    const quote = useSelector(state => currentId ? state.quotes.find( (p) => p._id === currentId) : null)

    
    const dispatch = useDispatch();
    const [quoteData, setquoteData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    })

    useEffect(() => {
        if(quote) setquoteData(quote)
    }, [quote])

    const clear = () => {
        setCurrentId(0);
        setquoteData({creator: "", title: '', message: '', tags: [], selectedFile: '' });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updateQuote(currentId, quoteData))
        } else{
            dispatch(createQuotes(quoteData));

        }
         clear();
    };
    const classes = useStyle();
    return (
        <div>
            
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="on" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} A Quote</Typography>
            
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={quoteData.creator} onChange={(e) => setquoteData({...quoteData, creator: e.target.value})  }/>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={quoteData.title} onChange={(e) => setquoteData({...quoteData, title: e.target.value})  }/>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={quoteData.message} onChange={(e) => setquoteData({...quoteData, message: e.target.value})  }/>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={quoteData.tags} onChange={(e) => setquoteData({...quoteData, tags: e.target.value.split(",")})  }/>
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setquoteData({ ...quoteData, selectedFile: base64 })} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Edit' : 'Create'}</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                    {/* <div style={{ padding: '5px 0', width: '94%' }}>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            value={postData.tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                        />
                    </div> */}
                    {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
                </form>
            </Paper>
        </div>
    )
}

export default Form
