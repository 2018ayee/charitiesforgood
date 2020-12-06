import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Container, Card} from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';
import arts from '../img/arts.jpg'
import firebase from 'firebase/app'
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import ConfirmationScreen from "./ConfirmationScreen"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

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

export default class SetupScreen extends React.Component{
    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            data: {},
            userId: "jqc0xSYXMjg0wabiqmsN",
            onCategories: true,
            onFilters: false,
            onConfirmation: false,
            onPayment: false,
            categories: [
                {
                    name: "Community Development",
                    img: "https://www.jolietymca.org/dev-2018/wp-content/uploads/2019/11/Giving-Tuesday.png"
                },
                {
                    name: "International",
                    img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
                },
                {
                    name: "Human Services",
                    img: "https://www.usnews.com/dims4/USNEWS/af518a6/2147483647/resize/1200x%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F1c%2F13%2F89c5d83f442897aa59318c304759%2Fnurselaughingresident.jpg"
                },
                {
                    name: "Arts, Culture, Humanities",
                    img: "https://mymodernmet.com/wp/wp-content/uploads/2019/03/elements-of-art-6.jpg"
                },
                {
                    name: "Research and Public Policy",
                    img: "https://cdn.the-scientist.com/assets/articleNo/66520/aImg/33891/women-in-science-l.jpg" 
                },
                {
                    name: "Religion",
                    img: "https://pblog.hertz.com/wp-content/uploads/2019/02/img-lrg-TOPGOTHICCHURCHES.jpg"
                },
                {
                    name: "Health",
                    img: "https://www.customhospice.com/wp-content/uploads/2013/08/PeopleImages.com-ID30572.jpg"
                 },
                {
                    name: "Human and Civil Rights",
                    img: "https://cdn.britannica.com/70/217070-050-250699A2/Black-Lives-Matter-protest-signs-Boston-Massachusetts-May-2020.jpg"
                },
                {
                    name: "Education",
                    img: "https://learnwellservices.com/wp-content/uploads/2017/12/Teacher-with-students-1.jpg"
                },
                {
                    name: "Environment",
                    img: "https://cdn.audleytravel.com/700/500/79/1314674-banff-national-park-alberta.jpg"
                 },
                {
                    name: "Animals",
                    img: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/07/09151754/Golden-Retriever-puppy-standing-outdoors-500x486.jpg",
                }
            ],
            selectedCategories: [],
            donationAmount: 20,
            small: true,
            medium: true,
            large: true,
            local: true,
            global: true,
        };
    }

    addCharity = (category) => {
        let selectedCategories = this.state.selectedCategories
        let categories = this.gridRef.current.childNodes;
        categories.forEach(c => {
            if (c.id === category.name) {
                const index = c.className.indexOf(" ")
                if (index === -1) {
                    c.className = c.className + " highlighted"
                    c.style.border = "4px solid #1ecbe1"
                    selectedCategories.push(c.id)
                }
                else {
                    c.className = c.className.substring(0, index)
                    c.style.border = ""
                    const removeIndex = selectedCategories.indexOf(c.id)
                    selectedCategories.splice(removeIndex, 1)
                }
            }
        })
        this.setState({ selectedCategories: selectedCategories })
    }

    handleChangeSmall = () => {
        this.setState({small: !this.state.small})
    }

    handleChangeMedium = () => {
        this.setState({medium: !this.state.medium})
    }

    handleChangeLarge = ()=> {
        this.setState({large: !this.state.large})
    }

    handleChangeLocal= () => {
        this.setState({local: !this.state.local})
    }

    handleChangeGlobal = ()=> {
        this.setState({global: !this.state.global})
    }

    toFilters = () => {
        if (this.state.selectedCategories.length == 0) {
            alert('You must select at least one category')
        }
        else {
            this.setState({onCategories: false, onFilters: true})
        }
    }

    toCategories = () => {
        this.setState({onCategories: true, onFilters: false})
    }

    toConfirmation = async() => {
        if (!this.state.small && !this.state.medium && !this.state.large) {
            alert("You must select at least one size of charity")
        }
        else if (!this.state.local && !this.state.global) {
            alert("You must select locality of charity")
        }
        else {
            const db = firebase.firestore();
            var charitiesRef = db.collection("charities");
            var query = charitiesRef.where('category', 'in', this.state.selectedCategories)
            var results = []

            if (this.state.small) {
                var query2 = query.where('size', '==', 'small')
                await query2.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data()
                        data.id = doc.id
                        results.push(data)
                    })
                })
            }

            if (this.state.medium) {
                var query2 = query.where('size', '==', 'mid')
                await query2.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data()
                        data.id = doc.id
                        results.push(data)
                    })
                })
            }

            if (this.state.large) {
                var query2 = query.where('size', '==', 'big')
                await query2.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data()
                        data.id = doc.id
                        results.push(data)
                    })
                })
            }
            results = results.slice(0, 5)
            console.log(results)
            console.log(this.state.userId)

            var userRef = db.collection("users").doc(this.state.userId);
            let c = []
            let valuePerCharity = this.state.donationAmount / results.length
            results.forEach(r => {
                c.push({name: r.name, charityId: r.id, value: valuePerCharity})

            })
            this.setState({data: c});
            console.log("PREVIOUS PAGE C:",this.state.data)

            await userRef.update({
                preferences: this.state.selectedCategories,
                charities: c
            })
            this.setState({onFilters: false, onConfirmation: true})
        }
    }

    componentDidMount() {
        if (firebase.auth().currentUser !== null) {
            this.setState({userId: firebase.auth().currentUser.uid})
        }
    }

    render(){
        let categoryScreen;
        let filterScreen;
        let confirmationScreen;
        let paymentScreen;

        if (this.state.onCategories) {

            categoryScreen = 

            <div style={{display: 'flex', width: "100%", flexWrap: 'wrap', alignItems: "center", justifyContent: 'center', overflow: 'hidden', flexDirection: 'column'}}>
             
              <Typography style={{marginTop: 40, marginBottom: 40}} component="h1" variant="h5">
              Welcome! Select your interests below
            </Typography>
              <GridList cellHeight={180} style = {{"display": "flex", "alignItems":"center", "marginLeft": 300, "marginRight": 40}} cols={4} ref={this.gridRef}>
                {this.state.categories.map((category) => (
                  <GridListTile style = {{margin: 10}}key={category.name} id={category.name} onClick={() => this.addCharity(category)}>
                    <img src={category.img} alt={category.name}/>
                    <GridListTileBar
        
                      title={category.name}
                    />
                  </GridListTile>
                ))}
              </GridList>
              <div style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
                  <Button color="primary" onClick={this.toFilters}>Next</Button>
              </div>
              <div className="mb-3"></div>
            </div>
            </div>
        }

        if (this.state.onFilters) {

            filterScreen = 
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar style={{margin:10}}>
                <AccountBalanceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Enter Donation Options
                </Typography>
                <form  noValidate style={{width: "100%", marginTop: 30}} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormLabel>
                    What size charities would you like to support?
                    </FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.small} onChange={this.handleChangeSmall} name="small" />}
                            label="Small"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.medium} onChange={this.handleChangeMedium} name="medium" />}
                            label="Medium"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.large} onChange={this.handleChangeLarge} name="large" />}
                            label="Large"
                        />
                    </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormLabel>
                    Would you like to focus on local issues?
                    </FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.local} onChange={this.handleChangeLocal} name="local" />}
                            label="Local"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.global} onChange={this.handleChangeGlobal} name="global" />}
                            label="Global"
                        />
                    </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel>How much would you like to contribute each month?</FormLabel>   
                    <FormLabel style={{marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '500', fontSize: '20px'}}>${this.state.donationAmount}</FormLabel>
                    <RangeSlider
                          value={this.state.donationAmount}
                          onChange={e => this.setState({donationAmount: e.target.value})}
                          min={20}
                          max={100}
                        />

                    </Grid>
                
                </Grid>
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    style = {{marginTop: 30, marginBottom: 20}}
                    onClick = {this.toConfirmation}
                >
                    Submit
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button color="primary"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}} onClick={this.toCategories}>Back</Button>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>
        }
        

        if (this.state.onConfirmation) {
            confirmationScreen=
            <div>
                <ConfirmationScreen data={this.state.data}/>
            </div>
        }

        if (this.state.onPayment) {
            paymentScreen =
            <div>
                <ConfirmationScreen data={this.state.data}/>
            </div>
        }

        return(
            <Container>
                <Card>
                {categoryScreen}
                {filterScreen}
                {confirmationScreen}
                {paymentScreen}
                </Card>
            </Container>
        )
    }
}