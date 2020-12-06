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
import 'firebase/auth'

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
            selectedCategories: []
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

    componentDidMount() {
        
    }

    render(){
        let categoryScreen;
        let filterScreen;
        let confirmationScreen;
        let paymentScreen;

        if (this.state.onCategories) {
            categoryScreen = 
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
              <h1>Select your interests below</h1>
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
            </div>
        }

        else if (this.state.filterScreen) {

        }

        else if (this.confirmationScreen) {

        }

        else {

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