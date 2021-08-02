/*
* Select Editor Function Page
*
*/

import React from 'react';

//icons
import { BsHouseFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsLayers } from "react-icons/bs";

//bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//css files
import '../components/index.css';

function EditorSelect() {
  return (
    <div className="App">
      <div className="alignMargin">
        <Row>
          <Col></Col>
          <Col>
            <div className="EditorBtn">
              <BsSearch size='120' color="white" className="editorIcon"></BsSearch>
              <p className="underText2">도면 검색</p>
            </div>
          </Col>
          <Col>
            <div className="EditorBtn">
              <BsHouseFill size='120' color="white" className="editorIcon"></BsHouseFill>
              <p className="underText2">공간 모형 만들기</p>
            </div>
          </Col>
          <Col>
            <div className="EditorBtn">
              <BsLayers size='120' color="white" className="editorIcon"></BsLayers>
              <p className="underText2">공간 스캔 (BETA)</p>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}

export default EditorSelect;
