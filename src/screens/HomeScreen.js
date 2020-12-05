import React from 'react';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('hi')
    }

    render(){
        return(
            <h1>Hello, cutie</h1>
        )
    } 
}