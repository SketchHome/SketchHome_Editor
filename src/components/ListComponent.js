import React, { useState } from 'react';

import wood3 from '../resource/image/wood3.png';

function ListComponent(props) {
    //radio button
    const [ inputStatus, setInputStatus ] = useState(false);
    const handleClickRadioButton = (radioBtnName) => {
        setInputStatus(radioBtnName)
    }

    return (
        <div className="List">
            <div className="List-top" style={{backgroundImage: `url(${props.image})`}}>
                    <input 
                        type= 'radio'
                        id= {props.id} 
                        value= 'wood1'
                        name = "woods"
                        checked={inputStatus === 'wood1'}
                        onClick={() => handleClickRadioButton('wood1')}
                        className="radioTrue"
                    />
                    <label htmlFor='wood1'></label>
            </div>
            <div className="List-bottom">
                {props.itemName}
            </div>
        </div>
    );
}

export default ListComponent;