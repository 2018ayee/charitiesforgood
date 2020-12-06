import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import firebase from 'firebase';
import 'firebase/firestore';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Charitable
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Expenses',
    // price: '0',
    description: [
      'Program: [program_exp]', 
      // 'Administration: ' + this.state.admin_exp_p.toString(),
      'Fundraising: [fund_exp]'],
    buttonText: 'Finances',
    buttonVariant: 'outlined',
  },
  {
    title: 'The Essentials',
    // subheader: 'about us',
    // price: '15',
    description: [
      'Size: [size]',
      'Total revenue: [tot_rev]',
      'Headquarters: [state]',
      'Motto: [motto]',
    ],
    buttonText: 'Website',
    buttonVariant: 'contained',
  },
  {
    title: 'Details',
    // price: '30',
    description: [
      'Fundraising efficiency: [fund_eff]',
      'Leader compensation: [leader_comp]',
      'EIN: [ein]',
    ],
    buttonText: 'Donate',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

// const classes = useStyles();

class CharityInfo extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    var url = window.location.href;
    var parts = url.split("/");
    var id = parts[parts.length - 1];

    this.state = { 
        tiers: [],
        footers: [],
        charity: {
          admin_exp_p: 0,
          category: "",
          description: "",
          ein: "",
          fund_eff: 0,
          fund_exp_p: 0,
          leader_comp: 0,
          motto: "",
          name: "",
          program_exp_p: 0,
          size: "",
          state: "",
          subcategory: "",
          tot_rev: "",
        },
        id: id,
    };
    this.state.tiers = [
      {
        title: 'Expenses',
        // price: '0',
        description: ['Financial score: ' + this.state.charity.fscore, 'Program: ' + this.state.charity.program_exp_p, 'Administration: ' + this.state.charity.admin_exp_p, 'Fundraising: ' + this.state.charity.fund_exp_p],
        buttonText: 'Finances',
        buttonVariant: 'outlined',
      },
      {
        title: 'The Essentials',
        // subheader: 'about us',
        // price: '15',
        description: [
          'Size: ' + this.state.charity.size,
          'Total revenue: ' + this.state.charity.tot_rev,
          'Headquarters: ' + this.state.charity.state,
          'Motto: ' + this.state.charity.motto,
        ],
        buttonText: 'Website',
        buttonVariant: 'contained',
      },
      {
        title: 'Details',
        // price: '30',
        description: [
          'Fundraising efficiency: ' + this.state.charity.fund_eff,
          'Leader compensation: ' + this.state.charity.leader_comp,
          'EIN: ' + this.state.charity.ein,
        ],
        buttonText: 'Donate',
        buttonVariant: 'outlined',
      },
    ]

  }

  componentDidMount(){
    const db = firebase.firestore();
    db.collection("charities").doc(this.state.id).get().then(doc => {
      if (doc.exists) {
        let data = doc.data()
        this.setState({charity: data}, function() {
          this.setState({ tiers: [
            {
              title: 'Expenses',
              // price: '0',
              description: ['Financial score: ' + this.state.charity.fscore, 'Program: ' + this.state.charity.program_exp_p, 'Administration: ' + this.state.charity.admin_exp_p, 'Fundraising: ' + this.state.charity.fund_exp_p],
              buttonText: 'Finances',
              buttonVariant: 'outlined',
            },
            {
              title: 'The Essentials',
              // subheader: 'about us',
              // price: '15',
              description: [
                'Size: ' + this.state.charity.size,
                'Total revenue: $' + this.state.charity.tot_rev,
                'Headquarters: ' + this.state.charity.state,
                'Motto: ' + this.state.charity.motto,
              ],
              buttonText: 'Website',
              buttonVariant: 'contained',
            },
            {
              title: 'Details',
              // price: '30',
              description: [
                'Fundraising efficiency: ' + this.state.charity.fund_eff,
                'Leader compensation: $' + this.state.charity.leader_comp,
                'EIN: ' + this.state.charity.ein,
              ],
              buttonText: 'Donate',
              buttonVariant: 'outlined',
            },
          ]})
        })
      }
      else {
        console.log("doesnt exist")
      }
    }).catch(function(err) {
      console.log(err)
    })
  }

  render(){
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar style={{flexWrap: 'wrap'}}>
            <CameraIcon style={{marginRight: 20}}/>
            <Typography variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
              Charitable
            </Typography>
            <nav>
              <Link variant="button" color="textPrimary" href="#" style={{marginTop: 10, marginBottom: 10, marginLeft: 15, marginRight: 15}}>
                Return to My Profile
              </Link>
              {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Enterprise
              </Link> */}
              {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Support
              </Link> */}
            </nav>
            <Button href="#" color="primary" variant="outlined" style={{marginTop: 10, marginBottom: 10, marginLeft: 15, marginRight: 15}}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container maxWidth="lg" component="main" style={{paddingTop: 80, paddingBottom: 60}}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {this.state.charity.name}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            <i>{this.state.charity.category}</i>
          </Typography> <br />
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            {this.state.charity.description}
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {this.state.tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                  />
                  <CardContent>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', marginBottom: 20}}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        {tier.price}
                      </Typography>
                      {/* <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography> */}
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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

export default CharityInfo;