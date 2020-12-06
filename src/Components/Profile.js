import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import firebase from 'firebase';
import 'firebase/firestore';
import heartinhand from './charity.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/profile">
        CHARITABLE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2), //20px
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    height: '100%',
    width: '100%',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const top_cards = [0, 1, 2];
const med_cards = [3, 4];
const num = [0,1,2,3,4];


class Profile extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            box_info: [
                { title: 'TOTAL NUMBER OF CHARITIES', desc: '4' },
                { title: 'TOTAL DONATED', desc: '$55.08' },
                { title: 'MONTHS OF GIVING', desc: '8' },
                { title: 'CURRENT DONATION PLAN', desc: '$25.00 / month' },
                { title: 'YOUR CHARITIES', desc: 'Animals, Health' },
            ],
            userid: "",
            first_name: "",
            last_name: "",
            charities: [],
            preferences: [""],
            display: []
        };

        this.readData = this.readData.bind(this);
    }
    
    readData(){
        var charities = []
        var display = []
        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({userid: user.uid}, () => {console.log(this.state.userid)});
            } else {
                console.log("error");
            }
        })

        firebase.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id === this.state.userid){
                    this.setState({first_name: doc.data().firstName.toLowerCase()}, () => {console.log(this.state.first_name)});
                    this.setState({last_name: doc.data().lastName.toLowerCase()}, () => {console.log(this.state.last_name)});
                    this.setState({charities: doc.data().charities}, () => {console.log(this.state.charities)});
                    this.setState({preferences: doc.data().preferences}, () => {console.log(this.state.preferences)});
                }
            });
        });
        firebase.firestore().collection("charities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.state.charities.forEach((charity) => {
                    if (doc.id === charity.charityId){
                        var joined = this.state.display.concat([doc.data().name, doc.data().description]);
                        this.setState({display: joined});
                        console.log(this.state.display);
                    }
                    
                });
            });
        });
        
        
    }

    componentDidMount(){
        this.readData(this.state.userid);
    }

    // NEEDS TO BE FIXED: COPIED FROM HOMESCREEN.js
    //Purpose: onClick for the button Update Interests should take you to /setup
    handleSubmitInterests(e) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            this.props.history.push('/setup')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/invalid-email") {
                this.setState({ emailError: true, passwordError: false })
            }
            else if (errorCode === "auth/wrong-password") {
                this.setState({ emailError: false, passwordError: true })
            }
            else {
                this.setState({ emailError: true, passwordError: true })
            }
            alert(errorMessage)
        });
    }
    
    // NEEDS TO BE FIXED: COPIED FROM HOMESCREEN.js
    //Purpose: onClick for the button Find Charities should take you to /charityex
    handleSubmitCharity(e) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            this.props.history.push('/charityex')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/invalid-email") {
                this.setState({ emailError: true, passwordError: false })
            }
            else if (errorCode === "auth/wrong-password") {
                this.setState({ emailError: false, passwordError: true })
            }
            else {
                this.setState({ emailError: true, passwordError: true })
            }
            alert(errorMessage)
        });
    }

    render(){
        return (
            <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                <CameraIcon style={{marginRight: 20}}/>
                <Typography variant="h6" color="inherit" noWrap>
                    CHARITABLE
                </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div style={{paddingTop: 80, paddingBottom: 60}}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Hi, {this.state.first_name.charAt(0).toUpperCase() + this.state.first_name.slice(1).toLowerCase()}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Welcome to your Charitable home page! 
                    <br></br>Here, you can see your current charity portfolio, manage your donation plan, and discover new charities.
                    Giving is easy and powerful.
                    </Typography>
                    <div style={{marginTop: 40}}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="primary" onClick = {this.handleSubmitCharity}>
                            Find charities
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="outlined" color="primary" onClick = {this.handleSubmitInterests}>
                            Update Interests
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
                </div>
                <Container style={{paddingTop: 80, paddingBottom: 80}} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {top_cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <CardContent style={{flexGrow: 1}}>
                            <Typography gutterBottom variant="h5" component="h2" align='center'>
                            {this.state.box_info[card].desc}
                            </Typography>
                            <Typography align='center'>
                            {this.state.box_info[card].title}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                    {med_cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={6}>
                        <Card style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <CardMedia
                            style={{paddingTop: '56.25%'}}
                            // image="https://source.unsplash.com/random"
                            image={heartinhand}
                            title="Image title"
                        />
                        <CardContent style={{flexGrow: 1}}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {this.state.box_info[card].desc}
                            </Typography>
                            <Typography>
                            {this.state.box_info[card].title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                            CHANGE
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                    {num.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
                        <Card style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <a href="/charityex">
                        <CardMedia
                            style={{paddingTop: '56.25%'}}
                            // image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                        </a>
                        <CardContent style={{flexGrow: 1}}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {this.state.display[card*2]}
                            </Typography>
                            <Typography>
                            {this.state.display[card*2+1]}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer style={{padding: 60}}>
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Heart to Heart; Giving made easy
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
            </React.Fragment>
        );
    }
}

export default Profile;