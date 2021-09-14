import {makeStyles} from '@material-ui/core/styles'



export default makeStyles( (theme) => {
    return {
        appBar : {
            borderRadius: 15,
            margin: '1.6rem 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.8rem 2rem',
        },
        heading : {
            color : "rgba(0,183,255,1)"
        },
        image: {
            marginLeft : '15px'
        },
        [theme.breakpoints.down("sm")]:{
            MainContainer:{
                flexDirection:"column-reverse"
            }
        }
        
    }
})