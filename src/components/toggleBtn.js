import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import React, { useState } from "react";

function ToggleButtonExample() {
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: '2D 뷰어', value: '1' },
      { name: '편집 모드', value: '2' },
      { name: '3D 뷰어', value: '3' },
    ];
  
    return (
      <>
      <ButtonGroup style={{fontFamily: "NanumSquare_acR"}}>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-success'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
      </ButtonGroup>
      </>
    );
  }
  
  
export default ToggleButtonExample;