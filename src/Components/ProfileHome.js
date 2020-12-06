import { Info } from '@material-ui/icons';
import React, { useState} from 'react';
import './ProfileHome.css';

// Info box component
function InfoBox(props) {
    return (
        <div className='infobox'>
            <span className='infobox-info-container'>
                <img className='infobox-icon'></img>
                <p className='infobox-title'>{props.title}</p>
            </span>
            <p className='infobox-value'>{props.value}</p>
        </div>
    );
}

function NavButton(props) {
    return (
        <div className='nav-button-container'>
            <img className='nav-button-icon'/>
            <button className='nav-button'>
                {props.title}
            </button>
        </div>
    );
}

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: 'andrew.lee',
            navbar: [
                { title: '[button name]', link: '' },
                { title: '[button name]', link: '' }
            ],
            infobox: [
                { title: 'AMOUNT INVESTED', value: '$50.00' },
                { title: 'NUMBER OF CHARITIES', value: '4' },
                { title: 'monthly payment', value: '$20.00' },
                { title: 'charities', value: '4' }
            ]
        };
    }

    render(){
        return (
            <div className='Main'>
                <div className='Background'></div>
                <div className='sidebar'>
                    <img className='User-Image'/>
                    <h1 className='Title'>{this.state.username}</h1>
                    {this.state.navbar.map(button => (
                        <NavButton title={button.title}/>
                    ))}
                </div>
                <div className='Outer-Container'>
                    <div className='info-container'>
                        {this.state.infobox.map(info => (
                            <InfoBox title={info.title} value={info.value}/>
                        ))}
                    </div>
                    <div className='charity-container'>
                        
                    </div>
                </div>
            </div>
        );
    }
}