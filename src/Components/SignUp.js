import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import { BrowserRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import classes from '../App.css';
import firebase from 'firebase/app';
import "firebase/auth";

// function SignUp(props) {
//     this.state = {
//         count: 0
//     }
//     this.handleSubmit = this.handleSubmit.bind(this);
// }

class Copyright extends React.Component {
    render() {
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



class SignUp extends React.Component  {
    

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.password = this.password.bind(this);
        this.email = this.email.bind(this);
    }
    
    handleSubmit = (e) => {
        const db = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log(user)
                 db.collection("users").doc(user.user.uid).set({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    charities: [],
                    preferences: [],
                })
                .then(function() {
                    console.log("Document successfully written!");
                    //window.location.href = '/setup'
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
        });
    }

    firstName(e) {
        this.setState({firstName: e.target.value});
    }

    lastName(e) {
        this.setState({lastName: e.target.value});
    }

    password(e){
        this.setState({password: e.target.value});
    }

    email(e){
        this.setState({email: e.target.value});
    }

    render() {
        // const classes = this.props;
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar style={{margin:10}}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form  noValidate style={{width: "100%", marginTop: 30}} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={this.firstName}
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={this.lastName}
                        autoComplete="lname"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={this.email}
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={this.password}
                        autoComplete="current-password"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    {/* <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    /> */}
                    </Grid>
                </Grid>
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    style = {{marginTop: 30, marginBottom: 20}}
                    onClick = {this.handleSubmit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/home" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>
        );
    }
}

export default SignUp;
// Object.setPrototypeOf(SignUp.prototype, React.Component.prototype);