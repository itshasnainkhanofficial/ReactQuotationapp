import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './Icon';
import useStyles from './styles';
import Input from './Input'
import {useDispatch} from 'react-redux'
import {authAction, signUp, signIn} from '../../redux/action/auth'
import {useHistory} from 'react-router-dom'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const [formData, setFormData] = useState(initialState)
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignUp) {
            dispatch(signUp(formData, history));
          } else {
            dispatch(signIn(formData, history));
          }
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }
    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch(authAction(result,token));
          history.push('/');
        } catch (error) {
          console.log(error);
        }
    }
    const googleError = (error) => {
        console.log("Google Sign In was unSuccessfull!. Try again later", error)
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignUp ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            { isSignUp && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin 
            clientId="363966942804-71cit1sjvtcqv2a6jiq242no9cc2pr48.apps.googleusercontent.com"
            render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.enabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}

            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
        </div>
    )
}

export default Auth
