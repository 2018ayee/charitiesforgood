import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
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

export default class SetupScreen extends React.Component{
    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
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

    toConfirmation = () => {
        if (!this.state.small && !this.state.medium && !this.state.large) {
            alert("You must select at least one size of charity")
        }
        else if (!this.state.local && !this.state.global) {
            alert("You must select locality of charity")
        }
        else {
            var sizes = []
            if (this.state.small) {
                sizes.push("small")
            }

            if (this.state.medium) {
                sizes.push("medium")
            }

            if (this.state.large) {
                sizes.push("large")
            }

            const db = firebase.firestore();
            var charitiesRef = db.collection("charities");
            //var query = charitiesRef.where('size', 'in', sizes).where('category', 'in', this.state.selectedCategories)
            this.setState({onFilters: false, onConfirmation: true})
        }
    }

    componentDidMount() {

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
            </div>
        }

        if (this.state.onFilters) {
            filterScreen = 
                <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                    </Grid>
                </Grid>
                </React.Fragment>
        }

            // <div style={{display: 'flex', width: "100%", flexWrap: 'wrap', alignItems: "center", justifyContent: 'center', overflow: 'hidden', flexDirection: 'column'}}>
            //     <h1 style={{marginBottom: 40}}>Enter donation options</h1>
            //     <Form>
            //         <Form.Group>
            //             <Form.Label>What size charities would you like to support?</Form.Label>
            //             <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            //                 <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Small</Form.Label>
            //                 <Form.Check
            //                   checked={this.state.small}
            //                   onChange={this.handleChangeSmall} />
            //                 <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Medium</Form.Label>
            //                 <Form.Check
            //                   checked={this.state.medium}
            //                   onChange={this.handleChangeMedium} />
            //                 <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Large</Form.Label>
            //                 <Form.Check
            //                   checked={this.state.large}
            //                   onChange={this.handleChangeLarge} />
            //             </div>
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Would you like to focus on local issues?</Form.Label>
            //             <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            //                 <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Local</Form.Label>
            //                 <Form.Check
            //                   checked={this.state.local}
            //                   onChange={this.handleChangeLocal} />
            //                 <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Global</Form.Label>
            //                 <Form.Check
            //                   checked={this.state.global}
            //                   onChange={this.handleChangeGlobal} />
            //             </div>
            //         </Form.Group>
            //         <Form.Group>
            //             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            //                 <Form.Label>How much would you like to contribute each month?</Form.Label>
            //                 <Form.Label style={{alignSelf: 'center', fontWeight: '500', fontSize: '20px'}}>${this.state.donationAmount}</Form.Label>
            //             </div>
            //             <RangeSlider
            //               value={this.state.donationAmount}
            //               onChange={e => this.setState({donationAmount: e.target.value})}
            //               min={20}
            //               max={100}
            //             />
            //         </Form.Group>
            //     </Form>
            //     <div style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            //         <Button color="primary" style={{marginRight: 100}} onClick={this.toCategories}>Back</Button>
            //         <Button color="primary" style={{marginLeft: 100}} onClick={this.toConfirmation}>Next</Button>
            //   </div>
            // </div>
        

        if (this.state.onConfirmation) {
            confirmationScreen=
            <div>
                Confirmation screen
            </div>
        }

        if (this.state.onPayment) {
            paymentScreen =
            <div>
                <ConfirmationScreen />
            </div>
        }

        return(
            <div>
                {categoryScreen}
                {filterScreen}
                {confirmationScreen}
                {paymentScreen}
            </div>
        )
    }
}