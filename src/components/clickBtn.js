import { ToggleButton, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import React, { useState, state, setStates } from "react";

function clickBtn(props) {
    const [radioValue, setRadioValue] = useState('1');
  
    const radios_1 = [
      { name: "방 설정" , value: '1' },
      { name: "벽" , value: '2' },
      { name: "바닥" , value: '3' },
    ];

    const radios_2 = [
    { name: "문/창문" , value: '4' },
    { name: "천장" , value: '5' },
    { name: "조명" , value: '6' },
    ];

    return (
      <>
      <ButtonGroup style={{fontFamily: "NanumSquare_acR"}}>
          <Container>
              <Row>
                {radios_1.map((radio, idx) => (
                <ToggleButton className="category-select-btns" 
                    style={{borderRadius: "5px", width: "140px", padding: "12px", marginLeft:"5px"}}
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-light' : 'outline-light'}
                    name="detail"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
              </Row>
              <Row>
                {radios_2.map((radio, idx) => (
                <ToggleButton className="category-select-btns" 
                    style={{borderRadius: "5px", width: "140px", padding: "12px", marginLeft:"5px"}}
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-light' : 'outline-light'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
              </Row>
          </Container>
      </ButtonGroup>
      </>
    );
  }

export default clickBtn;