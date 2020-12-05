import React from 'react';
import './ProfileHome.css';

/*
    1. username, 
*/

function ProfileHome() {
    return(
        <div className='Main'>
            <div className='Background'></div>
            <div className='Outer-Container'>
                <div className='Profile-Container'>
                    <img className='User-Image'/>
                    <h1 className='Title'>[username]</h1>
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


export default ProfileHome;