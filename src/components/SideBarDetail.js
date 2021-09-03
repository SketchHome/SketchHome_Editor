import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import React, { useState, state, setStates } from "react";

//icons
import { BiBed } from "react-icons/bi";
import { BiHome } from "react-icons/bi";
import { BiHighlight } from "react-icons/bi";

//component
import SelectView from "./selectView";

const white = "#FFFFFF";
const green = "#198754";

function ToggleButtonExample(props) {
    const [radioValue, setRadioValue] = useState('1');
    //change btn color
    const [c1, setC1] = useState(white); //value, function
    const [c2, setC2] = useState(green);
    const [c3, setC3] = useState(green);
    
    const [mode, setMode] = useState(1);
  
    const radios = [
      { name: props.n1 , id: props.id1, value: '1' , icons: (props.i1 == "yes" ? <BiHome color={c1} size="35px" style={{marginBottom: "5px"}}/> : " ") },
      { name: props.n2 , id: props.id2, value: '2' , icons: (props.i2 == "yes" ? <BiBed color={c2} size="35px" style={{marginBottom: "5px"}}/> : " ") },
      { name: props.n3 , id: props.id3, value: '3' , icons: (props.i3 == "yes" ? <BiHighlight color={c3} size="35px" style={{marginBottom: "5px"}}/> : " ") },
    ];

  {/*check push btn -> change icon colors*/}
  const checkColor = (target) => {
    if (target == props.id1) {
      setC1(white);
      setC2(green);
      setC3(green);
      setMode(1);
    }
    else if (target == props.id2) {
      setC1(green);
      setC2(white);
      setC3(green);
      setMode(2);
    }
    else {
      setC1(green);
      setC2(green);
      setC3(white);
      setMode(3);
    }
  }

    return (
      <div style={{width:"100%", height: "100%"}}>
      <ButtonGroup style={{fontFamily: "NanumSquare_acR"}}>
            {radios.map((radio, idx) => (
              <ToggleButton style={{borderWidth: props.border}}
                key={idx}
                id={radio.id}
                type="radio"
                variant={idx % 2 ? 'outline-success' : props.btnColor}
                name="Menu"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                onClick={(e) => checkColor(e.currentTarget.id)}
              >
                {radio.icons}
                {radio.name}
              </ToggleButton>
            ))}
      </ButtonGroup>

      <div>
        <SelectView 
          pageId={mode}
          roomComponent={props.rooms}
          categoryComponent={props.categorys}
          furnitureComponent={props.furnitures}/>
      </div>

      </div>
    );
  }
  
export default ToggleButtonExample;