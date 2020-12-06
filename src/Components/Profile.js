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


class Profile extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            box_info: [
                { title: 'TOTAL DONATED', desc: '$55.08' },
                { title: 'TOTAL NUMBER OF CHARITIES', desc: '4' },
                { title: '[something]', desc: '[something]' },
                { title: 'CURRENT DONATION PLAN', desc: '$25.00 / month' },
                { title: '[something else]', desc: '[something else]' },
            ],
            userid: "",
            first_name: "",
            last_name: "",
            charities: [0, 1, 2, 3],
        };

        this.readData = this.readData.bind(this);
    }
    
    readData(){
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
                }
            });
        });
    }

    componentDidMount(){
        this.readData(this.state.userid);
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
                    Welcome to the Charitable home page! Here, you can see all your important information and stuff... [CHANGE LATER]
                    </Typography>
                    <div style={{marginTop: 40}}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="primary">
                            Find charities
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="outlined" color="primary">
                            [some other action]
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
                            image="https://source.unsplash.com/random"
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
                    {this.state.charities.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
                        <Card style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <a href="/charityex">
                        <CardMedia
                            style={{paddingTop: '56.25%'}}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                        </a>
                        <CardContent style={{flexGrow: 1}}>
                            <Typography gutterBottom variant="h5" component="h2">
                            [charity title]
                            </Typography>
                            <Typography>
                            [charity desc]
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