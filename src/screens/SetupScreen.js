import React from 'react';
import firebase from 'firebase';
import ConfirmationScreen from "./ConfirmationScreen"
import PaymentScreen from "./PaymentScreen"


export default class SetupScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            onCategories: false,
            onFilters: false,
            onConfirmation: true,
            onPayment: false
        };
    }

    componentDidMount() {
        console.log('hi')
        const db = firebase.firestore()
        //this.props.user

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

        else if (this.state.onFilters) {

        }

        else if (this.onConfirmation) {

        }

        else {

        }

        return(
            <div>
                <PaymentScreen />
            </div>
        )
    }
}