import React from 'react';

function Charities() {
    return(
        <div className='main'>
            <h1 className='title'>Hand-Pick Your Portfolio</h1>
            <form>
                <input type="text" name="name" placeholder="Search for a charity"/>
            </form>
            <button>
                Filters
            </button>
            <div>
                <h2>Recommended charities for good:</h2>
                
            </div>
        </div>
    );
}

export default Charities;