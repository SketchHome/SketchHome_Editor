import React, { useState } from 'react';

//image
import wood3 from '../resource/image/wood3.png';
import btnImage from '../resource/image/checkNone.png';
import btnCheck from '../resource/image/checkThis.png';

function ListComponent(props) {
    //radio button
    const [ inputStatus, setInputStatus ] = useState(false);
    const [ btnImages, setImage ] = useState(btnImage);

    const handleClickRadioButton = (radioBtnName) => {
        setImage(btnCheck);
        setInputStatus(radioBtnName)
        console.log(inputStatus)
    }

    return (
        <div className="List">
            <div className="List-top" style={{backgroundImage: `url(${props.image})`}}>
                    <input 
                        type= 'radio'
                        id= {props.id} 
                        value= {props.value}
                        name = "woods"
                        checked={inputStatus === props.value}
                        onClick={() => handleClickRadioButton(props.value)}
                        className="radioTrue"
                        style={{backgroundImage: `url(${btnImages})`, backgroundSize: "35px 35px"}}
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