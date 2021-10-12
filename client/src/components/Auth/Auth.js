import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icon from "./icon.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import Input from "./Input.js";
import { GoogleLogin } from "react-google-login";
import { signup, signin } from "../../actions/auth.js";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    // e.preventDefault stops browser refresh on form submit, which is the default behavior of the browser.
    e.preventDefault();
    if(isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    };
  };
  const handleChange = (e) => {
    // setForma data to form Input data
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // this toggles setShowPassword
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // this toggles setIsSignup message at bottom of form
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

//   functions for google OAuth
  const googleSuccess = async (res) => {
    // profileObj is part of the response from google.  The ? prevents an error if there is no response.
    const result = res?.profileObj;
    const token = res?.tokenId;
    
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      // redirect user to home after login
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In failed. Try again later, or sign in with your email and password.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* if isSignup=true display sign up form */}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {/* else, display sign in form */}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            {/* if showPassword is true, show text, otherwise, show password.  this allows view to see password at entry */}
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {/* if isSIgnup, display content below in place of line above. */}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

        {/* manual sign in button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

        {/* google sign in button */}
          <GoogleLogin
            //   client id pulled from google OAuth. console.could.google.com
            clientId="882149642020-ms7okv58002r5p43q1ift36d6djtbd2j.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />

    
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
