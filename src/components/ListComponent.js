//image
import wood3 from '../resource/image/wood3.png';
import btnImage from '../resource/image/checkNone.png';
import btnCheck from '../resource/image/checkThis.png';

import { ToggleButton, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import React, { useState, state, setStates } from "react";

import { itemList } from './SampleData/itemList';

function ListComponent(props) {
    const [radioValue, setRadioValue] = useState('wood1');
  
    const radios_1 = [
      { name: "방 설정" , value: '1' },
      { name: "벽" , value: '2' },
      { name: "바닥" , value: '3' },
    ];

    return (
      <>
      <ButtonGroup style={{fontFamily: "NanumSquare_acR"}}>
          <Container>
              <Row style={{marginLeft: "-25px"}}>
                {itemList.map((item, idx) => (
                <ToggleButton className="select-list-btn" 
                    style={{marginLeft: "30px"}}
                    key={idx}
                    id={item.id}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-success'}
                    name="detail"
                    value={item.id}
                    checked={radioValue === item.id}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    <div className="List-top" style={{backgroundImage: `url(${item.image})`}}></div>
                    <div style={{marginTop: "-0.5vh"}}>
                        {item.name}
                    </div>
                </ToggleButton>
                ))}
              </Row>
          </Container>
      </ButtonGroup>
      </>
    );
  }


export default ListComponent;