import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles.js'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {

    const classes = useStyles(); 
    // get profile from local storage, set as user variable.  profile is set in reducers/auth.js
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();


    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        // push to homepage after logout
        history.push('./')
        // return user to null after logout
        setUser(null)
    };

    
    // used from google OAuth
    useEffect((logout, user) => {
        // when there is user.token, set user.token to variable "token"
        const token = user?.token;
        // setUser to profile data stored in local storage

        // if token is expired, logout
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // when location changes, run this function.  Sign in pushes to ('./') see Auth.js.  Logout pushes to ('./) to refresh page.  see logout function.
       }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">
                    PostCenter
                 </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {/* if there is a user, show user data.  otherwise, show Sign In link */}
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{"Hello " + user.result.name + " !"}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>                
                )}
            </Toolbar>
      </AppBar>
    )
}

export default Navbar
