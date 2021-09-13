import useStyle from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState } from 'react'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import {createQuotes} from '../../redux/action/quotes'
function Form() {
    const dispatch = useDispatch();
    const [quoteData, setquoteData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    })
    const clear = () => {
        // setCurrentId(0);
        setquoteData({creator: "", title: '', message: '', tags: [], selectedFile: '' });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
          dispatch(createQuotes(quoteData));

        // if (currentId === 0) {
        //   clear();
        // } else {
        //   dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        //   clear();
        // }
    };
    const classes = useStyle();
    return (
        <div>
            <h1>Form Component</h1>
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="on" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Creating A Quote</Typography>
                    {/* <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} /> */}
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={quoteData.creator} onChange={(e) => setquoteData({...quoteData, creator: e.target.value})  }/>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={quoteData.title} onChange={(e) => setquoteData({...quoteData, title: e.target.value})  }/>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={quoteData.message} onChange={(e) => setquoteData({...quoteData, message: e.target.value})  }/>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={quoteData.tags} onChange={(e) => setquoteData({...quoteData, tags: e.target.value})  }/>
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setquoteData({ ...quoteData, selectedFile: base64 })} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
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
