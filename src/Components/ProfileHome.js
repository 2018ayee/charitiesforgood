import React from 'react';
import './ProfileHome.css';

/*
    Sidebar: 
        username, profile pic

    Charities invested
    Amount 
*/

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: 'andrewlee'
        };
    }

    render(){
        return(
            <div className='Main'>
                <div className='Background'></div>
                <div className='Outer-Container'>
                    <div className='Profile-Container'>
                        <img className='User-Image'/>
                        <h1 className='Title'>{this.state.user}</h1>
                        <p>[desc]</p>
                    </div>
                    <div className='Info-Container'>
                        <h1>YOUR CHARITIES</h1>
                        <div className='yes'>
                            <h1>[...]</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}