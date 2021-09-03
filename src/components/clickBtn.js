import { ToggleButton, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import React, { useState, state, setStates } from "react";

function clickBtn(props) {
    var isChange = 0;

    const [s1, setS1] = useState("");
    const [s2, setS2] = useState("none");
    const [s3, setS3] = useState("none");
    const [s4, setS4] = useState("none");
    const [s5, setS5] = useState("none");
    const [s6, setS6] = useState("none");

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

    //Select Menu => change pages
    const version = () => {
      if(isChange != radioValue) {
        isChange = radioValue;
        
        setTimeout(() => {
          if(radioValue == "1") {
            setS1("");
            setS2("none");
            setS3("none");
            setS4("none");
            setS5("none");
            setS6("none");
          }
          else if(radioValue == "2") {
            setS1("none");
            setS2("");
            setS3("none");
            setS4("none");
            setS5("none");
            setS6("none");
          }
          else if(radioValue == "3") {
            setS1("none");
            setS2("none");
            setS3("");
            setS4("none");
            setS5("none");
            setS6("none");
          }
          else if(radioValue == "4") {
            setS1("none");
            setS2("none");
            setS3("none");
            setS4("");
            setS5("none");
            setS6("none");
          }
          else if(radioValue == "5") {
            setS1("none");
            setS2("none");
            setS3("none");
            setS4("none");
            setS5("");
            setS6("none");
          }
          else {
            setS1("none");
            setS2("none");
            setS3("none");
            setS4("none");
            setS5("none");
            setS6("");
          }
        }, 100);
      }   
    };

    return (
      <div>
        <div className="category-select">
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
                      onClick={() => version()}
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
                      onClick={() => version()}
                  >
                      {radio.name}
                  </ToggleButton>
                  ))}
                </Row>
            </Container>
        </ButtonGroup>
        </div>
        <div className="scroll" style={{width: "100%", height: "1000px", margin: "30px 0px 0px 50px", fontFamily: "NanumSquare_acB"}}>
            {/**radioValue (1,2,3,4,5,6 각각의 모드에 따라 화면 배치 구성 다르게) */}
            <div style={{display: s1}}>{props.room}</div>
            <div style={{display: s1}}>{props.showInfo}</div>
            <div style={{display: s2}}>{props.wallColor}</div>
            <div style={{display: s2}}>{props.wallList}</div>
            <div style={{display: s3}}>{props.floorColor}</div>
            <div style={{display: s3}}>{props.floorList}</div>
            <div style={{display: s4}}>{props.addWf}</div>
            <div style={{display: s4}}>{props.moveThing}</div>
            <div style={{display: s5}}>{props.ceiling}</div>
            <div style={{display: s6}}>{props.light}</div>
            {version()}
        </div>
      </div>
    );
  }

export default clickBtn;