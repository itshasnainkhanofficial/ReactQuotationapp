import useStyle from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createQuotes, updateQuote } from '../../redux/action/quotes'
import { useSelector } from 'react-redux'
import ChipInput from 'material-ui-chip-input';


function Form({ currentId, setCurrentId }) {
    const classes = useStyle();
    const quote = useSelector(state => currentId ? state.quotes.quotes.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem("profile"));

    const dispatch = useDispatch();
    const [quoteData, setquoteData] = useState({
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
    })

    useEffect(() => {
        if (quote) setquoteData(quote)
    }, [quote])

    const clear = () => {
        setCurrentId(0);
        setquoteData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === null || currentId === 0) {
            dispatch(createQuotes({ ...quoteData, name: user?.result?.name }));
        } else {

            dispatch(updateQuote(currentId, { ...quoteData, name: user?.result?.name }))
        }
        clear();
    };
    const handleAddChip = (tag) => {
        setquoteData({ ...quoteData, tags: [...quoteData.tags, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setquoteData({ ...quoteData, tags: quoteData.tags.filter((tag) => tag !== chipToDelete) });
      };
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own Quotations and like other's Quotations.
                </Typography>
            </Paper>
        );
    }

    return (
        <div>

            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="on" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} A Quote</Typography>

                    <TextField name="title" variant="outlined" label="Title" fullWidth value={quoteData.title} onChange={(e) => setquoteData({ ...quoteData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={quoteData.message} onChange={(e) => setquoteData({ ...quoteData, message: e.target.value })} />
                    {/* <TextField name="tags" variant="outlined" label="Tags" fullWidth value={quoteData.tags} onChange={(e) => setquoteData({ ...quoteData, tags: e.target.value.split(",") })} /> */}
                    <div style={{ padding: '5px 0', width: '94%' }}>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            value={quoteData.tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                            newChipKeys={['Enter' ,'Tab']}
                            
                        />
                    </div>
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setquoteData({ ...quoteData, selectedFile: base64 })} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Edit' : 'Create'}</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                </form>
            </Paper>
        </div>
    )
}

export default Form
