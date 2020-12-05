import React from 'react';

export default class SetupScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            onCategories: true,
            onFilters: false,
            onConfirmation: false,
            onPayment: false
        };
    }

    componentDidMount() {
        console.log('hi')
    }

    render(){
        let categoryScreen;
        let filterScreen;
        let confirmationScreen;
        let paymentScreen;

        if (this.state.onCategories) {
            categoryScreen = 
            <div>
                
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