/*
* Select Page
*
*/

import React from 'react';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../components/index.css';

import logo from '../resource/image/sketchhome_logo_none.png';

function SelectProblem() {
  return (
    <div className="App">
      <div className="selectBox">
        <img src={logo} style={{margin:'20px', width:'150px'}}></img>
        <p style={{marginTop: '-15px', marginLeft: '20px', color: "gray", fontFamily: "NanumSquare_acR"}}>내 집을 가장 내 집 답게 만드는 방법</p>
        <Row>
          <Col className="alignBoxText" style={{borderRight: '1px dashed gray', height: '50px'}}> 
              <a href="editorSelect">공간 유형 확인</a>
          </Col>
          <Col className="alignBoxText"> 
              <a href="editor">직접 공간 그리기</a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SelectProblem;
