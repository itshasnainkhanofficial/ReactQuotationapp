import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link} from 'react-router-dom';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {logoutAction} from '../../redux/action/auth'
import {useHistory, useLocation} from 'react-router-dom'
import decode from 'jwt-decode'
const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const classes = useStyles();

    useEffect(() => {
        const token = user?.token;
        if(token){
          const decodedToken = decode(token)
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem("profile")))

    }, [location])

    const logout = () => {
        dispatch(logoutAction());

        history.push('/auth');
    
        setUser(null);
    }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Quotations</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;