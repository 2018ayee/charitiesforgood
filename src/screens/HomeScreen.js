import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { classes } from "../App.css"
import firebase from 'firebase/app';
import "firebase/auth";

class Copyright extends React.Component {
    render(){
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            
                Charitable
            {' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        );
    }
}


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.password = this.password.bind(this);
        this.email = this.email.bind(this);
    }
    
    handleSubmit(e) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            this.props.history.push('/charities')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("wrong")
        });
    }

    password(e){
        this.setState({password: e.target.value});
    }

    email(e){
        this.setState({email: e.target.value});
    }

    render() {
        return (
            <Grid container component="main" style = {{"height": "100vh"}}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} style = {{"backgroundSize": "cover", "backgroundPosition": "center", "backgroundImage": 'url(https://source.unsplash.com/random)'}}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div style = {{"display": "flex","flexDirection": "column", "alignItems":"center", "marginLeft": 80, "marginRight": 40}}>
                <Avatar style = {{"margin": 10, "marginTop": 100}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form style = {{"width": "100%", "marginTop": 10}} noValidate>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange = {this.email}
                    autoFocus
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange = {this.password}
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                    onClick = {this.handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    style = {{marginTop: 30, marginBottom: 20}}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signUp" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                    <Box mt={5}>
                    <Copyright />
                    </Box>
                </form>
                </div>
            </Grid>
            </Grid>
        );
    }
}

export default HomeScreen;