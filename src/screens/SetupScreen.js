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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import ConfirmationScreen from "./ConfirmationScreen"

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
                    img: "https://www.dailyreleased.com/wp-content/uploads/2020/08/Community-Development.jpg"
                },
                {
                    name: "International",
                    img: "https://static.kent.ac.uk/nexus/ems/63.jpg"
                },
                {
                    name: "Human Services",
                    img: "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/636020306-1532270766.jpg"
                },
                {
                    name: "Arts, Culture, Humanities",
                    img: "https://iafor.org/wp-content/uploads/2017/01/IAFOR-Journal-of-Cultural-Studies-600x450.jpg"
                },
                {
                    name: "Research and Public Policy",
                    img: "https://static-cms.hotjar.com/images/blog-26-0120featured.width-750.png",
                },
                {
                    name: "Religion",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBi9wolAPTGzYS9JU5bM8wey8Vcj3YJcCfWQ&usqp=CAU",
                },
                {
                    name: "Health",
                    img: "https://revcycleintelligence.com/images/site/article_headers/_normal/2017-12-12-patient-care.png",
                },
                {
                    name: "Human and Civil Rights",
                    img: "https://www.ups.com/assets/resources/images/knowledge-center/934x495/m10-934-x-495-in-service-of-human-and-civil-rights.jpg",
                },
                {
                    name: "Education",
                    img: "https://www.habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg",
                },
                {
                    name: "Environment",
                    img: "https://keysight-h.assetsadobe.com/is/image/content/dam/keysight/en/img/about/corporate-social-responsibility/csr_environment_1200x900.png",
                },
                {
                    name: "Animals",
                    img: "https://ideas.ted.com/wp-content/uploads/sites/3/2020/03/final_credit-alamy-1.jpg",
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
              <h1 style={{marginBottom: 40}}>Select your interests below</h1>
              <GridList cellHeight={180} style={{width: "80%"}} cols={4} ref={this.gridRef}>
                {this.state.categories.map((category) => (
                  <GridListTile key={category.name} id={category.name} onClick={() => this.addCharity(category)}>
                    <img src={category.img} alt={category.name}/>
                    <GridListTileBar
                      title={category.name}
                    />
                  </GridListTile>
                ))}
              </GridList>
              <div style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
                  <Button variant="outline-primary" onClick={this.toFilters}>Next</Button>
              </div>
            </div>
        }

        if (this.state.onFilters) {
            filterScreen = 
            <div style={{display: 'flex', width: "100%", flexWrap: 'wrap', alignItems: "center", justifyContent: 'center', overflow: 'hidden', flexDirection: 'column'}}>
                <h1 style={{marginBottom: 40}}>Enter donation options</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>What size charities would you like to support?</Form.Label>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Small</Form.Label>
                            <Form.Check
                              checked={this.state.small}
                              onChange={this.handleChangeSmall} />
                            <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Medium</Form.Label>
                            <Form.Check
                              checked={this.state.medium}
                              onChange={this.handleChangeMedium} />
                            <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Large</Form.Label>
                            <Form.Check
                              checked={this.state.large}
                              onChange={this.handleChangeLarge} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Would you like to focus on local issues?</Form.Label>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Local</Form.Label>
                            <Form.Check
                              checked={this.state.local}
                              onChange={this.handleChangeLocal} />
                            <Form.Label style={{fontSize: '14px', margin: 8, marginRight: 6}}>Global</Form.Label>
                            <Form.Check
                              checked={this.state.global}
                              onChange={this.handleChangeGlobal} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <Form.Label>How much would you like to contribute each month?</Form.Label>
                            <Form.Label style={{alignSelf: 'center', fontWeight: '500', fontSize: '20px'}}>${this.state.donationAmount}</Form.Label>
                        </div>
                        <RangeSlider
                          value={this.state.donationAmount}
                          onChange={e => this.setState({donationAmount: e.target.value})}
                          min={20}
                          max={100}
                        />
                    </Form.Group>
                </Form>
                <div style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <Button variant="outline-primary" style={{marginRight: 100}} onClick={this.toCategories}>Back</Button>
                    <Button variant="outline-primary" style={{marginLeft: 100}} onClick={this.toConfirmation}>Next</Button>
              </div>
            </div>
        }

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